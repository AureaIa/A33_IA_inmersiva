'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatPage() {
  const [userInput, setUserInput] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      <motion.h1 className="text-4xl font-bold mb-4">
        Chat con IA
      </motion.h1>

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
