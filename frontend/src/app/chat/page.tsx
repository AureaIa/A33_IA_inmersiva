const sendMessage = async () => {
  if (!input.trim()) return;

  setHistory([...history, { role: "user", content: input }]);

  try {
      const response = await fetch("http://localhost:4000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setHistory([...history, { role: "user", content: input }, { role: "assistant", content: data.reply }]);
  } catch (error) {
      console.error("Error al conectar con la API:", error);
  }

  setInput("");
};
