"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    // Función para enviar mensaje
    const sendMessage = async () => {
        if (!input.trim()) return;

        setHistory(prev => [...(prev || []), { role: "user", content: input }]);
        setIsTyping(true);
        setInput("");

        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error("Error en la API");

            const data = await response.json();
            setHistory(prev => [...(prev || []), { role: "ia", content: data.reply || "⚠️ No se obtuvo respuesta." }]);
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            setHistory(prev => [...(prev || []), { role: "ia", content: "⚠️ Error al obtener respuesta. Inténtalo de nuevo." }]);
        } finally {
            setIsTyping(false);
        }
    };

    // Hacer scroll automático al final del chat cuando cambie el historial
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    return (
        <div style={{ backgroundColor: "#1E1E2E", color: "#E0E0E0", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Encabezado */}
            <div style={{ textAlign: "center", padding: "10px", fontSize: "20px", fontWeight: "bold", backgroundColor: "#2A2D3E" }}>
                ✨ Aurea 33 Chat Inmersivo ✨
            </div>

            {/* Contenedor del chat */}
            <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                {/* Historial de chats (columna izquierda) */}
                <div style={{ width: "20%", backgroundColor: "#16171F", padding: "10px", overflowY: "auto" }}>
                    <h3 style={{ margin: "0 0 10px", color: "#FFD700" }}>📜 Historial</h3>
                    {history.length === 0 ? (
                        <p style={{ color: "#888" }}>No hay chats previos</p>
                    ) : (
                        history.map((msg, index) => (
                            <p key={index} style={{ fontSize: "14px", marginBottom: "5px" }}>
                                {msg.role === "user" ? "🧑‍💻" : "🤖"} <b>{msg.role.toUpperCase()}:</b> {msg.content.slice(0, 30)}...
                            </p>
                        ))
                    )}
                </div>

                {/* Área de conversación (columna central) */}
                <div style={{ flex: 1, padding: "20px", overflowY: "auto", backgroundColor: "#282A36", borderRadius: "10px" }}>
                    {history.map((msg, index) => (
                        <p key={index} style={{ whiteSpace: "pre-line", padding: "8px", borderRadius: "5px", backgroundColor: msg.role === "user" ? "#3A3D4E" : "#2E3440" }}>
                            {msg.role === "user" ? "🧑‍💻" : "🤖"} <b>{msg.role.toUpperCase()}:</b> {msg.content}
                        </p>
                    ))}
                    {isTyping && <p>🤖 <b>IA:</b> Escribiendo...</p>}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Barra de entrada de texto */}
            <div style={{ display: "flex", padding: "10px", backgroundColor: "#2A2D3E", borderTop: "1px solid #444" }}>
                <input
                    style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "none", outline: "none", fontSize: "16px", backgroundColor: "#E0E0E0", color: "#000" }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button
                    onClick={sendMessage}
                    style={{ marginLeft: "10px", padding: "10px 15px", borderRadius: "5px", border: "none", backgroundColor: "#FFD700", color: "#000", fontSize: "16px", cursor: "pointer" }}>
                    Enviar
                </button>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", padding: "10px", fontSize: "12px", backgroundColor: "#16171F", color: "#888" }}>
                AUREA33 IA puede cometer errores. Considera verificar la veracidad de la información.  
                <br /> IA creada por **E.C.S.S.** - **HECHO EN MÉXICO.**
            </div>
        </div>
    );
}
