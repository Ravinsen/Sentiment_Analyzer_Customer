document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const textInput = document.getElementById("textInput");
    const sentimentOutput = document.getElementById("sentiment");
    const resultBox = document.getElementById("resultBox");

    analyzeBtn.addEventListener("click", async () => {
        const text = textInput.value.trim();
        if (!text) return;

        const response = await fetch("/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        sentimentOutput.textContent = `${data.sentiment.toUpperCase()} (${data.raw})`;
        resultBox.style.display = "block";
    });
});
