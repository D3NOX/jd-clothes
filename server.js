const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// News holen
app.get("/news", (req, res) => {
    const news = JSON.parse(fs.readFileSync("news.json"));
    res.json(news);
});

// Neue News erstellen
app.post("/news", (req, res) => {
    const news = JSON.parse(fs.readFileSync("news.json"));
    const newItem = req.body;
    news.unshift(newItem); // neue News oben hinzufügen
    fs.writeFileSync("news.json", JSON.stringify(news, null, 2));
    res.json({ success: true });
});

// News löschen
app.delete("/news/:index", (req, res) => {
    const news = JSON.parse(fs.readFileSync("news.json"));
    const index = parseInt(req.params.index);
    if (index >= 0 && index < news.length) {
        news.splice(index, 1);
        fs.writeFileSync("news.json", JSON.stringify(news, null, 2));
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: "Ungültiger Index" });
    }
});

app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
