const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Permite peticiones desde el frontend
app.use(bodyParser.json()); // Parsea JSON en las peticiones

// Mensajes previos para mantener el contexto de la conversación
let chatHistory = [];

// Endpoint de prueba para verificar que el backend funciona
app.get("/status", (req, res) => {
    res.json({ status: "Backend activo", port: PORT });
});

// Endpoint principal de la API
app.post("/api/chat", (req, res) => {
    const { message } = req.body; // Extrae el mensaje del usuario

    if (!message) {
        return res.status(400).json({ error: "Mensaje vacío, envía algo." });
    }

    // Agrega el mensaje del usuario al historial del chat
    chatHistory.push({ role: "user", content: message });

    // Simula una respuesta más natural de la IA
    let reply = generateAIResponse(message);

    // Agrega la respuesta de la IA al historial
    chatHistory.push({ role: "ia", content: reply });

    res.json({ reply });
});

// Función que genera respuestas dinámicas
function generateAIResponse(input) {
    input = input.toLowerCase().trim();

    if (input.includes("hola")) return "¡Hola! ¿Cómo puedo ayudarte hoy?";
    if (input.includes("cómo estás")) return "Estoy en línea y listo para ayudarte 😊.";
    if (input.includes("quién eres")) return "Soy AUREA 33 IA Inmersiva, tu asistente de inteligencia artificial.";
    if (input.includes("adiós") || input.includes("bye")) return "¡Hasta luego! Espero verte pronto. 👋";
    
    // Respuesta por defecto
    return `Recibí tu mensaje: "${input}". ¿Puedes darme más detalles?`;
}

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
