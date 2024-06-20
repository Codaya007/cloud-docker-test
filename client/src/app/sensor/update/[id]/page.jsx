"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import mensajes from "@/app/components/Mensajes";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getSensorById, updateSensor } from "@/services/sensors.service";
import { useEffect } from "react";
import { WithAuth } from "@/app/components/WithAuth";

const validationSchema = object().shape({
  name: string()
    .required("Campo requerido"),
  unitMeasurement: string().max(4, "Máximo 4 caracteres").required("Campo requerido")
});

function SensorForm() {
  const { id } = useParams();
  const router = useRouter();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  };
  const { register, handleSubmit, formState, reset } = useForm(formOptions)
  const { errors } = formState;
  const { token } = useAuth();

  const handleUpdateSensor = async (data) => {
    try {
      await updateSensor(id, data, token);

      mensajes("Exito", "Sensor actualizado exitosamente");
      router.push("/sensor");
    } catch (error) {
      console.log(error?.response?.data || error);
      mensajes("Error", error.response?.data?.msg || "No se ha podido actualizar el sensor", "error");
    }
  }

  const fetchSensor = async () => {
    const { results } = await getSensorById(id, token);

    reset({
      name: results.name,
      unitMeasurement: results.unitMeasurement,
    });
  }

  useEffect(() => {
    if (token) {
      fetchSensor()
    }
  }, [token]);

  return (
    <div className="normal-form">
      <form onSubmit={handleSubmit(handleUpdateSensor)}>
        <h1 className="title-form">Actualizar sensor</h1>
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
        <input className="button-primary" type="submit" value="Guardar" />
      </form>
    </div>
  );
}

export default WithAuth(SensorForm)