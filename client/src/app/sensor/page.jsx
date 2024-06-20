"use client";
import { useAuth } from "@/context/AuthContext";
import { deleteSensor, getAllSensors } from "@/services/sensors.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import mensajeConfirmacion from "../components/MensajeConfirmacion";
import { WithAuth } from "../components/WithAuth";

const SensorCard = ({ name, unitMeasurement, id, refreshSensors, token }) => {
  const router = useRouter();

  const handleUpdateSensor = () => {
    router.push(`/sensor/update/${id}`);
  }

  const handleDeleteSensor = async () => {
    try {
      const confirmation = await mensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning");

      if (confirmation) {
        await deleteSensor(id, token);

        await refreshSensors();
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return <article className="user-card">
    <div className="buttons">
      <button onClick={handleUpdateSensor}>Editar</button>
      <button style={{ color: "#a31818" }} onClick={handleDeleteSensor}>Eliminar</button>
    </div>
    <h2>{name}</h2>
    <p className="text-primary">Unidad de medida: {unitMeasurement}</p>
  </article>
}

function SensorDashboard() {
  const { token } = useAuth();
  const [sensors, setSensors] = useState([]);

  const fetchSensors = async () => {
    const { results: allSensors } = await getAllSensors(token)

    setSensors(allSensors);
  }

  useEffect(() => {
    if (token) {

      fetchSensors()
    } else {
      setSensors([])
    }
  }, [token]);

  return (
    <div className="main-container vertical-top">
      <section className="buttons">
        <button className="button-primary">
          <Link href={"sensor/create"}>+ Registrar nuevo sensor</Link>
        </button>
      </section>
      <section className="items-container">
        {
          sensors.map(sensor => <SensorCard {...sensor} key={sensor.id} token={token} refreshSensors={fetchSensors} />)
        }
      </section>
    </div>
  );
}

export default WithAuth(SensorDashboard)