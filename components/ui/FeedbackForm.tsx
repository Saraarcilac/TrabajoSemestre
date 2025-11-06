"use client";
import { useState } from "react";
import axios from "axios";

export default function FeedbackForm({ onFeedbackSent }: any) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3000/developers",
        { comment: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("");
      if (onFeedbackSent) onFeedbackSent();
    } catch (err) {
      alert("Error al enviar feedback ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
      <textarea
        placeholder="Escribe tu feedback o tip..."
        className="border p-2 rounded resize-none"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="bg-black text-white p-2 rounded">Enviar</button>
    </form>
  );
}