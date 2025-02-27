require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const axios = require("axios"); // Para hacer consultas a la API de búsqueda

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Configuración de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Función para buscar en Google usando SerpAPI
async function searchGoogle(query) {
    try {
        const response = await axios.get("https://serpapi.com/search", {
            params: {
                q: query,
                api_key: process.env.SERPAPI_KEY, // Asegúrate de tener tu API Key en el .env
            },
        });
        return response.data.organic_results.map((r) => r.snippet).join("\n");
    } catch (error) {
        console.error("Error en la búsqueda web:", error);
        return "Lo siento, no pude obtener información actualizada.";
    }
}

// Endpoint del chat con OpenAI
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Mensaje vacío" });

    // Si el mensaje pide información reciente, buscamos en Google
    if (message.toLowerCase().includes("últimas noticias") || message.toLowerCase().includes("qué está pasando") || message.toLowerCase().includes("datos actualizados")) {
        const searchResults = await searchGoogle(message);
        return res.json({ reply: searchResults });
    }

    // Si no es una pregunta de búsqueda, usamos OpenAI
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: "Eres AUREA 33 IA Inmersiva, un asistente experto en cualquier tema y con capacidad de búsqueda en tiempo real." },
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
