from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload():
    i

@app.route('/log/<int:log_id>')
def log(log_id):
    render_template("log.html")

@app.route('/overview')
def overview():
    render_template("overview.html")

if __name__ == "__main__":
    app.run(debug=True, port=8000)
