const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Función para obtener resultados de Google usando SerpAPI
async function searchGoogle(query) {
    const serpApiKey = process.env.SERPAPI_KEY;
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=es&gl=mx&api_key=${serpApiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la API de SerpAPI");
        const data = await response.json();
        
        // Extraer los primeros resultados
        if (data.organic_results && data.organic_results.length > 0) {
            return data.organic_results.slice(0, 3).map(result => ({
                title: result.title,
                link: result.link,
                snippet: result.snippet
            }));
        }
        return [];
    } catch (error) {
        console.error("Error en SerpAPI:", error);
        return [];
    }
}

// Endpoint principal del Chat
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Mensaje vacío" });

    try {
        // Primero buscamos en Google
        const googleResults = await searchGoogle(message);
        let googleSummary = "No se encontraron resultados recientes en Google.";

        if (googleResults.length > 0) {
            googleSummary = googleResults.map((res, i) => `${i + 1}. [${res.title}](${res.link}) - ${res.snippet}`).join("\n");
        }

        // Luego generamos la respuesta de OpenAI
        const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4-turbo",
                messages: [
                    { role: "system", content: "Eres un asistente útil que también puede acceder a información reciente de Google." },
                    { role: "user", content: `Aquí tienes información en tiempo real sobre tu consulta:\n\n${googleSummary}\n\nAhora, basado en esto, responde la pregunta de manera detallada.` },
                ],
                max_tokens: 250,
            }),
        });

        if (!openAIResponse.ok) throw new Error("Error en OpenAI API");
        const aiData = await openAIResponse.json();

        res.json({ reply: aiData.choices[0].message.content });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "Error en la respuesta del servidor." });
    }
});

// Endpoint de prueba
app.get("/api/test", (req, res) => {
    res.json({ message: "El servidor está corriendo correctamente." });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
