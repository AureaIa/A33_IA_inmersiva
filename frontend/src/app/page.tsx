'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  const router = useRouter();
  const particlesRef = useRef(null);

  useEffect(() => {
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const numParticles = 50;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.color = ['#FFD700', '#FFFFFF', '#FFA500'][Math.floor(Math.random() * 3)];
      }
      update() {
        this.y -= this.speedY;
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <canvas ref={particlesRef} className="absolute top-0 left-0 w-full h-full" />
      <motion.h1 
        className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg"
        animate={{ opacity: [0, 1, 1, 0.8, 1], scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        AUREA 33 INMERSIVE IA
      </motion.h1>
      <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl">
        La plataforma definitiva de inteligencia artificial con herramientas avanzadas para generación de contenido.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          { title: 'ChatÁurea', subtitle: 'Tu Asistente Personal en ChatAI', color: 'bg-blue-500', link: '/chat' },
          { title: 'Generador de Imágenes Áurea', subtitle: 'Tu Generador de Imágenes con IA', color: 'bg-green-500', link: '/image' },
          { title: 'Generador de Videos Áurea', subtitle: 'Tu Generador de Video con IA', color: 'bg-red-500', link: '/video' }
        ].map((service, index) => (
          <motion.div 
            key={index} 
            className="bg-gray-800 p-6 rounded-xl shadow-2xl flex flex-col items-center justify-center h-64 hover:scale-105 transition-transform duration-300 ease-in-out relative"
            animate={{ y: [0, -5, 0], boxShadow: '0px 20px 30px rgba(255, 215, 0, 0.2)' }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          >
            <h2 className="text-xl font-semibold text-white">{service.title}</h2>
            <p className="text-gray-400 text-center text-sm mt-2">{service.subtitle}</p>
            <button 
              className={`mt-4 px-5 py-3 rounded-md shadow-md transition-all text-white font-medium ${service.color} hover:brightness-110`}
              onClick={() => router.push(service.link)}
            >
              Ir a {service.title}
            </button>
          </motion.div>
        ))}
      </div>
      
      <main className="w-full max-w-5xl mt-10">{children}</main>
    </div>
  );
}
