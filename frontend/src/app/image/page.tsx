"use client";

import { useEffect, useRef } from "react";

export default function ImageGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // ✅ Previene errores si canvas es null

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // ✅ Previene errores si el contexto es null

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dibujo en el canvas (fondo blanco)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Generador de Imágenes</h1>
      <canvas ref={canvasRef} className="border border-gray-300" />
      <button className="mt-4 bg-cyan-500 px-5 py-3 rounded-md hover:bg-cyan-600 transition">
        Generar Imagen
      </button>
    </div>
  );
}
