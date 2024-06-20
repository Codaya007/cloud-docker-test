"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BOOLEAN_DICTIONARY, IP_REGEX, UUID_REGEX } from "@/constants";
import { useEffect, useState } from "react";
import { getNodeById, updateNode } from "@/services/nodes.service";
import mensajes from "@/app/components/Mensajes";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllRoles } from "@/services/roles.service";
import { getAllSensors } from "@/services/sensors.service";
import { WithAuth } from "@/app/components/WithAuth";

const validationSchema = object().shape({
  tag: string()
    .required("Campo requerido"),
  detail: string()
    .max(200, "Máximo 200 caracteres"),
  ip: string()
    .matches(IP_REGEX, "Ip no válida")
    .required("ip requerida"),
  rol: string().required("Rol requerido").matches(UUID_REGEX, "Debe ser un rol válido"),
  sensor: string().required("Sensor requerido").matches(UUID_REGEX, "Debe ser un sensor válido"),
});

function MotaForm() {
  const router = useRouter();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  };
  const { register, handleSubmit, formState, reset } = useForm(formOptions)
  const { errors } = formState;
  const { token } = useAuth();
  const [roles, setRoles] = useState([]);
  const [sensors, setSensors] = useState([]);
  const { id } = useParams();

  const handleUpdateMota = async (data) => {
    try {
      await updateNode(id, data, token);

      mensajes("Exito", "Mota actualizada exitosamente");
      router.push("/mota");
    } catch (error) {
      console.log(error?.response?.data || error);
      mensajes("Error", error.response?.data?.msg || "No se ha podido actualizar la mota", "error");
    }
  }

  const fetchRoles = async () => {
    const { results: allRoles } = await getAllRoles(token)

    setRoles(allRoles)
  }

  const fetchSensors = async () => {
    const { results: allSensors } = await getAllSensors(token)

    setSensors(allSensors)
  }

  const fetchMota = async () => {
    const { results } = await getNodeById(id, token);

    reset({
      tag: results.tag,
      detail: results.detail,
      ip: results.ip,
      sensor: results.sensor,
      rol: results.rol
    });
  }

  useEffect(() => {
    if (token) {
      fetchSensors();
      fetchRoles();
      fetchMota();
    }
  }, [token]);

  return (
    <div className="normal-form">
      <form onSubmit={handleSubmit(handleUpdateMota)}>
        <h1 className="title-form">Actualizar mota</h1>
        <div className="form-item">
          <label>Título/Tag</label>
          <input {...register("tag")} type="text" />
          {
            errors.tag &&
            <span className="validation-error">{errors.tag.message}</span>
          }
        </div>
        <div className="form-item">
          <label>Descripción</label>
          <textarea  {...register("detail")} cols="30" rows="5"></textarea>
          {
            errors.detail &&
            <span className="validation-error">{errors.detail.message}</span>
          }
        </div>
        <div className="form-item">
          <label>ip</label>
          <input  {...register("ip")} type="text" />
          {
            errors.ip &&
            <span className="validation-error">{errors.ip.message}</span>
          }
        </div>
        <div className="form-item">
          <label>Rol</label>
          <select  {...register("rol")}>
            <option value="" key=""></option>
            {roles.map(rol => {
              return <option value={rol.id} key={rol.id}>{rol.name}</option>
            })}
          </select>
          {
            errors.rol &&
            <span className="validation-error">{errors.rol.message}</span>
          }
        </div>
        <div className="form-item">
          <label>Sensor</label>
          <select  {...register("sensor")}>
            <option value="" key=""></option>
            {sensors.map(rol => {
              return <option value={rol.id} key={rol.id}>{rol.name} {rol.unitMeasurement}</option>
            })}
          </select>
          {
            errors.sensor &&
            <span className="validation-error">{errors.sensor.message}</span>
          }
        </div>
        <div className="form-item">
          <label>Estado</label>
          <select {...register("estado")} >
            <option value={""} key=""></option>
            <option value={true} key="ACTIVA">Conectada</option>
            <option value={false} key="INACTIVA">Desconectada</option>
          </select>
          {errors.estado && <span className="validation-error">{errors.estado.message}</span>}
        </div>
        <input className="button-primary" type="submit" value="Guardar" />
      </form>
    </div>
  );
}

export default WithAuth(MotaForm);