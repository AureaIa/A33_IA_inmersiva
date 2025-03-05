"use client";
import { useState } from "react";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
    const [chats, setChats] = useState<{ title: string; messages: { role: string; content: string }[] }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentChat, setCurrentChat] = useState<number | null>(null);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    const sendMessage = async () => {
        if (!input.trim()) return;

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

    const createNewChat = () => {
        const title = history.length > 0 ? history[0].content.slice(0, 20) : "Nuevo Chat";
        setChats([...chats, { title, messages: history }]);
        setHistory([]);
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 p-4">
                <h2 className="text-xl font-bold mb-4">📜 Historial</h2>
                <button className="bg-yellow-500 text-black p-2 rounded mb-4 w-full" onClick={createNewChat}>Nuevo Chat</button>
                <ul>
                    {chats.map((chat, index) => (
                        <li key={index} className="cursor-pointer p-2 hover:bg-gray-700 rounded">
                            {chat.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Section */}
            <div className="w-2/4 flex flex-col p-4">
                <h1 className="text-center text-2xl font-bold">✨ Aurea 33 Chat Inmersivo ✨</h1>
                <div className="flex-1 bg-gray-700 p-4 rounded mt-4 overflow-auto">
                    {history.map((msg, index) => (
                        <p key={index} className={msg.role === "user" ? "text-blue-400" : "text-green-400"}>
                            {msg.role === "user" ? "🧑‍💻" : "🤖"} <b>{msg.role.toUpperCase()}:</b> {msg.content}
                        </p>
                    ))}
                    {isTyping && <p className="text-yellow-400">🤖 <b>IA:</b> Escribiendo...</p>}
                </div>
                <div className="flex mt-4">
                    <input
                        className="flex-1 p-2 bg-white text-black rounded"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                    />
                    <button className="bg-yellow-500 text-black p-2 rounded ml-2" onClick={sendMessage}>Enviar</button>
                </div>
                <p className="text-center text-xs mt-2">AUREA33 IA puede cometer errores. Considera verificar la veracidad de la información.<br/> IA creada por E.C.S.S. - HECHO EN MÉXICO.</p>
            </div>

            {/* Reference Section */}
            <div className="w-1/4 bg-gray-800 p-4 flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2">🌎 Referencias</h2>
                <div className="w-full h-40 bg-gray-700 animate-pulse flex items-center justify-center">
                    🔎 Buscando información...
                </div>
            </div>
        </div>
    );
}
