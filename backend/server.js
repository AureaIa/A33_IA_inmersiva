const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Historial de mensajes en memoria (esto se reinicia si el servidor se apaga)
let chatHistory = [];

app.get("/status", (req, res) => {
    res.json({ status: "Backend activo", port: PORT });
});

app.get("/api", (req, res) => {
    res.json({ message: "API funcionando en el backend 🚀" });
});

// 🔹 Nueva ruta para manejar la conversación
app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Mensaje vacío" });
    }

    // Simulación de IA básica: responder con el último mensaje más un extra
    const botResponse = `🤖 IA: Me dijiste - "${message}". ¿Algo más?`;

    // Guardamos en el historial la conversación
    chatHistory.push({ user: message, bot: botResponse });

    // Enviar la respuesta con el historial
    res.json({ reply: botResponse, history: chatHistory });
});

// Servidor escuchando en el puerto 4000
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
