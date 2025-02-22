'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatPage() {
  const [userInput, setUserInput] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">

      {/* Título */}
      <motion.h1 
        className="text-4xl font-bold mb-4"
        animate={{ color: ["#FFD700", "#FFFFFF", "#FF69B4"], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      >
        Chat con IA
      </motion.h1>

      {/* Input para escribir mensaje */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        <input 
          type="text" 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="w-full p-3 bg-gray-800 text-white rounded-md mb-4"
        />
        <button className="bg-cyan-500 px-5 py-3 rounded-md hover:bg-cyan-600 transition">
          Enviar Mensaje
        </button>
      </div>

      {/* Botones de navegación */}
      <div className="mt-10 flex gap-4">
        <motion.button className="btn-nav cyan" onClick={() => window.location.href = "/"}>
          Home
        </motion.button>
        <motion.button className="btn-nav lime" onClick={() => window.location.href = "/image"}>
          Generador de Imágenes
        </motion.button>
        <motion.button className="btn-nav red" onClick={() => window.location.href = "/video"}>
          Generador de Video
        </motion.button>
      </div>
    </div>
  );
}
