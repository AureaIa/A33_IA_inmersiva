"use client";

import { useEffect, useState } from "react";

export default function ChatPage() {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ user: string; bot: string }[]>([]); // Guardar la conversación

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("🔄 Intentando conectar con el backend...");

        const response = await fetch("http://localhost:4000/api");
        if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

        const result = await response.json();
        console.log("✅ Datos recibidos:", result);
        setData(result);
      } catch (error) {
        console.error("❌ Error al conectar con la API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 🔹 Manejar el envío de mensajes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      console.log("📩 Enviando mensaje:", input);

      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Error al enviar mensaje");

      const result = await response.json();
      console.log("✅ Respuesta de la IA:", result);

      // Guardar la conversación en el estado
      setHistory(result.history);

      setInput(""); // Limpiar input después de enviar
    } catch (error) {
      console.error("❌ Error en la API:", error);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Chat con IA</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            borderRadius: "5px",
            border: "none",
            textAlign: "center",
            backgroundColor: "#1e293b",
            color: "#fff"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginLeft: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#00aaff",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Enviar
        </button>
      </form>

      <div style={{ display: "flex", gap: "15px" }}>
        <button style={buttonStyle("#00ffcc")}>HOME</button>
        <button style={buttonStyle("#00ff00")}>GENERADOR DE IMÁGENES</button>
        <button style={buttonStyle("#ff0000", true)}>GENERADOR DE VIDEO</button>
      </div>

      <div style={{ marginTop: "20px", width: "80%" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>📡 Datos del Backend:</h2>
        {loading ? (
          <p style={{ color: "#facc15", fontSize: "18px" }}>Cargando datos...</p>
        ) : data ? (
          <pre style={{
            background: "#1e293b",
            color: "#f8fafc",
            padding: "15px",
            borderRadius: "5px",
            fontFamily: "monospace",
            overflowX: "auto",
            fontSize: "16px"
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p style={{ color: "#ef4444", fontSize: "18px" }}>⚠ No se pudieron obtener datos.</p>
        )}
      </div>

      {/* 🔹 Mostramos la conversación completa */}
      <div style={{
        marginTop: "20px",
        backgroundColor: "#1e293b",
        padding: "10px",
        borderRadius: "5px",
        width: "50%",
        textAlign: "left",
        fontSize: "18px"
      }}>
        <h2>🗨 Historial del Chat</h2>
        {history.map((msg, index) => (
          <p key={index}>
            <strong>🧑‍💻 Tú:</strong> {msg.user} <br />
            <strong>🤖 IA:</strong> {msg.bot}
          </p>
        ))}
      </div>
    </div>
  );
}

// 🔹 Función para los estilos de los botones
const buttonStyle = (color: string, isRed?: boolean) => ({
  padding: "10px 15px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "5px",
  border: isRed ? "2px solid red" : "2px solid " + color,
  backgroundColor: "transparent",
  color: color,
  cursor: "pointer",
  boxShadow: isRed ? "0px 0px 10px red" : "0px 0px 10px " + color,
  transition: "all 0.3s ease",
  textTransform: "uppercase",
});
