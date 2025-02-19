'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function VideoGenerator() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    
    function createParticles() {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width: Math.random() * 80 + 20,
          height: Math.random() * 40 + 10,
          speedY: Math.random() * 0.5 + 0.2,
          color: ['#00ffff', '#ff00ff', '#ffcc00'][Math.floor(Math.random() * 3)]
        });
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.y -= p.speedY;
        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.width, p.height);
      });

      requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* 🎬 Simulación de Renderizado en Progreso */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-40" />

      {/* 🎞️ Título con Animación RGB */}
      <motion.h1 
        className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg text-white relative z-10"
        animate={{ 
          color: ["#00ffff", "#ff00ff", "#ffcc00", "#ff69b4"],
          opacity: [0.8, 1, 0.8], 
          scale: [1, 1.02, 1] 
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      >
        GENERADOR DE VIDEOS A33
      </motion.h1>

      {/* 🎭 Subtítulo */}
      <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl relative z-10">
        Transforma tus ideas en videos IA con la mejor tecnología en México.
      </p>

      {/* 🎬 Contenedor de la Interfaz */}
      <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-xl shadow-xl flex flex-col items-center relative z-10">
        <h2 className="text-2xl font-bold text-purple-400 mb-4">Interfaz de Generador de Video</h2>
        <p className="text-gray-400 text-center mb-6">Describe el video que deseas crear y deja que la IA lo haga realidad.</p>
        
        {/* 📝 Input de Texto */}
        <div className="w-full flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Describe el video que deseas generar..."
            className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-purple-500 px-5 py-3 rounded-md hover:bg-purple-600 transition">
            Generar Video
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
          onClick={() => window.location.href = "/image"}
        >
          Generador de Imágenes
        </motion.button>
      </div>
    </div>
  );
}
