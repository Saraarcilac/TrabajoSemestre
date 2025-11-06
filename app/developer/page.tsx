"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";
import FeedbackForm from "@/components/ui/FeedbackForm";

export default function DeveloperPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/developers/tips");
      setFeedbacks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLogged(true);
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          Espacio del Developer 💻
        </h1>

        <p className="text-gray-600 mb-6">
          Bienvenido al portal público de Developers. Aquí puedes leer los tips
          y aportes de la comunidad.
        </p>

        {/* Tips/Feedbacks públicos */}
        <ul className="space-y-3 mb-8">
          {feedbacks.length > 0 ? (
            feedbacks.map((item: any) => (
              <li
                key={item.id}
                className="card p-4 border border-gray-100 text-gray-700"
              >
                💡 {item.comment || item.tip}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No hay tips aún.</p>
          )}
        </ul>

        {/* Mostrar formulario solo si está logueado */}
        {isLogged ? (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Envía tu propio feedback
            </h2>
            <FeedbackForm onFeedbackSent={fetchFeedbacks} />
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500">
            🔒 Inicia sesión para enviar tus propios comentarios.
          </p>
        )}
      </div>
    </div>
  );
}