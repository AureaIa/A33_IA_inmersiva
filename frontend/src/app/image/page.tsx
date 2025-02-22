'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImagePage() {
  const [imagePrompt, setImagePrompt] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      <motion.h1 className="text-4xl font-bold mb-4">
        Generador de Imágenes
      </motion.h1>

      <input 
        type="text" 
        value={imagePrompt}
        onChange={(e) => setImagePrompt(e.target.value)}
        placeholder="Describe la imagen..."
        className="w-full p-3 bg-gray-800 text-white rounded-md mb-4"
      />
      <button className="bg-green-500 px-5 py-3 rounded-md hover:bg-green-600 transition">
        Generar Imagen
      </button>

      <div className="mt-10 flex gap-4">
        <motion.button className="btn-nav cyan" onClick={() => window.location.href = "/"}>
          Home
        </motion.button>
        <motion.button className="btn-nav lime" onClick={() => window.location.href = "/chat"}>
          Chat IA
        </motion.button>
        <motion.button className="btn-nav red" onClick={() => window.location.href = "/video"}>
          Generador de Video
        </motion.button>
      </div>
    </div>
  );
}

