from flask import Flask, request, jsonify

app = Flask(__name__, static_url_path='/', static_folder='web')

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()
    try:
        strecke = float(data.get("strecke", 0))
        verbrauch = float(data.get("verbrauch", 0))
        preis = float(data.get("preis", 0))

        kosten = round((strecke / 100) * verbrauch * preis, 2)

        return jsonify({"kosten": kosten})
    except:
        return jsonify({"error": "Ungültige Eingabe"}), 400

if __name__ == "__main__":
    app.run(debug=True)
