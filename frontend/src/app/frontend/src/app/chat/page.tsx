"use client";  // Asegura que el código se ejecute en el cliente

import { useEffect, useState } from "react";

export default function ChatPage() {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("🔄 Intentando conectar con el backend...");

        const response = await fetch("http://localhost:4000/api");
        if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

        const result = await response.json();
        console.log("✅ Datos recibidos:", result);
        setData(result);
      } catch (error) {
        console.error("❌ Error al conectar con la API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#0f172a",
      color: "#f8fafc",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Chat Page</h1>
      
      {loading ? (
        <p style={{ fontSize: "18px", color: "#facc15" }}>Cargando datos del backend...</p>
      ) : data ? (
        <>
          <p style={{ fontSize: "18px", marginBottom: "10px" }}>📡 Datos del Backend:</p>
          <pre style={{
            background: "#1e293b",
            color: "#f8fafc",
            padding: "15px",
            borderRadius: "5px",
            fontFamily: "monospace",
            overflowX: "auto",
            fontSize: "16px"
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      ) : (
        <p style={{ color: "#ef4444", fontSize: "18px" }}>⚠ No se pudieron obtener datos del backend.</p>
      )}
    </div>
  );
}
