from flask import Flask, render_template, request, redirect
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
        audio.save(os.path.join(UPLOAD_DIR, saveFileName))
        return 'file saved!'
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

if __name__ == "__main__":
    app.run(debug=True, port=8000)
