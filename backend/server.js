const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Función para obtener resultados de SerpAPI (búsqueda en Google)
async function searchGoogle(query) {
    const serpApiKey = process.env.SERPAPI_KEY;
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=es&gl=mx&api_key=${serpApiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.organic_results && data.organic_results.length > 0) {
            return data.organic_results.slice(0, 3).map(result => `${result.title}: ${result.link}`).join("\n");
        } else {
            return "No se encontraron resultados recientes en Google.";
        }
    } catch (error) {
        console.error("Error en SerpAPI:", error);
        return "No se pudo obtener información en tiempo real.";
    }
}

// Endpoint POST para el chat con OpenAI y SerpAPI
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    
    if (!message) return res.status(400).json({ error: "Mensaje vacío" });

    try {
        let openAiResponse = "";
        
        // Si el mensaje incluye palabras clave como "actualizado" o "2024", usa SerpAPI
        if (message.includes("2024") || message.includes("actualizado") || message.includes("hoy")) {
            openAiResponse = await searchGoogle(message);
        } else {
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
            openAiResponse = data.choices[0].message.content;
        }

        res.json({ reply: openAiResponse });

    } catch (error) {
        console.error("Error en la API:", error);
        res.status(500).json({ error: "Error al obtener respuesta." });
    }
});

// Endpoint GET para verificar que el servidor está activo
app.get("/api/test", (req, res) => {
    res.json({ message: "El servidor está corriendo correctamente." });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
