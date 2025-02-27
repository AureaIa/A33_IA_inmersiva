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
    apiKey: process.env.OPENAI_API_KEY, 
});

// Endpoint del chat
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Mensaje vacío" });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: "Eres AUREA 33 IA Inmersiva, un asistente experto en programación, tecnología, ciencia y temas generales. Siempre proporciona respuestas basadas en información actualizada." },
                { role: "user", content: message },
            ],
            max_tokens: 300,
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Error con OpenAI:", error);
        res.status(500).json({ error: "Error al obtener la respuesta de la IA" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
