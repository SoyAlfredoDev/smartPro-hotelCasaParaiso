"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Users,
  BedDouble,
  Trash2,
  Pencil,
  Plus,
  ChevronDown,
  AlertTriangle,
  X,
  Coffee,
  Wifi,
  Car,
  Dog,
  Wine,
  Tv,
  CheckCircle2,
  Package,
} from "lucide-react";
import NewRoomButton from "./NewRoomButton";
import type { RoomType } from "@/models/RoomType";
import categories from "@/public/assets/categories";

interface RoomWithCount extends RoomType {
  _count?: {
    bookings: number;
  };
}

// Amenity icon helper
function getAmenityIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("desayuno") || n.includes("breakfast")) return Coffee;
  if (n.includes("wi-fi") || n.includes("wifi")) return Wifi;
  if (n.includes("parking") || n.includes("estacionamiento")) return Car;
  if (n.includes("mascota") || n.includes("pet")) return Dog;
  if (n.includes("minibar") || n.includes("mini bar")) return Wine;
  if (n.includes("tv") || n.includes("televisión")) return Tv;
  return CheckCircle2;
}

export default function RoomsAdmin() {
  const [rooms, setRooms] = useState<RoomWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const [editingRoom, setEditingRoom] = useState<RoomType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleDelete = async (roomId: string) => {
    setDeleteError(null);
    try {
      const res = await fetch(`/api/rooms?id=${roomId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setDeleteError(data.error || "Error al eliminar");
        return;
      }
      setDeletingRoomId(null);
      fetchRooms();
    } catch {
      setDeleteError("Error de conexión al eliminar");
    }
  };

  // Filter rooms
  const filtered = rooms.filter((room) => {
    const matchSearch =
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.id.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "todas" || room.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  // Stats
  const totalRooms = rooms.length;
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
  const avgPrice =
    rooms.length > 0
      ? Math.round(rooms.reduce((sum, r) => sum + r.price, 0) / rooms.length)
      : 0;

  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Habitaciones",
            value: totalRooms,
            icon: BedDouble,
            color: "var(--primary)",
          },
          {
            label: "Capacidad Total",
            value: `${totalCapacity} huéspedes`,
            icon: Users,
            color: "var(--accent)",
          },
          {
            label: "Precio Promedio",
            value: avgPrice.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            }),
            icon: Package,
            color: "#6366f1",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-white mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div
                className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full opacity-5"
                style={{ backgroundColor: stat.color }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              placeholder="Buscar habitación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]/50 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 cursor-pointer"
            >
              <option value="todas" className="bg-[#2b2b2b]">
                Todas las categorías
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[#2b2b2b]">
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
            />
          </div>
        </div>

        {/* Add Room Button */}
        <NewRoomButton
          roomToEdit={editingRoom}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingRoom(null);
          }}
          onRoomCreated={fetchRooms}
        />
      </div>

      {/* Rooms Table */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[80px_2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 px-5 py-3.5 bg-white/[0.03] border-b border-white/10 text-xs font-semibold text-white/90 uppercase tracking-wider">
          <span>Imagen</span>
          <span>Habitación</span>
          <span>Hotel</span>
          <span>Categoría </span>
          <span>Precio</span>
          <span>Capacidad</span>
          <span className="text-right">Acciones</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center bg-surface">
            <div className="inline-flex items-center gap-3 text-dark">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-5 w-5 border-2 border-white/20 border-t-[var(--primary)] rounded-full"
              />
              <span className="text-sm">Cargando habitaciones...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                <BedDouble size={24} className="text-white/30" />
              </div>
              <p className="text-white/50 text-sm">
                {search || categoryFilter !== "todas"
                  ? "No se encontraron habitaciones con esos filtros"
                  : "No hay habitaciones registradas"}
              </p>
            </div>
          </div>
        )}

        {/* Rows */}
        <AnimatePresence>
          {!loading &&
            filtered.map((room, idx) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                {/* Main Row */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-[80px_2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 px-5 py-4 items-center border-b border-gray-500/10 cursor-pointer hover:bg-gray-300 transition duration-300 ${
                    expandedRow === room.id ? "bg-gray-200" : "bg-surface"
                  }`}
                  onClick={() =>
                    setExpandedRow(expandedRow === room.id ? null : room.id)
                  }
                >
                  {/* Image */}
                  <div className="flex items-center gap-3 md:block">
                    {room.images?.[0] ? (
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        width={64}
                        height={48}
                        className="rounded-sm object-cover w-16 h-12"
                      />
                    ) : (
                      <div className="w-16 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                        <BedDouble size={16} className="text-white/20" />
                      </div>
                    )}
                  </div>

                  {/* Name + ID */}
                  <div className="min-w-0">
                    <p className="text-md font-semibold text-primary truncate">
                      {room.name}
                    </p>
                    <p className="text-sm text-primary/30 mt-0.5 truncate">
                      ID: {room.id}
                    </p>
                  </div>
                  {/*Hotel */}
                  <div className="min-w-0 flex gap-1">
                    <p className="inline-flex text-sm text-gray-500 mt-1 truncate">
                      {room.hotelId === "hotel-san-miguel"
                        ? "Hotel San Miguel"
                        : "Hotel República"}
                    </p>
                  </div>

                  {/* Category  */}
                  <div className="min-w-0 flex gap-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold capitalize">
                      {room.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-sm font-bold text-accent">
                      {room.price.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </p>
                    <p className="text-[10px] text-secondary">por noche</p>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-primary/40" />
                    <span className="text-sm text-primary">
                      {room.capacity}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    {room._count && room._count.bookings > 0 && (
                      <span className="text-[10px] text-primary/30 mr-1">
                        {room._count.bookings} reserva
                        {room._count.bookings > 1 ? "s" : ""}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingRoom(room as RoomType);
                        setIsEditModalOpen(true);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-yellow-500/20 text-yellow-500 hover:text-dark transition-all cursor-pointer"
                      title="Editar"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingRoomId(room.id);
                        setDeleteError(null);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20 text-red-500 hover:text-white transition-all cursor-pointer"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedRow === room.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden  border-b border-white/5 bg-white/[0.02]"
                    >
                      <div className="px-5 py-4 bg-surface">
                        <p className="text-sm text-primary/60 mb-3 leading-relaxed">
                          {room.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity) => {
                            const Icon = getAmenityIcon(amenity);
                            return (
                              <span
                                key={amenity}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm font-medium capitalize border border-white/5"
                              >
                                <Icon size={12} />
                                {amenity}
                              </span>
                            );
                          })}
                        </div>
                        {/* Image thumbnails */}
                        {room.images.length > 1 && (
                          <div className="flex gap-2 mt-3 overflow-x-auto">
                            {room.images.map((img, i) => (
                              <Image
                                key={i}
                                src={img}
                                alt={`${room.name} - ${i + 1}`}
                                width={80}
                                height={60}
                                className="rounded-lg object-cover w-20 h-14 flex-shrink-0 border border-white/10"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-xs text-white/30 mt-3 text-right">
          Mostrando {filtered.length} de {rooms.length} habitaciones
        </p>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingRoomId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeletingRoomId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#2a2a2a] rounded-2xl p-6 w-full max-w-sm border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                  <AlertTriangle size={20} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    Eliminar Habitación
                  </h3>
                  <p className="text-xs text-white/40">
                    Esta acción no se puede deshacer
                  </p>
                </div>
              </div>

              {deleteError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {deleteError}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingRoomId(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deletingRoomId)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
