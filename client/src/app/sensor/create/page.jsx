"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import { useEffect } from "react";
import mensajes from "@/app/components/Mensajes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllRoles } from "@/services/roles.service";
import { createSensor, getAllSensors } from "@/services/sensors.service";
import { WithAuth } from "@/app/components/WithAuth";

const validationSchema = object().shape({
  name: string()
    .required("Campo requerido"),
  unitMeasurement: string().max(4, "Máximo 4 caracteres").required("Campo requerido")
});

function SensorForm() {
  const router = useRouter();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  };
  const { register, handleSubmit, formState, watch } = useForm(formOptions)
  const { errors } = formState;
  const { token } = useAuth();

  const handleCreateSensor = async (data) => {
    try {
      await createSensor(data, token);

      mensajes("Exito", "Sensor registrado exitosamente");
      router.push("/sensor");
    } catch (error) {
      console.log(error?.response?.data || error);
      mensajes("Error", error.response?.data?.msg || "No se ha podido crear el sensor", "error");
    }
  }

  return (
    <div className="normal-form">
      <form onSubmit={handleSubmit(handleCreateSensor)}>
        <h1 className="title-form">Crear sensor</h1>
        <div className="form-item">
          <label>Nombre</label>
          <input {...register("name")} type="text" />
          {
            errors.name &&
            <span className="validation-error">{errors.name.message}</span>
          }
        </div>
        <div className="form-item">
          <label>Símbolo unidad de medida</label>
          <input {...register("unitMeasurement")} type="text" />
          {
            errors.unitMeasurement &&
            <span className="validation-error">{errors.unitMeasurement.message}</span>
          }
        </div>
        <input className="button-primary" type="submit" value="Crear" />
      </form>
    </div>
  );
}

export default WithAuth(SensorForm)