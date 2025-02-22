'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoPage() {
  const [videoPrompt, setVideoPrompt] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      <motion.h1 className="text-4xl font-bold mb-4">
        Generador de Videos
      </motion.h1>

      <input 
        type="text" 
        value={videoPrompt}
        onChange={(e) => setVideoPrompt(e.target.value)}
        placeholder="Describe el video..."
        className="w-full p-3 bg-gray-800 text-white rounded-md mb-4"
      />
      <button className="bg-red-500 px-5 py-3 rounded-md hover:bg-red-600 transition">
        Generar Video
      </button>

      <div className="mt-10 flex gap-4">
        <motion.button className="btn-nav cyan" onClick={() => window.location.href = "/"}>
          Home
        </motion.button>
        <motion.button className="btn-nav lime" onClick={() => window.location.href = "/chat"}>
          Chat IA
        </motion.button>
        <motion.button className="btn-nav red" onClick={() => window.location.href = "/image"}>
          Generador de Imágenes
        </motion.button>
      </div>
    </div>
  );
}
