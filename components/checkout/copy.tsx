"use client";

import { useState, useMemo, useEffect } from "react";
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
  Car,
} from "lucide-react";
import Badge from "@/components/ui/badge";
import { useBookingStore } from "@/store/useBookingStore";

// Componentes
import RoomsSelected from "./RoomsSelected";

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
  {
    id: "single",
    name: "Habitación Single",
    price: 40000,
    image:
      "https://images.unsplash.com/photo-1536270578847-a7274c4a4f81?auto=format&fit=crop&w=800&q=80",
    capacity: 1,
  },
  {
    id: "double",
    name: "Habitación Doble",
    price: 50000,
    image:
      "https://images.unsplash.com/photo-1558976825-6b1b1ceca8ec?auto=format&fit=crop&w=800&q=80",
    capacity: 2,
  },
  {
    id: "family",
    name: "Habitación Familiar",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    capacity: 4,
  },
];

export default function DetailCheckoutView() {
  const nights = useBookingStore((state) => state.nights);
  const checkIn = useBookingStore((state) => state.checkIn);
  const checkOut = useBookingStore((state) => state.checkOut);
  const roomSelected = useBookingStore((state) => state.roomSelected);
  const adultsQuantity = useBookingStore((state) => state.adultsQuantity);
  const childrenQuantity = useBookingStore((state) => state.childrenQuantity);
  const petsQuantity = useBookingStore((state) => state.petsQuantity);
  const roomsQuantity = useBookingStore((state) => state.roomsQuantity);
  const selectedRooms = [1];

  useEffect(() => {
    console.log("checkIn", checkIn);
    console.log("checkOut", checkOut);
    console.log("nights", nights);
    console.log("roomSelected", roomSelected);
    console.log("adultsQuantity", adultsQuantity);
    console.log("childrenQuantity", childrenQuantity);
    console.log("petsQuantity", petsQuantity);
    console.log("roomsQuantity", roomsQuantity);
  }, []);

  const [services, setServices] = useState<AdditionalService[]>([
    {
      id: "transfer",
      name: "Traslado Aeropuerto VIP",
      price: 25000,
      icon: <Car className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "breakfast",
      name: "Desayuno Buffet Premium",
      price: 12000,
      icon: <Coffee className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "late_checkout",
      name: "Late Check-out",
      price: 15000,
      icon: <Moon className="h-4 w-4" />,
      selected: false,
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState<AppliedCoupon[]>([]);

  // Estado del Formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Lógica de Habitaciones
  const handleRoomQuantity = (roomIndex: number, delta: number) => {
    setSelectedRooms((prev) => {
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

  const addRoom = (room: (typeof AVAILABLE_ROOMS)[0]) => {
    setSelectedRooms((prev) => {
      const existing = prev.findIndex((r) => r.id === room.id);
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
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s)),
    );
  };

  // Lógica de Cupones (Aplicando restricción de variable global)
  const handleApplyCoupon = () => {
    if (appliedCoupons.length >= MAX_COUPONS) {
      alert(`Solo puedes aplicar un máximo de ${MAX_COUPONS} cupón(es).`);
      return;
    }

    const code = couponCode.toUpperCase();
    if (code === "RELAX20") {
      setAppliedCoupons([
        ...appliedCoupons,
        { code: "RELAX20", discount: 0.2 },
      ]); // 20% descuento
      setCouponCode("");
    } else if (code === "WELCOME10") {
      setAppliedCoupons([
        ...appliedCoupons,
        { code: "WELCOME10", discount: 0.1 },
      ]); // 10% descuento
      setCouponCode("");
    } else {
      alert("Cupón inválido o expirado");
    }
  };

  const removeCoupon = (codeToRemove: string) => {
    setAppliedCoupons(appliedCoupons.filter((c) => c.code !== codeToRemove));
  };

  // Cálculos
  const roomsSubtotal = useMemo(() => {
    return selectedRooms.reduce(
      (acc, room) => acc + room.price * room.quantity * nights,
      0,
    );
  }, [selectedRooms, nights]);

  const servicesSubtotal = useMemo(() => {
    return services
      .filter((s) => s.selected)
      .reduce((acc, service) => acc + service.price, 0);
  }, [services]);

  const subtotal = roomsSubtotal + servicesSubtotal;

  const discountAmount = useMemo(() => {
    // Sumamos los descuentos (por si en un futuro maxCoupons > 1)
    const totalDiscountPercentage = appliedCoupons.reduce(
      (acc, c) => acc + c.discount,
      0,
    );
    return subtotal * Math.min(totalDiscountPercentage, 1); // máximo 100% descuento
  }, [appliedCoupons, subtotal]);

  const netSubtotal = subtotal - discountAmount;
  const iva = netSubtotal * 0.19; // 19% IVA en Chile
  const total = netSubtotal + iva;

  const formatCurrency = (val: number) => {
    return Math.round(val).toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
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
          <p className="mt-2 text-text-secondary">
            Asegura tu estancia premium en Casa Paraíso.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* =======================
              COLUMNA IZQUIERDA (70%)
              ======================= */}
          <div className="w-full space-y-8 lg:w-[70%]">
            {/* 1. Resumen de Estancia Principal */}
            <RoomsSelected />

            {/* 2. Upselling de Habitaciones */}

            {/* 3. Servicios Adicionales */}
          </div>
        </div>
      </div>
    </div>
  );
}
