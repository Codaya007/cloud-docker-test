"use client";
import Link from "next/link";
import { FORMAT_STATUS_DICTIONARY, STATUS_COLOR_DICTIONARY } from "./me/page";
import { useAuth } from "@/context/AuthContext";
import { deleteUser, getAllUsers } from "@/services/user.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import mensajes from "../components/Mensajes";
import mensajeConfirmacion from "../components/MensajeConfirmacion";
import { WithAuth } from "../components/WithAuth";

export const UserCard = ({ user, token, refreshUsers }) => {
  const router = useRouter();

  const handleUpdateUser = () => {
    router.push(`/user/update/${user.id}`);
  }

  const handleDeleteUser = async () => {
    try {
      const confirmation = await mensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warn");

      if (confirmation) {
        await deleteUser(user.id, token);

        refreshUsers();
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return <article className="user-card">
    <div className="buttons">
      <button onClick={handleUpdateUser}>Editar</button>
      <button style={{ color: "#a31818" }} onClick={handleDeleteUser}>Dar de baja</button>
    </div>
    <h2 className="title">{user.name} {user.lastname}</h2>
    <p>Email: {user.email}</p>
    <div className="container-dot">
      <span className="dot" style={{ backgroundColor: STATUS_COLOR_DICTIONARY[user.state] || "white" }}></span>
      <p>{FORMAT_STATUS_DICTIONARY[user.state]}</p>
    </div>
  </article>
}

function UserDashboard() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { results: allUsers } = await getAllUsers(token);

    setUsers(allUsers)
  }

  useEffect(() => {
    if (token) {

      fetchUsers()
    } else {
      // TODO: Añadir redirección a login
      console.log("Inicie sesión para continuar");
    }
  }, [token]);

  return (
    <div className="main-container vertical-top">
      <section className="buttons">
        <button className="button-primary">
          <Link href={"/user/create"}>+ Añadir admin</Link>
        </button>
      </section>
      <section className="items-container">
        {
          users.map(user => <UserCard user={user} refreshUsers={fetchUsers} token={token} key={user.id} />)
        }
      </section>
    </div>
  );
}

export default WithAuth(UserDashboard)