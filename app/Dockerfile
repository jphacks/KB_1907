FROM python:3.6

WORKDIR /app
RUN mkdir log audio_logs

COPY Pipfile Pipfile.lock app.py ./
COPY templates  ./templates
COPY static ./static

RUN pip install pipenv && pipenv install --system
