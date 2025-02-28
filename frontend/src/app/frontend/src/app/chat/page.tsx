"use client";

import { useState, useEffect } from "react";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ title: string; messages: { role: string; content: string }[] }[]>([]);
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    const sendMessage = async () => {
        if (!input.trim()) return;

        setIsTyping(true);

        let newHistory = [...history];
        if (activeChat === null) {
            newHistory.push({ title: input.slice(0, 20), messages: [{ role: "user", content: input }] });
            setActiveChat(newHistory.length - 1);
        } else {
            newHistory[activeChat].messages.push({ role: "user", content: input });
        }

        setHistory(newHistory);
        
        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error("Error en la API");

            const data = await response.json();
            newHistory[activeChat ?? newHistory.length - 1].messages.push({ role: "ia", content: formatMessage(data.reply) });
            setHistory(newHistory);
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            newHistory[activeChat ?? newHistory.length - 1].messages.push({ role: "ia", content: "⚠️ Error al obtener respuesta. Inténtalo de nuevo." });
            setHistory(newHistory);
        } finally {
            setIsTyping(false);
        }

        setInput("");
    };

    const formatMessage = (message: string) => {
        return message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
    };

    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: "#111", color: "white" }}>
            {/* Historial de Chats */}
            <div style={{ width: "20%", backgroundColor: "#222", padding: "15px" }}>
                <h2>📜 Historial</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {history.map((chat, index) => (
                        <li key={index} onClick={() => setActiveChat(index)} style={{ cursor: "pointer", padding: "10px", background: activeChat === index ? "#333" : "none" }}>
                            {chat.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Principal */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h1 style={{ textAlign: "center", padding: "15px", backgroundColor: "#333" }}>✨ Aurea 33 Chat Inmersivo ✨</h1>
                <div style={{ flex: 1, padding: "15px", overflowY: "auto" }}>
                    {activeChat !== null && history[activeChat].messages.map((msg, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: msg.role === "user" ? `🧑‍💻 <b>USER:</b> ${msg.content}` : `🤖 <b>IA:</b> ${msg.content}` }}></p>
                    ))}
                    {isTyping && <p>🤖 <b>IA:</b> Escribiendo...</p>}
                </div>
                
                {/* Barra de entrada */}
                <div style={{ display: "flex", padding: "10px", backgroundColor: "#222" }}>
                    <input
                        style={{ flex: 1, padding: "10px", borderRadius: "5px" }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                    />
                    <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px", backgroundColor: "yellow", border: "none", borderRadius: "5px" }}>Enviar</button>
                </div>
                <p style={{ textAlign: "center", fontSize: "12px", padding: "5px", backgroundColor: "#111" }}>
                    AUREA33 IA puede cometer errores. Considera verificar la veracidad de la información.<br />
                    IA creada por E.C.S.S. - HECHO EN MÉXICO.
                </p>
            </div>
        </div>
    );
}
