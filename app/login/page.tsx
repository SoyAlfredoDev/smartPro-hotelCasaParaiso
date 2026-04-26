"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-bold text-dark/90 mb-1 font-['Inter',sans-serif]"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border border-white/20 bg-white/50 text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01c676] transition-all"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default function LoginPage() {
  // 1. Ya no necesitamos guardar el hashPassword en el estado
  const [credentials, setCredentials] = useState({
    user: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!credentials.user || !credentials.password) {
      alert("Usuario y contraseña son obligatorios");
      return;
    }

    try {
      // 2. Enviamos las credenciales en "texto plano" por HTTPS
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      // 3. Evaluamos 'response.ok' en lugar de 'data.status'
      if (response.ok) {
        router.push("/admin");
      } else {
        alert(data.message); // Mostrará "Usuario o contraseña incorrectos"
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al comunicarse con el servidor");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center px-4 bg-dark">
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-gray p-8 rounded-xl shadow-2xl backdrop-blur-md max-w-md w-full border border-white/10"
        onSubmit={handleLogin}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-dark font-['AQ_Chillax',sans-serif]">
          Login
        </h1>

        <InputField
          type="text"
          label="Usuario"
          name="user"
          placeholder="Ingresa tu usuario"
          value={credentials.user}
          onChange={handleInputChange}
        />

        <InputField
          type="password"
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña"
          value={credentials.password}
          onChange={handleInputChange}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 p-3 rounded-lg font-bold text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 font-['Inter',sans-serif]"
          type="submit"
        >
          Iniciar Sesión
        </motion.button>
      </motion.form>
    </div>
  );
}
