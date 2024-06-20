"use client"
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import mensajes from "../../components/Mensajes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/services/user.service";
import { WithAuth } from "@/app/components/WithAuth";

const validationSchema = object().shape({
  password: string()
    .required("Contraseña requerida")
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[0-9]/, 'Debe contener al un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Debe contener al menos un caracter especial')
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

function UserForm() {
  const router = useRouter();
  const { token, user, logoutUser } = useAuth();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  };
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState;

  const handleChangePassword = async (data) => {
    try {
      await updateUser(user.external_id, data, token);
      logoutUser();

      mensajes("Exito", "Contraseña actualizada exitosamente");
      router.push("/user");
    } catch (error) {
      console.log(error?.response?.data || error);
      mensajes("Error", error.response?.data?.msg || "No se ha podido actualizar el usuario", "error");
    }
  }

  return (
    <div className="normal-form">
      < form onSubmit={handleSubmit(handleChangePassword)} >
        <h1 className="title-form">Actualizar contraseña</h1>
        <div className="form-item">
          <label>Contraseña</label>
          <input  {...register("password")} type="password" />
          {errors.password && <span className="validation-error">{errors.password.message}</span>}
        </div>
        <input className="button-primary" type="submit" value="Actualizar información" />
      </ form>
    </div >
  );
}

export default WithAuth(UserForm)