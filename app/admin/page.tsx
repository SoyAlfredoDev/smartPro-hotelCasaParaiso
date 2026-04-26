import RoomsComponent from "@/components/admin/RoomsAdmin";
import NavBarAdmin from "@/components/admin/NavBarAdmin";

export default function AdminPage() {
  return (
    <div className="bg-dark">
      <NavBarAdmin />
      <div className="p-4">
        <RoomsComponent />
      </div>
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-white font-['AQ_Chillax',sans-serif]">
          Reservaciones
        </h2>
      </div>
    </div>
  );
}
