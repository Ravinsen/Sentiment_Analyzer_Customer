from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__, static_url_path='/', static_folder='web')

# Leichtes Modell ohne torch
sentiment_pipeline = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest")

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    text = request.get_json().get("text", "")
    result = sentiment_pipeline(text)[0]

    label = result['label']
    score = round(result['score'], 2)

    return jsonify({"sentiment": label, "score": score})

if __name__ == "__main__":
    app.run(debug=True)