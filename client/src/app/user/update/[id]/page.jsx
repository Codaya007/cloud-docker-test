"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import mensajes from "../../../components/Mensajes";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { getUserById, updateUser } from "@/services/user.service";
import { WithAuth } from "@/app/components/WithAuth";

const validationSchema = object().shape({
  name: string()
    .required("Nombre requerido"),
  lastname: string().required("Apellido requerido"),
  email: string()
    .email("Ingrese un email válido")
    .required("Email requerido"),
  state: string().is(["ACTIVA", "INACTIVA", "BLOQUEADA"], "Estado no válido")
    .required("Estatus requerido")
});

function UserForm() {
  const router = useRouter();
  const { id } = useParams();
  const { token } = useAuth();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  };
  const { register, handleSubmit, formState, reset } = useForm(formOptions)
  const { errors } = formState;

  const handleUpdateUser = async (data) => {
    try {
      await updateUser(id, data, token);

      mensajes("Exito", "Usuario actualizado exitosamente");
      router.push("/user");
    } catch (error) {
      console.log(error?.response?.data || error);
      mensajes("Error", error.response?.data?.msg || "No se ha podido actualizar el usuario", "error");
    }
  }

  const fetchUser = async () => {
    const { results } = await getUserById(id, token);

    reset({
      name: results.name,
      lastname: results.lastname,
      email: results.email,
      state: results.state
    });
  }

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <div className="normal-form">
      < form onSubmit={handleSubmit(handleUpdateUser)} >
        <h1 className="title-form">Actualizar usuario</h1>
        <div className="form-item">
          <label>Nombre</label>
          <input {...register("name")} type="text" />
          {errors.name && <span className="validation-error">{errors.name.message}</span>}
        </div>
        <div className="form-item">
          <label>Apellido</label>
          <input {...register("lastname")} type="text" />
          {errors.lastname && <span className="validation-error">{errors.lastname.message}</span>}
        </div>
        <div className="form-item">
          <label>Email</label>
          <input  {...register("email")} type="email" />
          {errors.email && <span className="validation-error">{errors.email.message}</span>}
        </div>
        <div className="form-item">
          <label>Estado</label>
          <select {...register("state")} >
            <option value="ACTIVA" key="ACTIVA">Activo</option>
            <option value="INACTIVA" key="INACTIVA">Inactivo</option>
            <option value="BLOQUEADA" key="BLOQUEADA">Bloqueado</option>
          </select>
          {errors.state && <span className="validation-error">{errors.state.message}</span>}
        </div>
        <input className="button-primary" type="submit" value="Guardar" />
      </ form>
    </div >
  );
}

export default WithAuth(UserForm)