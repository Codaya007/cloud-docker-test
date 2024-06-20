"use client";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import mensajes from "../components/Mensajes";
import { useRouter } from "next/navigation";
import { login } from "../../services/auth.service"
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { loginUser, user } = useAuth()

  const validationScheme = Yup.object().shape({
    email: Yup.string().required("Ingrese su email").email("Debe ser un email válido"),
    password: Yup.string().required("Ingrese su contraseña")
    // .min(10, "Debe tener al menos 10 caracteres"),
  });

  const formOptions = {
    resolver: yupResolver(validationScheme),
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const sendData = async (data) => {
    try {
      const { results, token } = await login(data)

      // Lo guardo en el contexto global
      loginUser(results, token);

      mensajes("Has ingresado al sistema", "Bienvenido usuario");
      router.push("/");
    } catch (error) {
      console.log(error?.response?.data);
      mensajes("Error en inicio de sesion", error.response?.data?.msg || "No se ha podido iniciar sesión", "error");
    }
  };

  useEffect(() => {
    if (!user) {
      const userData = window.localStorage.getItem("user")
      const token = window.localStorage.getItem("token")

      // Si ya hay sesión, logueo al usuario, sino, lo mando al login
      if (userData && token) {
        loginUser(JSON.parse(userData), token)

        router.push("/")
      } else {
        // router.push("/login")
      }
    }
  }, []);

  return (
    <div className="normal-form">
      <section>
        <Image src={"/TempLogo.png"} width={120} height={70} />
      </section>
      <form onSubmit={handleSubmit(sendData)}>
        <h1 className="title-form">Iniciar sesión</h1>
        <div className="form-item">
          <label className="form-label">Email</label>
          <input
            {...register("email")}
            name="email"
            id="email"
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="validation-error">
            {errors.email?.message}
          </div>
        </div>
        <div className="form-item">
          <label className="form-label">Contraseña</label>
          <input
            {...register("password")}
            name="password"
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="validation-error">
            {errors.password?.message}
          </div>
        </div>
        <input
          className="button-primary"
          type="submit"
          value="Iniciar sesión"
        />
        <div>
          <Link className="link-primary" href={"forgotPassword"}>
            ¿Has olvidado tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
}
