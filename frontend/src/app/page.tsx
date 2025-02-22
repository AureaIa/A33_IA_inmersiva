'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      {/* Título */}
      <motion.h1 
        className="text-5xl font-bold mb-6"
        animate={{ color: ["#FFD700", "#FFFFFF", "#FF69B4"], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      >
        ÁUREA 33 - IA INMERSIVA
      </motion.h1>

      {/* Subtítulo */}
      <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl">
        Experimenta la inteligencia artificial en imágenes, videos y conversaciones, diseñado en México.
      </p>

      {/* Botones de navegación */}
      <div className="flex gap-4">
        
        <motion.button
          className="px-6 py-3 text-white font-bold text-lg rounded-md transition-all"
          style={{
            background: "rgba(0, 255, 255, 0.2)",
            border: "2px solid cyan",
            boxShadow: "0 0 10px cyan"
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px cyan" }}
          onClick={() => window.location.href = "/chat"}
        >
          Chat IA
        </motion.button>

        <motion.button
          className="px-6 py-3 text-white font-bold text-lg rounded-md transition-all"
          style={{
            background: "rgba(50, 205, 50, 0.2)",
            border: "2px solid lime",
            boxShadow: "0 0 10px lime"
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px lime" }}
          onClick={() => window.location.href = "/image"}
        >
          Generador de Imágenes
        </motion.button>

        <motion.button
          className="px-6 py-3 text-white font-bold text-lg rounded-md transition-all"
          style={{
            background: "rgba(255, 69, 0, 0.2)",
            border: "2px solid red",
            boxShadow: "0 0 10px red"
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px red" }}
          onClick={() => window.location.href = "/video"}
        >
          Generador de Video
        </motion.button>
      </div>
    </div>
  );
}
