"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ImageGenerator() {
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "black"; // Fondo negro
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.h1 className="text-4xl font-bold mb-4">Generador de Imágenes</motion.h1>
      
      {/* Input de usuario */}
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Describe la imagen..."
        className="w-full p-3 bg-gray-800 text-white rounded-md mb-4"
      />

      {/* Botón para generar imagen */}
      <button className="bg-cyan-500 px-5 py-3 rounded-md hover:bg-cyan-600 transition">
        Generar Imagen
      </button>

      {/* Canvas para mostrar la imagen generada */}
      <canvas ref={canvasRef} className="border border-gray-300 mt-4" />

      {/* Navegación */}
      <div className="mt-10 flex gap-4">
        <motion.button className="btn-nav cyan" onClick={() => window.location.href = "/"}>
          Home
        </motion.button>
        <motion.button className="btn-nav lime" onClick={() => window.location.href = "/video"}>
          Generador de Video
        </motion.button>
      </div>
    </div>
  );
}
