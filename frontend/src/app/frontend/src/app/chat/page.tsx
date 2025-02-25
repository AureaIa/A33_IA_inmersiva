"use client"; // Asegura que el código se ejecute en el cliente

import { useEffect, useState } from "react";

export default function ChatPage() {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Verifica si `fetch` está disponible en el cliente
        if (typeof window !== "undefined") {
          const response = await fetch("http://localhost:4000/api");
          if (!response.ok) throw new Error("Error en la API");

          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Error al conectar con la API:", error);
      } finally {
        setLoading(false); // Desactiva el estado de carga
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Chat Page</h1>
      
      {loading ? (
        <p>Cargando datos del backend...</p>
      ) : data ? (
        <>
          <p>Datos del Backend:</p>
          <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      ) : (
        <p>No se pudieron obtener datos del backend.</p>
      )}
    </div>
  );
}
