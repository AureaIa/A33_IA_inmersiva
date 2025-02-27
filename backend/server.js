require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Configuración de OpenAI
const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

// Historial de mensajes en memoria (se perderá al reiniciar)
let chatHistory = [];

app.get("/status", (req, res) => {
  res.json({ status: "Backend activo", port: PORT });
});

app.get("/api", (req, res) => {
  res.json({ message: "API funcionando en el backend 🚀" });
});

// 🔹 API de Chat mejorada con IA
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensaje vacío" });
  }

  try {
    // Agregamos el mensaje del usuario al historial
    chatHistory.push({ role: "user", content: message });

    // Enviar la conversación a OpenAI para obtener una respuesta
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Eres AUREA 33 IA INMERSIVA, una IA conversacional avanzada y amigable. Responde de manera natural y útil." },
        ...chatHistory, // Enviar el historial de la conversación
      ],
    });

    const botResponse = completion.data.choices[0].message.content;

    // Guardamos la respuesta en el historial
    chatHistory.push({ role: "assistant", content: botResponse });

    // Enviar la respuesta al frontend
    res.json({ reply: botResponse, history: chatHistory });
  } catch (error) {
    console.error("❌ Error en OpenAI:", error);
    res.status(500).json({ error: "Error procesando la solicitud con OpenAI" });
  }
});

// Servidor escuchando en el puerto 4000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
