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
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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

export default function NewRoomButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [idExist, setIdExist] = useState(false);
  const [imagesStr, setImagesStr] = useState("");
  const [amenitiesStr, setAmenitiesStr] = useState("");
  const [allRooms, setAllRooms] = useState<RoomType[]>([]);

  //Validamos que id no se repita
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setAllRooms(data.map((room: RoomType) => room.id));
    };
    fetchRooms();
  }, []);

  const checkIdExist = (id: any) => {
    try {
      return allRooms.includes(id);
    } catch (error) {
      console.error("Error al verificar el ID:", error);
      return false;
    }
  };

  const [roomData, setRoomData] = useState<RoomType>({
    id: "",
    name: "",
    description: "",
    hotelId: "",
    category: "",
    capacity: 0,
    price: 0,
    images: [],
    amenities: [],
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir los strings separados por comas a arrays limpios
    const finalData: RoomType = {
      ...roomData,
      images: imagesStr
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean),
      amenities: amenitiesStr
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (checkIdExist(finalData.id)) {
      setIdExist(true);
      alert("El ID de la habitación ya existe");
      return;
    }

    console.log("Datos enviados:", finalData);
    // Aquí iría tu lógica para enviar a la API

    setIsOpen(false); // Cerrar modal al guardar exitosamente
  };

  return (
    <>
      {/* Botón que dispara el modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors cursor-pointer"
      >
        Agregar
      </button>

      {/* Modal con Framer Motion */}
      <AnimatePresence>
        {isOpen && (
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
                  Nueva Habitación
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
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
                  />

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
                <div className="mt-6 flex justify-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer w-45"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/80 shadow-sm transition-colors cursor-pointer w-45  "
                  >
                    Guardar Habitación
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
