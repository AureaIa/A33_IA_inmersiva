"use client";

import { useState } from "react";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setHistory([...history, { role: "user", content: input }]);

        try {
            const response = await fetch("http://localhost:4000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error("Error en la API");

            const data = await response.json();
            setHistory([...history, { role: "user", content: input }, { role: "ia", content: data.reply }]);
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            setHistory([...history, { role: "ia", content: "⚠️ Error al obtener respuesta. Inténtalo de nuevo." }]);
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
            </div>
        </div>
    );
}
