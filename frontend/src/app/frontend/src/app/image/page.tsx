'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ImageGenerator() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let path = [{ x: Math.random() * canvas.width, y: Math.random() * canvas.height }];
    let angle = 0;

    function drawPath() {
      if (path.length > 500) path.shift(); // Mantener límite de puntos

      const lastPoint = path[path.length - 1];
      angle += (Math.random() - 0.5) * 0.5; // Variación mínima
      const newX = lastPoint.x + Math.cos(angle) * 5;
      const newY = lastPoint.y + Math.sin(angle) * 5;

      if (newX > 0 && newX < canvas.width && newY > 0 && newY < canvas.height) {
        path.push({ x: newX, y: newY });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#C0C0C0"; // Beige/Gris suave
      ctx.beginPath();
      
      path.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      ctx.stroke();
      requestAnimationFrame(drawPath);
    }

    drawPath();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* 🎨 Lienzo con trazo aleatorio */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* 🎭 Título con RGB Pastel */}
      <motion.h1 
        className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg text-white relative z-10"
        animate={{ 
          color: ["#FFB6C1", "#ADD8E6", "#E6E6FA", "#FAD02E", "#90EE90"],
          opacity: [0.8, 1, 0.8], 
          scale: [1, 1.02, 1] 
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      >
        GENERADOR DE IMÁGENES A33
      </motion.h1>

      {/* 🖼 Subtítulo */}
      <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl relative z-10">
        Generador de Imágenes A33 programado en México.
      </p>

      {/* 🎨 Contenedor de la interfaz */}
      <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-xl shadow-xl flex flex-col items-center relative z-10">
        <h2 className="text-2xl font-bold text-green-400 mb-4">Interfaz de Generador de Imágenes</h2>
        <p className="text-gray-400 text-center mb-6">Escribe un prompt y deja que nuestra IA cree la imagen perfecta.</p>
        
        {/* 📝 Input de texto */}
        <div className="w-full flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Describe la imagen que deseas generar..."
            className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-500 px-5 py-3 rounded-md hover:bg-green-600 transition">
            Generar Imagen
          </button>
        </div>
      </div>

      {/* 🔘 Botones Flotantes Neón */}
      <div className="absolute bottom-5 flex gap-4 z-10">
        <motion.button
          className="px-6 py-3 text-white font-bold text-lg rounded-md transition-all"
          style={{
            background: "rgba(0, 255, 255, 0.2)",
            border: "2px solid cyan",
            boxShadow: "0 0 10px cyan"
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px cyan" }}
          onClick={() => window.location.href = "/"}
        >
          Home
        </motion.button>

        <motion.button
          className="px-6 py-3 text-white font-bold text-lg rounded-md transition-all"
          style={{
            background: "rgba(50, 205, 50, 0.2)",
            border: "2px solid lime",
            boxShadow: "0 0 10px lime"
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px lime" }}
          onClick={() => window.location.href = "/chat"}
        >
          Chat A33
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
