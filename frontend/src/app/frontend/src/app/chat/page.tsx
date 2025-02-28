"use client";

import { useState } from "react";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    // Definir la URL del backend desde variable de entorno o fallback a localhost
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Agregar mensaje del usuario al historial
        setHistory(prev => [...prev, { role: "user", content: input }]);
        setIsTyping(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error("Error en la API");

            const data = await response.json();
            setHistory(prev => [...prev, { role: "ia", content: data.reply }]);
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            setHistory(prev => [...prev, { role: "ia", content: "⚠️ Error al obtener respuesta. Inténtalo de nuevo." }]);
        } finally {
            setIsTyping(false);
        }

        setInput("");
    };

    return (
        <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Chat con IA</h1>
            <div>
                <input
                    style={{ width: "80%", padding: "10px", marginRight: "10px" }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
            <div style={{ marginTop: "20px" }}>
                <h3>📜 Historial del Chat</h3>
                {history.map((msg, index) => (
                    <p key={index}>
                        {msg.role === "user" ? "🧑‍💻" : "🤖"} <b>{msg.role.toUpperCase()}:</b> {msg.content}
                    </p>
                ))}
                {isTyping && <p>🤖 <b>IA:</b> Escribiendo...</p>}
            </div>
        </div>
    );
}
