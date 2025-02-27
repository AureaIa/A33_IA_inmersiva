require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Configuración de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que la clave está en el .env
});

// Endpoint para probar conexión con OpenAI
app.get("/test-openai", async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "system", content: "Dime un dato curioso" }],
        });

        res.json(response.choices[0]);
    } catch (error) {
        console.error("Error en OpenAI:", error);
        res.status(500).json({ error: "Error en la conexión con OpenAI" });
    }
});

// Endpoint del chat con OpenAI
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Mensaje vacío" });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: "Eres AUREA 33 IA Inmersiva, un asistente experto en cualquier tema." },
                { role: "user", content: message },
            ],
            max_tokens: 300,
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Error en OpenAI:", error);
        res.status(500).json({ error: "Error en la respuesta de OpenAI" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
