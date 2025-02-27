"use client";

import { useEffect, useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);

  // 🔹 Enviar mensaje al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setHistory([...history, { role: "user", content: input }]); // Añadir mensaje del usuario

      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Error al enviar mensaje");

      const result = await response.json();
      setHistory(result.history); // Actualizar historial completo con la respuesta de IA

      setInput(""); // Limpiar input
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
          <p key={index} style={{ marginBottom: "10px", fontSize: "16px" }}>
            <strong>{msg.role === "user" ? "🧑‍💻 Tú:" : "🤖 IA:"}</strong> {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
}
