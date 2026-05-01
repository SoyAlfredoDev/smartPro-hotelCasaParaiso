"use client";
import { useState } from "react";

export default function FormCustomer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentType: "rut",
    documentNumber: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="border-b border-default bg-surface-warm px-6 py-4">
        <h2 className="font-chillax text-xl font-bold text-text-primary">
          Datos del Huésped
        </h2>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Nombre */}
        <InputForm
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
        />

        {/* Apellido */}
        <InputForm
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
        />

        {/* Tipo documento */}
        <SelectForm
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          options={[
            { label: "RUT (Chile)", value: "rut" },
            { label: "Pasaporte", value: "passport" },
            { label: "DNI", value: "dni" },
          ]}
        />

        {/* Número documento */}
        <InputForm
          name="documentNumber"
          placeholder={
            formData.documentType === "rut"
              ? "Ej: 12.345.678-9"
              : "Número de documento"
          }
          value={formData.documentNumber}
          onChange={handleChange}
        />

        {/* Email */}
        <InputForm
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Teléfono */}
        <InputForm
          name="phone"
          type="tel"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />

        {/* Comentario (full width) */}
        <div className="md:col-span-2">
          <InputForm
            name="comment"
            placeholder="Comentario (opcional)"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

const InputForm = ({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-default bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)]"
    />
  );
};

const SelectForm = ({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-default bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)]"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
