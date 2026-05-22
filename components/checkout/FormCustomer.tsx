"use client";

import type {
  GuestFormData,
  GuestFormErrors,
  GuestFormField,
} from "@/lib/validation/bookingForm";

interface FormCustomerProps {
  formData: GuestFormData;
  errors: GuestFormErrors;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  disabled?: boolean;
}

export default function FormCustomer({
  formData,
  errors,
  onChange,
  disabled = false,
}: FormCustomerProps) {
  return (
    <div className="mb-6">
      <div className="border-b border-default bg-surface-warm px-6 py-4">
        <h2 className="font-chillax text-xl font-bold text-text-primary">
          Datos del Huésped
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Completa tus datos para solicitar la reserva. Los campos marcados con
          * son obligatorios.
        </p>
      </div>

      {errors._form ? (
        <div
          className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errors._form}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <Field
          label="Nombre *"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={onChange}
          error={errors.firstName}
          disabled={disabled}
        />
        <Field
          label="Apellido *"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={onChange}
          error={errors.lastName}
          disabled={disabled}
        />
        <SelectField
          label="Tipo de documento *"
          name="documentType"
          value={formData.documentType}
          onChange={onChange}
          disabled={disabled}
          options={[
            { label: "RUT (Chile)", value: "rut" },
            { label: "Pasaporte", value: "passport" },
            { label: "DNI", value: "dni" },
          ]}
        />
        <Field
          label="Número de documento *"
          name="documentNumber"
          placeholder={
            formData.documentType === "rut"
              ? "Ej: 12.345.678-9"
              : "Número de documento"
          }
          value={formData.documentNumber}
          onChange={onChange}
          error={errors.documentNumber}
          disabled={disabled}
        />
        <Field
          label="Correo electrónico *"
          name="email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
          disabled={disabled}
        />
        <Field
          label="Teléfono *"
          name="phone"
          type="tel"
          placeholder="+56 9 1234 5678"
          value={formData.phone}
          onChange={onChange}
          error={errors.phone}
          disabled={disabled}
        />
        <div className="md:col-span-2">
          <Field
            label="Comentario (opcional)"
            name="comment"
            placeholder="Solicitudes especiales, horario de llegada, etc."
            value={formData.comment}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  disabled,
}: {
  label: string;
  name: GuestFormField;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold text-text-secondary">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)] disabled:cursor-not-allowed disabled:opacity-60 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-default focus:border-primary"
        }`}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  name: GuestFormField;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold text-text-secondary">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-xl border border-default bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
