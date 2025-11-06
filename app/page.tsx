"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      username,
      password,
    });

    const data = response.data;

    // Guardar token
    localStorage.setItem("token", data.access_token);

    // Detectar rol correctamente
    const role = data.user?.role;

    if (role === "admin") {
      router.push("/admin");
    } else if (role === "slave") {
      router.push("/slave");
    } else if (role === "developer") {
      router.push("/developer");
    } else {
      alert(`Rol no reconocido: ${role ?? "desconocido"} ❌`);
    }
  } catch (err: any) {
    console.error("❌ Error en login:", err);
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      alert("Credenciales inválidas ❌");
    } else {
      alert("Error al conectar con el servidor ⚠️");
    }
  }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-80 md:w-96 card">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Portal Juan Sao Ville
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              className="mt-1 border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="mt-1 border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-transform hover:scale-[1.02]"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Accede con tus credenciales asignadas por el administrador
        </p>
      </div>
    </div>
  );
}

