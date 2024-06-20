import Swal from "sweetalert2";
import { SUCCESS, TIME_OUT } from "../../hooks/Constants";

export function alertMessage(title, text, icon = SUCCESS) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton: false,
    timer: TIME_OUT,
  });
}
