'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ✅ Define la interfaz para las palabras
interface Word {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  fontSize: number;
  opacity: number;
  color: string;
  fontFamily: string;
}

// ✅ Mueve wordsList fuera del componente
const wordsList: string[] = [
  "AI", "Innovación", "Creatividad", "ChatBot", "Conversación", "Inteligencia", "Futuro", "Neural", "Lenguaje",
  "Prompt", "Deep Learning", "こんにちは", "你好", "مرحبا", "Привет", "Bonjour", "Ciao",
  "Hola", "Hallo", "Olá", "नमस्ते", "안녕하세요", "שלום", "Selam", "Hej", "Merhaba", "Sawubona",
  "Tēnā koe", "வணக்கம்", "Kaixo", "سلام", "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "Χαίρετε"
];

export default function ChatPage() {
  // ✅ Especificamos el tipo del estado de fallingWords y groundWords
  const [fallingWords, setFallingWords] = useState<Word[]>([]);
  const [groundWords, setGroundWords] = useState<Word[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWord: Word = {
        id: Math.random(),
        text: wordsList[Math.floor(Math.random() * wordsList.length)], 
        x: Math.random() < 0.5 ? Math.random() * 20 + 5 : Math.random() * 20 + 75,
        y: 0,
        rotation: Math.random() * 360,
        fontSize: Math.random() * 13 + 10,
        opacity: 1,
        color: ["#FFFFFF", "#FFD700", "#FFA500", "#FF69B4", "#90EE90", "#87CEEB"][Math.floor(Math.random() * 6)],
        fontFamily: ["Arial", "Verdana", "Courier", "Georgia", "Times New Roman"][Math.floor(Math.random() * 5)]
      };

      // ✅ Ahora TypeScript sabe que prevWords es de tipo Word[]
      setFallingWords((prevWords) => [...prevWords, newWord]);

      setTimeout(() => {
        setFallingWords((prevWords) => prevWords.filter(word => word.id !== newWord.id));

        setGroundWords((prevWords) => {
          const newHeight = prevWords.length * 5;
          return newHeight < 600 ? [...prevWords, { ...newWord, y: newHeight }] : prevWords;
        });
      }, 4000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.h1 
        className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg text-white"
        animate={{ color: ["#FFB6C1", "#ADD8E6", "#E6E6FA", "#FAD02E", "#90EE90"], opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      >
        ÁUREA 33 - IA INMERSIVA
      </motion.h1>
    </div>
  );
}
