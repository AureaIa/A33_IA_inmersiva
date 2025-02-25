const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware para interpretar JSON en las peticiones
app.use(express.json());

// Ruta de prueba para verificar que el backend funciona correctamente
app.get("/api", (req, res) => {
    res.json({ message: "API funcionando en el backend 🚀" });
});

// Ruta adicional para verificar conexión
app.get("/status", (req, res) => {
    res.json({ status: "Backend activo", port: PORT });
});

// Manejo de rutas inexistentes (evita errores de Next.js con /chat)
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
