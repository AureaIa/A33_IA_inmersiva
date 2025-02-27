require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Configuración correcta de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que tu clave esté en el archivo .env
});

// Verificar si la API Key se está cargando
console.log("API Key cargada:", process.env.OPENAI_API_KEY ? "✅ Sí" : "❌ No");

// Endpoint de prueba para verificar OpenAI
app.get("/test-openai", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "system", content: "Dime un dato curioso." }],
      max_tokens: 100,
    });

    res.json(response.choices[0].message);
  } catch (error) {
    console.error("Error con OpenAI:", error);
    res.status(500).json({ error: "Error al conectar con OpenAI" });
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
        { role: "system", content: "Eres AUREA 33 IA Inmersiva, un asistente experto en múltiples temas." },
        { role: "user", content: message },
      ],
      max_tokens: 200,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error en la API de OpenAI:", error);
    res.status(500).json({ error: "Error en la respuesta de OpenAI" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
