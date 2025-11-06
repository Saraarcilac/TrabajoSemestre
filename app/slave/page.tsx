"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";

export default function SlavePage() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDevelopers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/slaves/developers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDevelopers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDevelopers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Panel del Slave 🧑‍💻</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev: any) => (
            <div key={dev.id} className="card p-5 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{dev.name}</h2>
              <p className="text-sm text-gray-500">
                Estado:{" "}
                <span className="font-medium text-indigo-600">
                  {dev.status || "Activo"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Última conexión:{" "}
                <span className="font-medium">{dev.lastSeen || "Desconocido"}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

