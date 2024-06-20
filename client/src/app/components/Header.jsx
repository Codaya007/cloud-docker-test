"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="app-header">
      {/* <Link href={"/"} className="logo">
        <Image
          src="/TempLogo.png"
          width={160}
          height={75}
          alt="Logo"
        />
      </Link> */}
      {user && <Link
        href={"/user/me"} className="user-header">
        <div>
          <h2>{user.name} {user.lastname}</h2>
          <h3>Administrador</h3>
        </div>
        <img src={user.avatar || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"} alt="User photo" />
      </Link>}
    </header>
  );
}