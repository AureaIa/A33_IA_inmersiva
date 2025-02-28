const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint POST para el chat con OpenAI
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: "Mensaje vacío" });

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4-turbo",
                messages: [{ role: "system", content: "Eres un asistente útil." }, { role: "user", content: message }],
                max_tokens: 200,
            }),
        });

        if (!response.ok) throw new Error("Error en OpenAI API");

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });

    } catch (error) {
        console.error("Error en OpenAI:", error);
        res.status(500).json({ error: "Error en la respuesta de OpenAI." });
    }
});

// Endpoint opcional GET para verificar que el servidor está activo
app.get("/api/test", (req, res) => {
    res.json({ message: "El servidor está corriendo correctamente." });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
