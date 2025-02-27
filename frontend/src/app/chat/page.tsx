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

            const data = await response.json();

            setHistory([
                ...history,
                { role: "user", content: input },
                { role: "assistant", content: data.reply },
            ]);
        } catch (error) {
            console.error("Error al conectar con la API:", error);
        }

        setInput("");
    };

    return (
        <div style={{ padding: "20px", color: "white", textAlign: "center", backgroundColor: "black", height: "100vh" }}>
            <h1>Chat con IA</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                style={{ padding: "10px", width: "60%" }}
            />
            <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px" }}>
                Enviar
            </button>
            <div style={{ marginTop: "20px", textAlign: "left", maxWidth: "600px", margin: "auto" }}>
                <h3>🗂 Historial del Chat</h3>
                {history.map((msg, index) => (
                    <p key={index}>
                        {msg.role === "user" ? "🧑‍💻 Tú: " : "🤖 IA: "}
                        {msg.content}
                    </p>
                ))}
            </div>
        </div>
    );
}
