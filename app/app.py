from flask import Flask, render_template, request, redirect
from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from janome.tokenizer import Tokenizer
import json
import datetime
import os
from sklearn import preprocessing


ALLOWED_EXTENSIONS = ['mp3', 'flac', 'wav']
ALLOWED_NOUN_KIND = ['サ変接続', '形容動詞語幹', '副詞可能', '一般', '固有名詞']
UPLOAD_DIR = 'audio_logs'
LOG_DIR = 'log'

app = Flask(__name__)
t = Tokenizer()

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload():
    audio = request.files['audio']
    if audio.filename == '':
        return redirect('/')

    if allowed_file(audio.filename):
        saveFileName = datetime.datetime.now().strftime('%Y%m%d_%H%M%S') + '.' + audio.filename.rsplit('.', 1)[1].lower()
        audio_path = os.path.join(UPLOAD_DIR, saveFileName)
        audio.save(audio_path)
        result = post_audio_to_speech_to_textAPI(audio_path)
        response = make_response_for_client(result)
        return response
    else:
        return redirect('/')

@app.route('/log/<log_id>')
def log(log_id):
    log_file_path = os.path.join(LOG_DIR, 'log_' + log_id + '.json')
    with open(log_file_path, 'r') as f:
        res = json.load(f)
    return render_template("log.html", res=res)

@app.route('/overview')
def overview():
    log_file_path = os.path.join(LOG_DIR, 'overview.json')
    with open(log_file_path, 'r') as f:
        res = json.load(f)
    return render_template("overview.html", res=res)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def post_audio_to_speech_to_textAPI(filename):
        authenticator = IAMAuthenticator(
            'VNYNGcQrwZaumnTJMani2qbBa8veDOfjXQBRXsr3l5rX')
        speech_to_text = SpeechToTextV1(authenticator=authenticator)
        speech_to_text.set_service_url(
            'https://gateway-tok.watsonplatform.net/speech-to-text/api')
        lang = "ja-JP_BroadbandModel"
        with open(filename, 'rb') as audio_file:
            speech_recognition_results = speech_to_text.recognize(
                audio=audio_file,
                model=lang,
                content_type='audio/mp3',
                timestamps=True,
                speaker_labels=True,
            ).get_result()
        return speech_recognition_results

def make_response_for_client(result):
    response = {}
    sentences = {}
    pauses = {}
    pause_scores = {}
    posession_per_speaker = {}
    final_score = []
    best_sentence_ids = []
    topic = []
    active_rate = 0
    total_pause = 0
    total_time = 0
    sentence_counter = 0

    speaker_labels = result['speaker_labels']
    for label in speaker_labels:
        start = float(label['from'])
        end = float(label['to'])
        speak_time = end - start
        speaker_id = str(label['speaker'])
        if speaker_id in posession_per_speaker:
            posession_per_speaker[speaker_id] += speak_time
        else:
            posession_per_speaker[speaker_id] = speak_time
        total_time += speak_time
    for speaker_id in posession_per_speaker.keys():
        time = posession_per_speaker[speaker_id]
        posession = time / total_time
        posession_per_speaker[speaker_id] = posession

    for x in result['results']:
        for y in x['alternatives']:
            sentence_id = str(sentence_counter)
            sentences[sentence_id] = {}
            sentences[sentence_id]["sentence_start"] = y['timestamps'][0][1]
            sentences[sentence_id]["sentence_end"] = y['timestamps'][-1][2]
            sentences[sentence_id]["body"] = y["transcript"]
            sentence_counter += 1

    for k in sentences.keys():
        if k != str(len(sentences) - 1):
            pause = sentences[str(int(k)+1)]['sentence_start'] - sentences[k]['sentence_end']
            pauses["{pre}_{post}".format(pre=k, post=str(int(k)+1))] = pause
            total_pause += pause

    splits = [(len(pauses) + i) // 10 for i in range(10)]
    for k in pauses.keys():
        pause_score = 1/pauses[k]
        pause_scores[k] = pause_score
    non_final_score = []
    counter = 0
    for s in splits:
        area_score = 0
        for i in range(0, s):
            key = str(counter + i) + '_' + str(counter + i + 1)
            area_score += pause_scores[key]
        non_final_score.append(area_score)
        counter += s
    final_score = []
    for i in non_final_score:
        final = i / splits[0]
        final_score.append(final)

    final_score = preprocessing.minmax_scale(final_score)
    final_score = final_score.tolist()
    best_score_index = final_score.index(max(final_score))
    best_area_num = splits[best_score_index]
    id_counter = 0
    for i in splits[0:best_score_index-1]:
        id_counter += i
    for j in range(best_area_num):
        id_counter += 1
        best_sentence_ids.append(str(id_counter))

    for sentence_id in best_sentence_ids:
        sentence_body = sentences[sentence_id]["body"]
        sentence_body = sentence_body.replace(" ", "")
        for token in t.tokenize(sentence_body):
            part_of_speech = token.part_of_speech.split(',')
            if part_of_speech[0] == "名詞" and part_of_speech[1] in ALLOWED_NOUN_KIND:
                topic.append(token.surface)

    active_rate = 1 - (total_pause / total_time)

    response["topic"] = topic
    response["possesion"] = posession_per_speaker
    response["active_rate"] = active_rate
    response["score"] = final_score

    return response

if __name__ == "__main__":
    app.run(debug=True, port=8000)
