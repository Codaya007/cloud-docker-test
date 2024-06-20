"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PaginationControls from "../components/PaginationControls";
import {
  LIMIT_PAGINATOR,
  BTN_FILTER,
  BTN_LAST_3_DAYS,
  FIRST_PAG,
  BTN_ALL,
} from "../../hooks/Constants";
import Loader from "../components/Loader";
import { useAuth } from "@/context/AuthContext";
import mensajes from "../components/Mensajes";
import { roundNumber } from "@/utils";
import { APP_INITIAL_DATE } from "@/constants";
import { getWeatherData } from "@/services/weatherData.service";
import { WithAuth } from "../components/WithAuth";

const moment = require("moment-timezone");
moment.tz.setDefault("America/Bogota");

function Pronosticos({ searchParams }) {
  const router = useRouter();
  const { token } = useAuth();
  const [history, setPronosticos] = useState({});
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [current_active_button, setCurrent_active_button] = useState(BTN_ALL);
  const [loading, setLoading] = useState(false);
  const todayDate = moment().format("YYYY-MM-DD");
  const yesterdarDate = moment().subtract(1, "day").format("YYYY-MM-DD");
  const page = searchParams["page"] < 1 ? "1" : searchParams["page"];
  const limit = LIMIT_PAGINATOR;
  const fechainicio = searchParams["inicio"] ?? yesterdarDate;
  const fechafin = searchParams["fin"] ?? todayDate;
  const start = (parseInt(page) - 1) * limit;
  const end = start + limit;

  const handleGetLast3Days = () => {
    const threeDaysAgoDate = moment().subtract(3, "days").format("YYYY-MM-DD");
    const todayDate = moment().format("YYYY-MM-DD");

    router.push(
      `history?inicio=${threeDaysAgoDate}&fin=${todayDate}&page=${FIRST_PAG}`
    );
  };

  const setDefaultURL = () => {
    router.push(
      `history?inicio=${APP_INITIAL_DATE}&fin=${todayDate}&page=${FIRST_PAG}`
    );
  };

  const handleClearFields = () => {
    if (fromDate != "" || toDate != "") {
      setDefaultURL();
    }

    setFromDate("");
    setToDate("");
  };

  const handleApplyFilter = () => {
    if (fromDate == "" || toDate == "") {
      mensajes(
        "Campos requeridos",
        "Los campos de fecha están vacíos",
        "error"
      );
    } else if (
      moment(toDate) < moment(fromDate)
      //  || moment().isBefore(moment(toDate))
    ) {
      mensajes(
        "Rango de fecha inválido",
        "El rango de fechas debe ser válido. La fecha de inicio debe ser anterior a la fecha de fin.",
        "error"
      );
    } else {
      router.push(`history?inicio=${fromDate}&fin=${toDate}&page=${1}`);
    }
  };

  const getPronostics = async () => {
    try {
      setLoading(true)
      if (
        !searchParams["page"] ||
        !searchParams["inicio"] ||
        !searchParams["fin"]
      ) {
        setDefaultURL();
      }

      const { results, totalCount } = await getWeatherData(token, fechainicio, fechafin, limit, page);

      if (totalCount == 0) {
        mensajes(
          "No hay datos climáticos",
          "No existen datos climáticos en el rango de fechas seleccionado",
          "warning"
        );
      } else {
        results.map((element) => {
          element.dateTime = moment(element.dateTime).format(
            "YYYY-MM-DDTHH:mm:ss[Z]"
          );

          return element;
        });

        let diccionario = {};

        results.forEach((e) => {
          const fecha = e.dateTime.split("T")[0];
          diccionario[fecha] = diccionario[fecha]
            ? [...diccionario[fecha], e]
            : [e];
        });

        // results = diccionario;

        setPronosticos({ totalCount, results: diccionario });
      }
    } catch (error) {
      console.log({ error });

      mensajes(
        "Error",
        error.response?.data?.msg || "No se pudieron obtener los datos climáticos",
        "error"
      );
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getPronostics();
  }, [page, fechainicio, fechafin, token]);

  return (
    <div className="main-container vertical-top history-page">
      {history?.results && (
        <section>
          <section className="history">
            <h1>Datos climáticos recolectados</h1>
            {loading && <Loader></Loader>}
            {Object.keys(history?.results).map((fecha, i) => {
              return (
                <section className="history-by-day" key={i}>
                  <h2>{fecha}</h2>
                  {history?.results[fecha].map((pronostico) => {
                    return (
                      <table key={pronostico.id}>
                        <tbody>
                          {
                            <tr key={pronostico?.id}>
                              <td>
                                {pronostico?.dateTime.split("T")[1].slice(0, 5)}
                              </td>
                              <td className="align-image">
                                <img
                                  src={pronostico?.state?.image}
                                  alt={"Pronóstico"}
                                />
                                <p>{pronostico?.state?.weatherType}</p>
                              </td>
                              <td>{roundNumber(pronostico?.humidity)}%</td>
                              <td>{roundNumber(pronostico?.temperature)} °C</td>
                              <td>{roundNumber(pronostico?.windSpeed)} m/h</td>
                              <td>{roundNumber(pronostico?.barometricPressure)} hPa</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    );
                  })}
                </section>
              );
            })}
          </section>
          <PaginationControls
            totalCount={history?.totalCount}
            searchParams={searchParams}
            hasNextPage={end < history?.totalCount}
            hasPrevPage={start > 0}
            baseUrlRedirect={"history"}
          />
        </section>
      )}

      {history?.results && (
        <section
          className={`card search ${current_active_button === BTN_LAST_3_DAYS ||
            current_active_button === BTN_ALL
            ? "form-hidden"
            : ""
            }`}
        >
          <h2>Búsqueda</h2>
          <div className="buttons">
            <button
              className={current_active_button === BTN_ALL ? "active" : ""}
              onClick={() => {
                setDefaultURL();
                setCurrent_active_button(BTN_ALL);
              }}
            >
              {BTN_ALL}
            </button>
            <button
              className={
                current_active_button === BTN_LAST_3_DAYS ? "active" : ""
              }
              onClick={() => {
                handleGetLast3Days();
                setCurrent_active_button(BTN_LAST_3_DAYS);
              }}
            >
              {BTN_LAST_3_DAYS}
            </button>
            <button
              className={current_active_button === BTN_FILTER ? "active" : ""}
              onClick={() => {
                setCurrent_active_button(BTN_FILTER);
              }}
            >
              {BTN_FILTER}
            </button>
          </div>
          {current_active_button == BTN_FILTER && (
            <form className="filters">
              <div>
                <div className="form-item">
                  <label>Desde</label>
                  <input
                    type="date"
                    name="from"
                    id="from"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="form-item">
                  <label>Hasta</label>
                  <input
                    type="date"
                    name="to"
                    id="to"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="filters-buttons">
                <button
                  type="button"
                  className="round-button"
                  onClick={handleApplyFilter}
                >
                  Aplicar
                </button>
                <button
                  type="button"
                  className="round-button"
                  onClick={handleClearFields}
                >
                  Limpiar
                </button>
              </div>
            </form>
          )}
        </section>
      )}
    </div>
  );
}

export default WithAuth(Pronosticos)