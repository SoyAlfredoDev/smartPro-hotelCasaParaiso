"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoomType } from "@/models/RoomType"; // Asegúrate de que la ruta sea correcta
import { useEffect } from "react";
import hotels from "@/public/assets/hotels";
import categories from "@/public/assets/categories";
import amenities from "@/public/assets/amenities";

// Componente Input Reutilizable
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = true,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="mb-4 flex-1">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        rows={3}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
      />
    )}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  multiple = false,
}: {
  label: string;
  name: string;
  value: any;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; name: string; icon?: React.ElementType | string }[];
}) => (
  <div className="mb-4 flex-1">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      multiple={multiple}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    >
      <option value={""} disabled>
        Seleccione una opción
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

interface RoomModalProps {
  onRoomCreated?: () => void;
  roomToEdit?: RoomType | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function NewRoomButton({
  onRoomCreated,
  roomToEdit = null,
  isOpen: externalIsOpen,
  onClose,
}: RoomModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [imagesStr, setImagesStr] = useState("");
  const [allRoomIds, setAllRoomIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Modo edición: controlado externamente via props
  const isEditMode = !!roomToEdit;
  const modalIsOpen = isEditMode ? (externalIsOpen ?? false) : internalIsOpen;

  const setModalOpen = (open: boolean) => {
    if (isEditMode) {
      if (!open) onClose?.();
    } else {
      setInternalIsOpen(open);
    }
  };

  //Validamos que id no se repita
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        if (Array.isArray(data)) {
          setAllRoomIds(data.map((room: RoomType) => room.id));
        }
      } catch (error) {
        console.error("Error al obtener habitaciones:", error);
      }
    };
    fetchRooms();
  }, []);

  const checkIdExist = (id: string) => {
    return allRoomIds.includes(id);
  };

  const emptyRoom: RoomType = {
    id: "",
    name: "",
    description: "",
    hotelId: "",
    category: "",
    capacity: 0,
    price: 0,
    images: [],
    amenities: [],
  };

  const [roomData, setRoomData] = useState<RoomType>(emptyRoom);

  // Pre-fill form cuando se recibe roomToEdit
  useEffect(() => {
    if (roomToEdit && externalIsOpen) {
      setRoomData(roomToEdit);
      setImagesStr(roomToEdit.images.join(", "));
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, [roomToEdit, externalIsOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectMultipleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (value === "") return;
    if (roomData.amenities.includes(value)) {
      setRoomData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((item) => item !== value),
      }));
    } else {
      setRoomData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, value],
      }));
    }
    console.log(roomData.amenities);
  };

  const resetForm = () => {
    setRoomData(emptyRoom);
    setImagesStr("");
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Convertir las imágenes de string a array
    const finalData: RoomType = {
      ...roomData,
      images: imagesStr
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean),
      // amenities ya se maneja correctamente via roomData.amenities
    };

    // Solo verificar ID duplicado en modo creación
    if (!isEditMode && checkIdExist(finalData.id)) {
      setSubmitError("El ID de la habitación ya existe. Usa otro ID.");
      return;
    }

    setIsSubmitting(true);

    try {
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch("/api/rooms", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomData: finalData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            (isEditMode
              ? "Error al actualizar la habitación"
              : "Error al crear la habitación"),
        );
      }

      setSubmitSuccess(true);

      // En modo creación, actualizar la lista de IDs existentes
      if (!isEditMode) {
        setAllRoomIds((prev) => [...prev, finalData.id]);
      }

      // Notificar al componente padre para refrescar la tabla
      onRoomCreated?.();

      // Cerrar modal y resetear formulario tras un breve delay
      setTimeout(() => {
        setModalOpen(false);
        resetForm();
      }, 1200);
    } catch (error) {
      console.error(
        isEditMode
          ? "Error al actualizar habitación:"
          : "Error al crear habitación:",
        error,
      );
      setSubmitError(
        error instanceof Error ? error.message : "Error inesperado al guardar",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Botón que dispara el modal — solo en modo creación */}
      {!isEditMode && (
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors cursor-pointer"
        >
          Agregar
        </button>
      )}

      {/* Modal con Framer Motion */}
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800">
                  {isEditMode ? "Editar Habitación" : "Nueva Habitación"}
                </h2>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                  type="button"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-6 overflow-y-auto max-h-[75vh]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="ID de Habitación"
                    name="id"
                    value={roomData.id}
                    onChange={handleChange}
                    placeholder="Ej: ROOM-001"
                    required={!isEditMode}
                    disabled={isEditMode}
                  />
                  {isEditMode && (
                    <p className="text-xs text-gray-400 -mt-3 mb-2 ml-1">
                      El ID no se puede modificar
                    </p>
                  )}

                  <SelectField
                    label="Hotel"
                    name="hotelId"
                    value={roomData.hotelId}
                    onChange={handleSelectChange}
                    options={hotels}
                  />

                  <InputField
                    label="Nombre"
                    name="name"
                    value={roomData.name}
                    onChange={handleChange}
                    placeholder="Ej: Suite Presidencial"
                  />
                  <SelectField
                    label="Categoría"
                    name="category"
                    value={roomData.category}
                    onChange={handleSelectChange}
                    options={categories}
                  />

                  <InputField
                    label="Capacidad"
                    name="capacity"
                    type="number"
                    value={roomData.capacity}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Precio (por noche)"
                    name="price"
                    type="number"
                    value={roomData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-2">
                  <InputField
                    label="Descripción"
                    name="description"
                    type="textarea"
                    value={roomData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Imágenes (URLs separadas por coma)"
                    name="images"
                    value={imagesStr}
                    onChange={(e) => setImagesStr(e.target.value)}
                    placeholder="url1.jpg, url2.jpg"
                  />
                  <SelectField
                    label="Comodidades (Separadas por coma)"
                    name="amenities"
                    value={roomData.amenities}
                    onChange={handleSelectMultipleChange}
                    multiple={true}
                    options={amenities}
                  />
                </div>
                {/* Mensajes de estado */}
                {submitError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    ⚠️ {submitError}
                  </div>
                )}
                {submitSuccess && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                    ✅
                    {isEditMode
                      ? " Habitación actualizada exitosamente"
                      : " Habitación creada exitosamente"}
                  </div>
                )}

                <div className="mt-6 flex justify-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      resetForm();
                    }}
                    disabled={isSubmitting}
                    className="px-5 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer w-45 disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/80 shadow-sm transition-colors cursor-pointer w-45 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Guardando..."
                      : isEditMode
                        ? "Actualizar Habitación"
                        : "Guardar Habitación"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
