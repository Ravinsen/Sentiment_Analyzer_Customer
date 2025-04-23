document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("berechnenBtn");

    btn.addEventListener("click", async () => {
        const strecke = parseFloat(document.getElementById("strecke").value);
        const verbrauch = parseFloat(document.getElementById("verbrauch").value);
        const preis = parseFloat(document.getElementById("preis").value);

        const response = await fetch("/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ strecke, verbrauch, preis })
        });

        const data = await response.json();

        if (data.kosten !== undefined) {
            document.getElementById("kostenOutput").textContent = data.kosten.toFixed(2);
            document.getElementById("ergebnis").style.display = "block";
        } else {
            alert("Fehler: " + (data.error || "Ungültige Eingaben"));
        }
    });
});
