"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Moon, 
  Users, 
  Plus, 
  Minus, 
  Tag, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck,
  Coffee,
  Car
} from "lucide-react";
import Badge from "@/components/ui/badge";

// Variables globales para lógica de negocio
const MAX_COUPONS = 1;

// Tipos
interface RoomSelection {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  capacity: number;
}

interface AdditionalService {
  id: string;
  name: string;
  price: number;
  icon: React.ReactNode;
  selected: boolean;
}

interface AppliedCoupon {
  code: string;
  discount: number; // Porcentaje en decimal
}

// Datos Mock (idealmente vendrían de la API o Props)
const AVAILABLE_ROOMS = [
  { id: "single", name: "Habitación Single", price: 40000, image: "https://images.unsplash.com/photo-1536270578847-a7274c4a4f81?auto=format&fit=crop&w=800&q=80", capacity: 1 },
  { id: "double", name: "Habitación Doble", price: 50000, image: "https://images.unsplash.com/photo-1558976825-6b1b1ceca8ec?auto=format&fit=crop&w=800&q=80", capacity: 2 },
  { id: "family", name: "Habitación Familiar", price: 75000, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", capacity: 4 },
];

export default function DetailCheckoutView() {
  const [nights, setNights] = useState(3);
  
  // Selección inicial (simulando que el usuario viene de la página de detalle de "Habitación Doble")
  const [selectedRooms, setSelectedRooms] = useState<RoomSelection[]>([
    { ...AVAILABLE_ROOMS[1], quantity: 1 } 
  ]);

  const [services, setServices] = useState<AdditionalService[]>([
    { id: "transfer", name: "Traslado Aeropuerto VIP", price: 25000, icon: <Car className="h-4 w-4" />, selected: false },
    { id: "breakfast", name: "Desayuno Buffet Premium", price: 12000, icon: <Coffee className="h-4 w-4" />, selected: false },
    { id: "late_checkout", name: "Late Check-out", price: 15000, icon: <Moon className="h-4 w-4" />, selected: false }
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState<AppliedCoupon[]>([]);

  // Estado del Formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Lógica de Habitaciones
  const handleRoomQuantity = (roomIndex: number, delta: number) => {
    setSelectedRooms(prev => {
      const newRooms = [...prev];
      const newQuantity = newRooms[roomIndex].quantity + delta;
      
      if (newQuantity <= 0) {
        // Permitir eliminar solo si no es la habitación principal, o si hay otras seleccionadas
        if (newRooms.length > 1 || roomIndex !== 0) {
           newRooms.splice(roomIndex, 1);
        }
      } else {
        newRooms[roomIndex].quantity = newQuantity;
      }
      return newRooms;
    });
  };

  const addRoom = (room: typeof AVAILABLE_ROOMS[0]) => {
    setSelectedRooms(prev => {
      const existing = prev.findIndex(r => r.id === room.id);
      if (existing >= 0) {
        const newRooms = [...prev];
        newRooms[existing].quantity += 1;
        return newRooms;
      }
      return [...prev, { ...room, quantity: 1 }];
    });
  };

  // Lógica de Servicios
  const toggleService = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  // Lógica de Cupones (Aplicando restricción de variable global)
  const handleApplyCoupon = () => {
    if (appliedCoupons.length >= MAX_COUPONS) {
      alert(`Solo puedes aplicar un máximo de ${MAX_COUPONS} cupón(es).`);
      return;
    }

    const code = couponCode.toUpperCase();
    if (code === "RELAX20") {
      setAppliedCoupons([...appliedCoupons, { code: "RELAX20", discount: 0.2 }]); // 20% descuento
      setCouponCode("");
    } else if (code === "WELCOME10") {
      setAppliedCoupons([...appliedCoupons, { code: "WELCOME10", discount: 0.1 }]); // 10% descuento
      setCouponCode("");
    } else {
      alert("Cupón inválido o expirado");
    }
  };

  const removeCoupon = (codeToRemove: string) => {
    setAppliedCoupons(appliedCoupons.filter(c => c.code !== codeToRemove));
  };

  // Cálculos
  const roomsSubtotal = useMemo(() => {
    return selectedRooms.reduce((acc, room) => acc + (room.price * room.quantity * nights), 0);
  }, [selectedRooms, nights]);

  const servicesSubtotal = useMemo(() => {
    return services.filter(s => s.selected).reduce((acc, service) => acc + service.price, 0);
  }, [services]);

  const subtotal = roomsSubtotal + servicesSubtotal;
  
  const discountAmount = useMemo(() => {
    // Sumamos los descuentos (por si en un futuro maxCoupons > 1)
    const totalDiscountPercentage = appliedCoupons.reduce((acc, c) => acc + c.discount, 0);
    return subtotal * Math.min(totalDiscountPercentage, 1); // máximo 100% descuento
  }, [appliedCoupons, subtotal]);

  const netSubtotal = subtotal - discountAmount;
  const iva = netSubtotal * 0.19; // 19% IVA en Chile
  const total = netSubtotal + iva;

  const formatCurrency = (val: number) => {
    return Math.round(val).toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  return (
    <div className="min-h-screen bg-background py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="mb-10 text-center lg:text-left">
          <Badge text="Resumen de Compra" dark />
          <h1 className="mt-4 font-chillax text-4xl font-bold tracking-tight text-text-primary">
            Finaliza tu reserva
          </h1>
          <p className="mt-2 text-text-secondary">Asegura tu estancia premium en Casa Paraíso.</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* =======================
              COLUMNA IZQUIERDA (70%)
              ======================= */}
          <div className="w-full space-y-8 lg:w-[70%]">
            
            {/* 1. Resumen de Estancia Principal */}
            <section className="overflow-hidden rounded-2xl border border-default bg-surface shadow-soft">
              <div className="border-b border-default bg-surface-warm px-6 py-4">
                <h2 className="font-chillax text-xl font-bold text-text-primary">Tu Estancia</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl md:h-auto md:w-64">
                    <img 
                      src={selectedRooms[0]?.image} 
                      alt={selectedRooms[0]?.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-bold text-text-primary">{selectedRooms[0]?.name}</h3>
                      <div className="text-right">
                        <span className="block text-xl font-bold text-primary">{formatCurrency(selectedRooms[0]?.price)}</span>
                        <span className="text-xs uppercase tracking-wide text-text-secondary">por noche</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-2">
                      <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-sm text-text-secondary">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div className="flex flex-col leading-tight">
                          <span className="text-xs font-semibold uppercase">Fechas</span>
                          <span>15 Oct - 18 Oct</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-sm text-text-secondary">
                        <Moon className="h-4 w-4 text-primary" />
                        <div className="flex flex-col leading-tight">
                          <span className="text-xs font-semibold uppercase">Duración</span>
                          <span>{nights} Noches</span>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-sm text-text-secondary">
                        <Users className="h-4 w-4 text-primary" />
                        <div className="flex flex-col leading-tight">
                          <span className="text-xs font-semibold uppercase">Huéspedes</span>
                          <span>{selectedRooms[0]?.capacity} Personas (Adultos)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Upselling de Habitaciones */}
            <section className="rounded-2xl border border-default bg-surface p-6 shadow-soft">
              <h2 className="mb-5 font-chillax text-xl font-bold text-text-primary">¿Necesitas más espacio?</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {AVAILABLE_ROOMS.map((room) => {
                  const selectedCount = selectedRooms.find(r => r.id === room.id)?.quantity || 0;
                  return (
                    <motion.div 
                      key={room.id} 
                      whileHover={{ y: -4 }}
                      className="flex flex-col overflow-hidden rounded-xl border border-default bg-background transition-shadow hover:shadow-md"
                    >
                      <div className="h-28 w-full overflow-hidden">
                        <img src={room.image} alt={room.name} className="h-full w-full object-cover transition-transform hover:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <h4 className="font-semibold leading-tight text-text-primary">{room.name}</h4>
                          <p className="mt-1 text-sm font-bold text-primary">{formatCurrency(room.price)}</p>
                        </div>
                        <div className="mt-4">
                          {selectedCount > 0 ? (
                             <div className="flex items-center justify-between rounded-lg border border-primary bg-primary/5 px-2 py-1">
                               <button 
                                 onClick={() => handleRoomQuantity(selectedRooms.findIndex(r => r.id === room.id), -1)}
                                 className="flex h-7 w-7 items-center justify-center rounded bg-white shadow-sm text-text-secondary transition-colors hover:text-primary"
                               >
                                 <Minus className="h-3.5 w-3.5" />
                               </button>
                               <span className="font-bold text-primary">{selectedCount}</span>
                               <button 
                                 onClick={() => handleRoomQuantity(selectedRooms.findIndex(r => r.id === room.id), 1)}
                                 className="flex h-7 w-7 items-center justify-center rounded bg-white shadow-sm text-text-secondary transition-colors hover:text-primary"
                               >
                                 <Plus className="h-3.5 w-3.5" />
                               </button>
                             </div>
                          ) : (
                            <button 
                              onClick={() => addRoom(room)}
                              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-default bg-white py-2 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:border-primary hover:text-primary"
                            >
                              <Plus className="h-4 w-4" />
                              Añadir unidad
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* 3. Servicios Adicionales */}
            <section className="rounded-2xl border border-default bg-surface p-6 shadow-soft">
              <h2 className="mb-5 font-chillax text-xl font-bold text-text-primary">Personaliza tu experiencia</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <motion.div 
                    key={service.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleService(service.id)}
                    className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
                      service.selected 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-default bg-background hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        service.selected ? "bg-primary text-white" : "bg-white text-text-secondary shadow-sm"
                      }`}>
                        {service.icon}
                      </div>
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        service.selected ? "border-primary bg-primary" : "border-default"
                      }`}>
                        {service.selected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className={`text-sm font-bold ${service.selected ? "text-primary-dark" : "text-text-primary"}`}>
                        {service.name}
                      </h4>
                      <p className="mt-0.5 text-sm font-medium text-text-secondary">+{formatCurrency(service.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>

          {/* =======================
              COLUMNA DERECHA (30%) - STICKY
              ======================= */}
          <div className="w-full lg:w-[30%]">
            <div className="sticky top-24 rounded-2xl border border-default bg-surface p-6 shadow-elevated">
              <h2 className="font-chillax text-2xl font-bold text-text-primary">Resumen de Pago</h2>
              
              {/* Desglose de Gastos */}
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Alojamiento ({nights} noches)</span>
                  <span className="font-medium text-text-primary">{formatCurrency(roomsSubtotal)}</span>
                </div>
                
                {selectedRooms.length > 1 && (
                  <div className="pl-3 border-l-2 border-primary/20 space-y-2 mt-2">
                    {selectedRooms.map((room, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-text-secondary">
                        <span>{room.quantity}x {room.name}</span>
                        <span>{formatCurrency(room.price * room.quantity * nights)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {servicesSubtotal > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-text-secondary"
                    >
                      <span>Complementos</span>
                      <span className="font-medium text-text-primary">{formatCurrency(servicesSubtotal)}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="flex justify-between border-t border-default pt-4 text-text-secondary">
                  <span>Subtotal</span>
                  <span className="font-medium text-text-primary">{formatCurrency(subtotal)}</span>
                </div>

                <AnimatePresence>
                  {appliedCoupons.map((coupon) => (
                    <motion.div 
                      key={coupon.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex justify-between text-primary"
                    >
                      <div className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" />
                        <span>Cupón ({coupon.code})</span>
                      </div>
                      <span>-{formatCurrency(subtotal * coupon.discount)}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="flex justify-between text-text-secondary">
                  <span>IVA (19%)</span>
                  <span className="font-medium text-text-primary">{formatCurrency(iva)}</span>
                </div>
              </div>

              {/* Total Final Animado */}
              <div className="my-6 overflow-hidden rounded-xl bg-primary px-5 py-4 text-white shadow-glow-primary">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Final</span>
                  <motion.span 
                    key={total} // Para re-animar al cambiar
                    initial={{ opacity: 0.5, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="font-chillax text-3xl font-bold"
                  >
                    {formatCurrency(total)}
                  </motion.span>
                </div>
              </div>

              {/* Formulario de Huésped */}
              <div className="mb-6 space-y-3 border-t border-default pt-6">
                <h3 className="mb-2 font-chillax text-lg font-bold text-text-primary">Datos del Huésped</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-xl border border-default bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)]"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-xl border border-default bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)]"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="Teléfono" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full rounded-xl border border-default bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)]"
                  />
                </div>
              </div>

              {/* Cupones */}
              <div className="mb-8">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Código promocional
                </label>
                {appliedCoupons.length < MAX_COUPONS ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ej. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full rounded-xl border border-default bg-background px-4 py-2 text-sm text-text-primary outline-none transition-all focus:border-primary focus:bg-white"
                    />
                    <button 
                      onClick={handleApplyCoupon}
                      className="rounded-xl bg-text-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-black active:scale-95"
                    >
                      Aplicar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {appliedCoupons.map(coupon => (
                      <div key={coupon.code} className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="text-sm font-bold text-primary">{coupon.code} (-{coupon.discount * 100}%)</span>
                        </div>
                        <button onClick={() => removeCoupon(coupon.code)} className="text-xs font-semibold text-text-secondary underline transition-colors hover:text-red-500">
                          Quitar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón de Pago CTA */}
              <button className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-base shadow-glow-primary">
                <CreditCard className="h-5 w-5" />
                Pagar con Transbank
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-text-secondary">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Pago 100% seguro y encriptado</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
