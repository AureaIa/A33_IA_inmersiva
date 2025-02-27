"use client";  // Asegura que el código se ejecute en el cliente

import { useState } from "react";

export default function ChatPage() {
    const [input, setInput] = useState(""); // Estado para el input del usuario
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]); // Historial del chat

    // Función para manejar el envío de mensajes
    const sendMessage = async () => {
        if (!input.trim()) return; // Evita enviar mensajes vacíos

        // Agrega el mensaje del usuario al historial
        setHistory((prev) => [...prev, { role: "user", content: input }]);
        
        try {
            const response = await fetch("http://localhost:4000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error("Error en la API");

            const data = await response.json();

            // Agrega la respuesta de la IA al historial del chat
            setHistory((prev) => [...prev, { role: "ia", content: data.reply }]);

        } catch (error) {
            console.error("Error al conectar con la API:", error);
        }

        setInput(""); // Limpia el input después de enviar
    };

    return (
        <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "20px", textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Chat con IA</h1>
            
            {/* Input y botón de envío */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    style={{
                        padding: "10px",
                        width: "50%",
                        borderRadius: "5px",
                        border: "1px solid #fff",
                        backgroundColor: "#222",
                        color: "#fff"
                    }}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#007BFF",
                        borderRadius: "5px",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Enviar
                </button>
            </div>

            {/* Botones de navegación */}
            <div style={{ marginBottom: "20px" }}>
                <button style={{ marginRight: "10px", padding: "10px", border: "2px solid cyan", borderRadius: "5px", backgroundColor: "transparent", color: "cyan", cursor: "pointer" }}>HOME</button>
                <button style={{ marginRight: "10px", padding: "10px", border: "2px solid lime", borderRadius: "5px", backgroundColor: "transparent", color: "lime", cursor: "pointer" }}>GENERADOR DE IMÁGENES</button>
                <button style={{ padding: "10px", border: "2px solid red", borderRadius: "5px", backgroundColor: "transparent", color: "red", cursor: "pointer" }}>GENERADOR DE VIDEO</button>
            </div>

            {/* Historial del chat */}
            <div style={{ maxWidth: "600px", margin: "auto", textAlign: "left", backgroundColor: "#222", padding: "15px", borderRadius: "5px" }}>
                <h3 style={{ textAlign: "center", marginBottom: "10px" }}>📜 Historial del Chat</h3>
                {history.map((msg, index) => (
                    <div key={index} style={{ padding: "5px 0", fontSize: "1rem" }}>
                        {msg.role === "user" ? (
                            <strong>🧑‍💻 Tú:</strong>
                        ) : (
                            <strong>🤖 IA:</strong>
                        )}{" "}
                        {msg.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
