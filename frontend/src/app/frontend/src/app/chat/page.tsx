"use client";

import { useState } from "react";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ title: string; messages: { role: string; content: string }[] }[]>([]);
    const [currentChat, setCurrentChat] = useState<{ title: string; messages: { role: string; content: string }[] } | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { role: "user", content: input };
        setIsTyping(true);

        let newChat = currentChat || { title: input.substring(0, 20) + "...", messages: [] };
        newChat.messages.push(newMessage);
        setCurrentChat({ ...newChat });

        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error("Error en la API");

            const data = await response.json();
            newChat.messages.push({ role: "ia", content: data.reply });
            setCurrentChat({ ...newChat });
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            newChat.messages.push({ role: "ia", content: "⚠️ Error al obtener respuesta. Inténtalo de nuevo." });
            setCurrentChat({ ...newChat });
        } finally {
            setIsTyping(false);
            setInput("");
        }
    };

    const saveChatToHistory = () => {
        if (currentChat) {
            setHistory((prev) => [...prev, currentChat]);
            setCurrentChat(null);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "white" }}>
            {/* Sidebar */}
            <div style={{ width: "20%", backgroundColor: "#1e1e1e", padding: "20px", overflowY: "auto" }}>
                <h2>📜 Historial</h2>
                {history.map((chat, index) => (
                    <p key={index} style={{ cursor: "pointer" }} onClick={() => setCurrentChat(chat)}>
                        🗂️ {chat.title}
                    </p>
                ))}
            </div>

            {/* Chat Window */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h1 style={{ textAlign: "center", padding: "10px" }}>✨ Aurea 33 Chat Inmersivo ✨</h1>
                <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                    {currentChat?.messages.map((msg, index) => (
                        <p key={index}>
                            {msg.role === "user" ? "🧑‍💻" : "🤖"} <b>{msg.role.toUpperCase()}:</b> {msg.content}
                        </p>
                    ))}
                    {isTyping && <p>🤖 <b>IA:</b> Escribiendo...</p>}
                </div>

                {/* Input Bar */}
                <div style={{ padding: "10px", backgroundColor: "#1e1e1e", position: "sticky", bottom: 0, display: "flex" }}>
                    <input
                        style={{ flex: 1, padding: "10px", marginRight: "10px", backgroundColor: "#333", color: "white", border: "none" }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                    />
                    <button onClick={sendMessage} style={{ padding: "10px", backgroundColor: "gold", border: "none", cursor: "pointer" }}>
                        Enviar
                    </button>
                </div>
                <p style={{ textAlign: "center", fontSize: "12px", color: "gray" }}>
                    AUREA33 IA puede cometer errores. Considera verificar la veracidad de la información.<br />
                    IA creada por E.C.S.S. - HECHO EN MÉXICO.
                </p>
            </div>
        </div>
    );
}
