"use client";
import Image from "next/image";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import mensajes from "../components/Mensajes";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/services/auth.service";
// import { WithAuth } from "../components/WithAuth";

function ForgotPasswordView() {
  const router = useRouter();
  const validationScheme = Yup.object().shape({
    email: Yup.string().required("Ingrese su email"),
  });

  const formOptions = {
    resolver: yupResolver(validationScheme),
  };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const sendData = async (data) => {
    try {
      await forgotPassword(data);

      mensajes("Exito", "Si ha ingresado sus datos correctamente, se enviará un email para recuperación de contraseña");

      router.push("/login");
    } catch (error) {
      console.log(error?.response?.data);

      mensajes("Error", error.response?.data?.msg || "No se ha podido enviar el email de recuperación", "error");
    }
  };

  return (
    <div className="normal-form">
      <section>
        <Image src={"/TempLogo.png"} width={120} height={70} />
      </section>
      <form onSubmit={handleSubmit(sendData)}>
        <h1 className="title-form">Recuperar Contraseña</h1>
        <div className="form-item">
          <label className="form-label">Email</label>
          <input
            {...register("email")}
            name="email"
            id="email"
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="alert alert-danger invalid-feedback">
            {errors.email?.message}
          </div>
        </div>
        <input
          className="button-primary"
          type="submit"
          value="Recuperar contraseña"
        />
      </form>
    </div>
  );
}


export default ForgotPasswordView