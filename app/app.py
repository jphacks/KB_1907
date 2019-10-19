from flask import Flask, render_template, request, redirect
from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import datetime
import os

ALLOWED_EXTENSIONS = ['mp3', 'flac', 'wav']
UPLOAD_DIR = 'audio_logs'

app = Flask(__name__)

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
        post_audio_to_speech_to_textAPI(audio_path)
    else:
        return redirect('/')

@app.route('/log/<int:log_id>')
def log(log_id):
    return render_template("log.html")

@app.route('/overview')
def overview():
    return render_template("overview.html")

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

        t = str(json.dumps(speech_recognition_results,
                           indent=2, ensure_ascii=False))

        with open('sound.json', 'w', encoding='utf-8') as f:
            f.write(t)

        """
        #print(json.dumps(profile, indent=2))
        for x in profile['personality']:
            print(x['trait_id'], x['percentile'])
        """
        for x in speech_recognition_results['results']:
            print(x['alternatives'], x[''])



if __name__ == "__main__":
    app.run(debug=True, port=8000)
