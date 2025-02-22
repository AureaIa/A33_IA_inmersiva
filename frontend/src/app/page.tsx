'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      <motion.h1 className="text-5xl font-bold mb-6">
        ÁUREA 33 - IA INMERSIVA
      </motion.h1>

      <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl">
        Genera conversaciones con IA, imágenes y videos con un solo clic.
      </p>

      <div className="flex flex-wrap gap-4">
        <motion.button className="btn-nav cyan" onClick={() => window.location.href = "/chat"}>
          Chat IA
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
