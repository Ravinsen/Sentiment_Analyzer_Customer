document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const textInput = document.getElementById("textInput");
    const sentimentLabel = document.getElementById("sentimentLabel");
    const sentimentScore = document.getElementById("sentimentScore");
    const resultBox = document.getElementById("resultBox");

    const labelMapping = {
        "LABEL_0": "Negativ 😠",
        "LABEL_1": "Neutral 😐",
        "LABEL_2": "Positiv 😊"
    };

    analyzeBtn.addEventListener("click", async () => {
        const text = textInput.value.trim();
        if (!text) return;

        const response = await fetch("/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        sentimentLabel.textContent = labelMapping[data.sentiment] || data.sentiment;
        sentimentScore.textContent = `${Math.round(data.score * 100)}%`;
        resultBox.style.display = "block";
    });
});
