"use client";
import Link from "next/link";
import mensajes from "./Mensajes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser()
    mensajes("Gracias", "Hasta la proxima");
    router.push('/login');
    router.refresh();
  }

  return (user ?
    <nav className="navbar">
      <div>
        <h3>Panel de control</h3>
        <ul>
          <li>
            {/* ícono */}
            <Link href={"/"}>
              Dashboard
            </Link>
          </li>
          <li>
            {/* ícono */}
            <Link href={"/user"}>
              Usuarios
            </Link>
          </li>
          <li>
            <Link href={"/mota"}>
              Motas
            </Link>
          </li>
          <li>
            <Link href={"/sensor"}>
              Sensores
            </Link>
          </li>
          <li>
            <Link href={"/history"}>
              Historial
            </Link>
          </li>
          <li>
            <Link href={"/pronosticos"}>
              Pronóstico
            </Link>
          </li>
        </ul>
      </div>
      <button type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav> :
    <></>
  );
}