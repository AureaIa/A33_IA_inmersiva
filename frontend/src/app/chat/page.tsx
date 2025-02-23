'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatPage() {
  const [userInput, setUserInput] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Título principal */}
      <motion.h1 
        className="text-4xl font-bold mb-6 tracking-wide drop-shadow-lg text-white"
        animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      >
        Chat con IA
      </motion.h1>

      {/* Input para ingresar el mensaje */}
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className="w-full max-w-lg p-3 bg-gray-800 text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Botón para enviar mensaje */}
      <button 
        className="bg-cyan-500 px-5 py-3 rounded-md hover:bg-cyan-600 transition"
      >
        Enviar
      </button>

      {/* Botones de navegación */}
      <div className="mt-10 flex gap-4">
        <motion.button 
          className="btn-nav cyan"
          onClick={() => window.location.href = "/"}
        >
          Home
        </motion.button>

        <motion.button 
          className="btn-nav lime"
          onClick={() => window.location.href = "/image"}
        >
          Generador de Imágenes
        </motion.button>

        <motion.button 
          className="btn-nav red"
          onClick={() => window.location.href = "/video"}
        >
          Generador de Video
        </motion.button>
      </div>
    </div>
  );
}
