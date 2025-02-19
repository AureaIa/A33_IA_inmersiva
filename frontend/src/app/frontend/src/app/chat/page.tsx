'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatPage() {
  const wordsList = [
    "AI", "Innovación", "Creatividad", "ChatBot", "Conversación", "Inteligencia", "Futuro", "Neural", "Lenguaje",
    "Prompt", "Deep Learning", "こんにちは", "你好", "مرحبا", "Привет", "Bonjour", "Ciao",
    "Hola", "Hallo", "Olá", "नमस्ते", "안녕하세요", "שלום", "Selam", "Hej", "Merhaba", "Sawubona",
    "Tēnā koe", "வணக்கம்", "Kaixo", "سلام", "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "Χαίρετε"
  ];

  const [fallingWords, setFallingWords] = useState([]);
  const [groundWords, setGroundWords] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWord = {
        id: Math.random(),
        text: wordsList[Math.floor(Math.random() * wordsList.length)],
        x: Math.random() < 0.5 ? Math.random() * 20 + 5 : Math.random() * 20 + 75,
        y: 0,
        rotation: Math.random() * 360,
        fontSize: Math.random() * 13 + 10,  // Palabras más compactas
        opacity: 1,
        color: ["#FFFFFF", "#FFD700", "#FFA500", "#FF69B4", "#90EE90", "#87CEEB"][Math.floor(Math.random() * 6)],
        fontFamily: ["Arial", "Verdana", "Courier", "Georgia", "Times New Roman"][Math.floor(Math.random() * 5)]
      };

      setFallingWords((prevWords) => [...prevWords, newWord]);

      setTimeout(() => {
        setFallingWords((prevWords) => prevWords.filter(word => word.id !== newWord.id));

        setGroundWords((prevWords) => {
          const newHeight = prevWords.length * 5; // **Interlineado más compacto**
          return newHeight < 600 // **Límite para no bloquear el título**
            ? [...prevWords, { ...newWord, y: newHeight }]
            : prevWords;
        });
      }, 4000);

    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* Efecto de caída de palabras */}
      {fallingWords.map((word) => (
        <motion.div
          key={word.id}
          className="absolute font-bold"
          style={{
            left: `${word.x}%`,
            top: `${word.y}px`,
            fontSize: `${word.fontSize}px`,
            color: word.color,
            fontFamily: word.fontFamily
          }}
          initial={{ y: -50, opacity: 1, rotate: word.rotation }}
          animate={{ y: "90vh", opacity: [1, 1, 1], rotate: word.rotation + 45 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        >
          {word.text}
        </motion.div>
      ))}

      {/* Palabras Apiladas (creciendo hacia el título) */}
      {groundWords.map((word, index) => (
        <motion.div
          key={word.id}
          className="absolute font-bold"
          style={{
            left: `${word.x}%`,
            bottom: `${word.y}px`,
            fontSize: `${word.fontSize}px`,
            color: word.color,
            fontFamily: word.fontFamily
          }}
          animate={{ opacity: [1, 1, 0.9, 0.8, 0.7] }}
          transition={{ duration: 6, ease: "easeInOut" }}
        >
          {word.text}
        </motion.div>
      ))}

      {/* Título con efecto RGB Pastel */}
      <motion.h1 
        className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg text-white"
        animate={{ 
          color: ["#FFB6C1", "#ADD8E6", "#E6E6FA", "#FAD02E", "#90EE90"],
          opacity: [0.8, 1, 0.8], 
          scale: [1, 1.02, 1] 
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      >
        ÁUREA 33 - IA INMERSIVA
      </motion.h1>

      {/* Subtítulo */}
      <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl">
        Tu mejor generador de conversaciones con IA, creado en México.
      </p>

      {/* Contenedor de la interfaz */}
      <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-xl shadow-xl flex flex-col items-center z-10">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Interfaz de Chat IA</h2>
        <p className="text-gray-400 text-center mb-6">Escribe tu mensaje y deja que nuestra IA responda con precisión.</p>
        
        {/* Input de texto para escribir el mensaje */}
        <div className="w-full flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Tu generador de imágenes IA dinámico, elaborado y ejecutado en México." 
            className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button className="bg-cyan-500 px-5 py-3 rounded-md hover:bg-cyan-600 transition">
            Enviar
          </button>
        </div>
      </div>

      {/* Botones Flotantes Neón */}
      <div className="absolute bottom-5 flex gap-4">
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
