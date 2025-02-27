require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 4000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

let chatHistory = [];

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensaje vacío" });
    }

    // Construcción del historial de chat
    chatHistory.push({ role: "user", content: message });

    // Llamar a OpenAI (GPT-4 Turbo o la versión que tengas)
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Cambia a "gpt-3.5-turbo" si no tienes acceso a GPT-4
      messages: [
        { role: "system", content: "Eres un asistente útil y conversacional llamado AUREA 33 IA Inmersiva." },
        ...chatHistory, // Enviar historial de conversación
      ],
      max_tokens: 200,
    });

    const reply = response.choices[0]?.message?.content || "No entendí, ¿puedes reformularlo?";

    chatHistory.push({ role: "assistant", content: reply });

    res.json({ reply });
  } catch (error) {
    console.error("Error en OpenAI:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
