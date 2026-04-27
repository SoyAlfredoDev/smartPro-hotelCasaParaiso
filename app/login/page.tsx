"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, User, LogIn, AlertCircle, Loader2 } from "lucide-react";

interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  disabled?: boolean;
}

function InputField({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
  icon,
  disabled,
}: InputFieldProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-white/70 mb-2 font-['Inter',sans-serif] tracking-wide"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
          {icon}
        </div>
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    user: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!credentials.user || !credentials.password) {
      setError("Usuario y contraseña son obligatorios");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to admin on success
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch {
      setError("Error al comunicarse con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center px-4 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent)]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-4 shadow-lg shadow-[var(--primary)]/20">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white font-['AQ_Chillax',sans-serif] tracking-wide">
            Casa Paraiso
          </h1>
          <p className="text-white/40 text-sm mt-1 font-['Inter',sans-serif]">
            Panel de Administración
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white/[0.03] p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/[0.06]"
          onSubmit={handleLogin}
        >
          {/* Error Message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm overflow-hidden"
              >
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <InputField
            type="text"
            label="Usuario"
            name="user"
            placeholder="Ingresa tu usuario"
            value={credentials.user}
            onChange={handleInputChange}
            icon={<User size={18} />}
            disabled={isLoading}
          />

          <InputField
            type="password"
            label="Contraseña"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={credentials.password}
            onChange={handleInputChange}
            icon={<Lock size={18} />}
            disabled={isLoading}
          />

          <motion.button
            whileHover={!isLoading ? { scale: 1.01 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            className="w-full mt-6 p-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 hover:from-[var(--primary)]/90 hover:to-[var(--primary)]/70 transition-all duration-300 shadow-lg shadow-[var(--primary)]/20 font-['Inter',sans-serif] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Iniciar Sesión</span>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center text-white/20 text-xs mt-6 font-['Inter',sans-serif]"
        >
          Acceso exclusivo para administradores
        </motion.p>
      </motion.div>
    </div>
  );
}
