from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__, static_url_path='/', static_folder='web')

# Lade multilingualen Sentiment-Analyzer von HuggingFace
classifier = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")
    result = classifier(text)[0]
    label = result['label']  # z. B. "4 stars"
    
    # Vereinfachtes Mapping
    if "1" in label or "2" in label:
        sentiment = "negative"
    elif "3" in label:
        sentiment = "neutral"
    else:
        sentiment = "positive"

    return jsonify({"sentiment": sentiment, "raw": label})

if __name__ == "__main__":
    app.run(debug=True)
