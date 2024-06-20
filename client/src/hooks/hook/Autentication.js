import { save, saveToken } from "./SesionUtil";
import { enviar } from "./conexion";

export async function inicio_sesion(data) {
  const sesion = await enviar("auth/login", data);
  const sesionUser = JSON.stringify(sesion.results);
  if (sesion.results && sesion.token) {
    saveToken(sesion.token);
    //Configurar cookes si fuera necesario
    // save("user", sesion.account);
    // save("external", sesion.data.id);
    save("userInformation", sesionUser);
  }
  return sesion;
}
