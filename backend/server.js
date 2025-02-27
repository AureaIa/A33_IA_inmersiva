const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
    const { message } = req.body;
    res.json({ reply: `IA: Recibí tu mensaje - "${message}". ¿Algo más?` });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
