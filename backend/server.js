app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Mensaje vacío" });
    }

    // Respuesta simulada (después puedes conectar con OpenAI u otra IA)
    const responseText = `🤖 IA: Recibí tu mensaje - "${message}"`;

    res.json({ reply: responseText });
});
