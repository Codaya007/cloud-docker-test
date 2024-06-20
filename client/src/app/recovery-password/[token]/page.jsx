"use client";
import Image from "next/image";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import mensajes from "../../components/Mensajes";
import { useRouter } from "next/navigation";
import { recoveryPassword } from "@/services/auth.service";

export default function Login({ params }) {
  const { token } = params;
  const router = useRouter();
  const validationScheme = Yup.object().shape({
    password: Yup.string().required("Ingrese su contraseña"),
  });
  const formOptions = {
    resolver: yupResolver(validationScheme),
  };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const sendData = async (data) => {
    try {
      await recoveryPassword(token, { password: data.password },)

      mensajes("Exito", "Usuario actualizado exitosamente");
      router.push("/login");
    } catch (error) {
      console.log(error?.response?.data);

      mensajes("Error", error.response?.data?.msg || "No se ha podido actualizar el usuario", "error");
    }
  };

  return (
    <div className="normal-form">
      <section>
        <Image src={"/TempLogo.png"} width={120} height={70} />
      </section>
      <form onSubmit={handleSubmit(sendData)}>
        <h1 className="title-form">Cambiar Contraseña</h1>
        <div className="form-item">
          <label className="form-label">Contraseña</label>
          <input
            {...register("password")}
            name="password"
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="alert alert-danger invalid-feedback">
            {errors.password?.message}
          </div>
        </div>
        <input
          className="button-primary"
          type="submit"
          value="Cambiar contraseña"
        />
      </form>
    </div>
  );
}
