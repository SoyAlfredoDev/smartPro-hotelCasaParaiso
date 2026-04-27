"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, CalendarCheck, Clock, CheckCircle2, XCircle, AlertTriangle,
  ChevronDown, Users, BedDouble, Mail, Phone, StickyNote, X, Plus,
} from "lucide-react";
import type { BookingType, BookingStatus } from "@/models/BookingType";
import type { RoomType } from "@/models/RoomType";

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string; icon: typeof Clock }> = {
  pendiente: { label: "Pendiente", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", icon: Clock },
  confirmada: { label: "Confirmada", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle2 },
  finalizada: { label: "Finalizada", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", icon: CalendarCheck },
  cancelada: { label: "Cancelada", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20", icon: XCircle },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" });
}

function getNights(checkIn: string, checkOut: string) {
  return Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));
}

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todas");
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({ guestName: "", guestEmail: "", guestPhone: "", checkIn: "", checkOut: "", guests: 1, totalPrice: 0, roomId: "", notes: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  const fetchRooms = useCallback(async () => {
    try { const res = await fetch("/api/rooms"); const data = await res.json(); setRooms(Array.isArray(data) ? data : []); } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchBookings(); fetchRooms(); }, [fetchBookings, fetchRooms]);

  const updateStatus = async (id: string, status: BookingStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/bookings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
      if (res.ok) { fetchBookings(); setSelectedBooking(null); }
    } catch (e) { console.error(e); } finally { setUpdatingId(null); }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.guestName || !formData.guestEmail || !formData.checkIn || !formData.checkOut || !formData.roomId) {
      setFormError("Completa todos los campos obligatorios"); return;
    }
    setFormSubmitting(true);
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setShowNewForm(false);
      setFormData({ guestName: "", guestEmail: "", guestPhone: "", checkIn: "", checkOut: "", guests: 1, totalPrice: 0, roomId: "", notes: "" });
      fetchBookings();
    } catch (err) { setFormError(err instanceof Error ? err.message : "Error al crear"); } finally { setFormSubmitting(false); }
  };

  const filtered = bookings.filter((b) => {
    const matchSearch = b.guestName.toLowerCase().includes(search.toLowerCase()) || b.guestEmail.toLowerCase().includes(search.toLowerCase()) || b.room?.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "todas" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: bookings.length,
    pendientes: bookings.filter((b) => b.status === "pendiente").length,
    confirmadas: bookings.filter((b) => b.status === "confirmada").length,
    revenue: bookings.filter((b) => b.status !== "cancelada").reduce((s, b) => s + b.totalPrice, 0),
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Reservas", value: stats.total, icon: CalendarCheck, color: "var(--primary)" },
          { label: "Pendientes", value: stats.pendientes, icon: Clock, color: "#f59e0b" },
          { label: "Confirmadas", value: stats.confirmadas, icon: CheckCircle2, color: "#10b981" },
          { label: "Ingresos Est.", value: stats.revenue.toLocaleString("es-CL", { style: "currency", currency: "CLP" }), icon: BedDouble, color: "#6366f1" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}20` }}>
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
                  <p className="text-lg font-bold text-white">{s.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" placeholder="Buscar por huésped o habitación..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all" />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none cursor-pointer">
              <option value="todas" className="bg-[#2b2b2b]">Todos los estados</option>
              {(Object.keys(STATUS_CONFIG) as BookingStatus[]).map((s) => (
                <option key={s} value={s} className="bg-[#2b2b2b]">{STATUS_CONFIG[s].label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          </div>
        </div>
        <button onClick={() => setShowNewForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--primary)]/80 transition-colors cursor-pointer shadow-lg shadow-[var(--primary)]/20">
          <Plus size={16} /> Nueva Reserva
        </button>
      </div>

      {/* Bookings List */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        {loading && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center gap-3 text-white/50">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-5 w-5 border-2 border-white/20 border-t-[var(--primary)] rounded-full" />
              <span className="text-sm">Cargando reservas...</span>
            </div>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                <CalendarCheck size={24} className="text-white/30" />
              </div>
              <p className="text-white/50 text-sm">{search || statusFilter !== "todas" ? "No se encontraron reservas con esos filtros" : "No hay reservas registradas"}</p>
            </div>
          </div>
        )}

        <AnimatePresence>
          {!loading && filtered.map((booking, idx) => {
            const sc = STATUS_CONFIG[booking.status as BookingStatus] || STATUS_CONFIG.pendiente;
            const StatusIcon = sc.icon;
            return (
              <motion.div key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer"
                onClick={() => setSelectedBooking(booking)}>
                {/* Status Badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${sc.bg} ${sc.color}`}>
                  <StatusIcon size={12} /> {sc.label}
                </div>
                {/* Guest */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{booking.guestName}</p>
                  <p className="text-xs text-white/30 truncate">{booking.guestEmail}</p>
                </div>
                {/* Room */}
                <div className="min-w-0 w-40">
                  <p className="text-xs text-white/50 truncate">{booking.room?.name || "—"}</p>
                  <p className="text-[10px] text-white/30 capitalize">{booking.room?.category}</p>
                </div>
                {/* Dates */}
                <div className="text-xs text-white/50 whitespace-nowrap">
                  <p>{formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}</p>
                  <p className="text-white/30">{getNights(booking.checkIn, booking.checkOut)} noche(s)</p>
                </div>
                {/* Price */}
                <p className="text-sm font-bold text-[var(--accent)] whitespace-nowrap">
                  {booking.totalPrice.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!loading && <p className="text-xs text-white/30 mt-3 text-right">Mostrando {filtered.length} de {bookings.length} reservas</p>}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#2a2a2a] rounded-2xl w-full max-w-lg border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
                <h3 className="text-lg font-bold text-white">Detalle de Reserva</h3>
                <button onClick={() => setSelectedBooking(null)} className="text-white/40 hover:text-white cursor-pointer"><X size={18} /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Status */}
                {(() => { const sc = STATUS_CONFIG[selectedBooking.status as BookingStatus] || STATUS_CONFIG.pendiente; const SI = sc.icon; return (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${sc.bg} ${sc.color}`}><SI size={16} />{sc.label}</div>
                ); })()}
                {/* Guest Info */}
                <div className="space-y-2">
                  <h4 className="text-xs text-white/40 uppercase tracking-wider">Huésped</h4>
                  <p className="text-white font-semibold">{selectedBooking.guestName}</p>
                  <div className="flex items-center gap-2 text-sm text-white/50"><Mail size={14} />{selectedBooking.guestEmail}</div>
                  {selectedBooking.guestPhone && <div className="flex items-center gap-2 text-sm text-white/50"><Phone size={14} />{selectedBooking.guestPhone}</div>}
                </div>
                {/* Stay Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase">Check-in</p>
                    <p className="text-sm text-white font-medium mt-1">{formatDate(selectedBooking.checkIn)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase">Check-out</p>
                    <p className="text-sm text-white font-medium mt-1">{formatDate(selectedBooking.checkOut)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase">Huéspedes</p>
                    <p className="text-sm text-white font-medium mt-1 flex items-center gap-1"><Users size={14} />{selectedBooking.guests}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase">Noches</p>
                    <p className="text-sm text-white font-medium mt-1">{getNights(selectedBooking.checkIn, selectedBooking.checkOut)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase">Total</p>
                    <p className="text-sm text-[var(--accent)] font-bold mt-1">{selectedBooking.totalPrice.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</p>
                  </div>
                </div>
                {/* Room */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase">Habitación</p>
                  <p className="text-sm text-white font-medium mt-1">{selectedBooking.room?.name}</p>
                  <p className="text-xs text-white/30 capitalize">{selectedBooking.room?.category}</p>
                </div>
                {selectedBooking.notes && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase flex items-center gap-1"><StickyNote size={12} />Notas</p>
                    <p className="text-sm text-white/60 mt-1">{selectedBooking.notes}</p>
                  </div>
                )}
                {/* Status Actions */}
                <div>
                  <h4 className="text-xs text-white/40 uppercase tracking-wider mb-2">Cambiar Estado</h4>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(STATUS_CONFIG) as BookingStatus[]).filter((s) => s !== selectedBooking.status).map((s) => {
                      const c = STATUS_CONFIG[s];
                      return (
                        <button key={s} onClick={() => updateStatus(selectedBooking.id, s)} disabled={updatingId === selectedBooking.id}
                          className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 ${c.bg} ${c.color} hover:opacity-80`}>
                          {updatingId === selectedBooking.id ? "..." : c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Booking Modal */}
      <AnimatePresence>
        {showNewForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowNewForm(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#2a2a2a] rounded-2xl w-full max-w-lg border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
                <h3 className="text-lg font-bold text-white">Nueva Reserva</h3>
                <button onClick={() => setShowNewForm(false)} className="text-white/40 hover:text-white cursor-pointer"><X size={18} /></button>
              </div>
              <form onSubmit={handleCreateBooking} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs text-white/40 mb-1">Nombre *</label><input type="text" value={formData.guestName} onChange={(e) => setFormData({ ...formData, guestName: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50" /></div>
                  <div><label className="block text-xs text-white/40 mb-1">Email *</label><input type="email" value={formData.guestEmail} onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs text-white/40 mb-1">Teléfono</label><input type="tel" value={formData.guestPhone} onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50" /></div>
                  <div><label className="block text-xs text-white/40 mb-1">Huéspedes</label><input type="number" min={1} value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs text-white/40 mb-1">Check-in *</label><input type="date" value={formData.checkIn} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50" /></div>
                  <div><label className="block text-xs text-white/40 mb-1">Check-out *</label><input type="date" value={formData.checkOut} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs text-white/40 mb-1">Habitación *</label>
                    <select value={formData.roomId} onChange={(e) => setFormData({ ...formData, roomId: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none cursor-pointer">
                      <option value="" className="bg-[#2b2b2b]">Seleccionar...</option>
                      {rooms.map((r) => <option key={r.id} value={r.id} className="bg-[#2b2b2b]">{r.name} ({r.category})</option>)}
                    </select>
                  </div>
                  <div><label className="block text-xs text-white/40 mb-1">Precio Total</label><input type="number" min={0} value={formData.totalPrice} onChange={(e) => setFormData({ ...formData, totalPrice: Number(e.target.value) })} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50" /></div>
                </div>
                <div><label className="block text-xs text-white/40 mb-1">Notas</label><textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={2} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none" /></div>
                {formError && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{formError}</div>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowNewForm(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer">Cancelar</button>
                  <button type="submit" disabled={formSubmitting} className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary)]/80 transition-colors cursor-pointer disabled:opacity-50">{formSubmitting ? "Guardando..." : "Crear Reserva"}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
