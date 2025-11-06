"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [topSlaves, setTopSlaves] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const statsRes = await axios.get("http://localhost:3000/slaves/statistics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);

        const topRes = await axios.get("http://localhost:3000/slaves/top/reward", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTopSlaves(topRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          Panel del Administrador 👑
        </h1>

        {/* Estadísticas */}
        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="card p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-600">Total Slaves</h2>
              <p className="text-4xl font-bold text-indigo-600">{stats.totalSlaves}</p>
            </div>
            <div className="card p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-600">Total Developers</h2>
              <p className="text-4xl font-bold text-indigo-600">{stats.totalDevelopers}</p>
            </div>
            <div className="card p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-600">Promedio Recompensa</h2>
              <p className="text-4xl font-bold text-indigo-600">
                {stats.avgReward?.toFixed(2) ?? "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Cargando estadísticas...</p>
        )}

        {/* Top Slaves */}
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          🏆 Top Slaves por Recompensa
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topSlaves.map((slave, i) => (
            <li
              key={slave.id || i}
              className="card p-4 flex justify-between items-center border border-gray-100"
            >
              <span className="font-medium text-gray-800">{slave.name}</span>
              <span className="text-indigo-600 font-semibold">{slave.reward}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
