'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from './components/Chart';
import { getWeatherDataStatics } from '@/services/weatherData.service';
import { getPronosticsStatics } from '@/services/pronostic.service';
// import { WithAuth } from './components/WithAuth';
import { useRouter } from 'next/navigation';

const PARAMETER_DICTIONARY = {
  temperature: "Temperatura",
  humidity: "Humedad",
  barometricPressure: "Presión barométrica",
  windSpeed: "Velocidad del viento"
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [parameter, setParameter] = useState('temperature'); // Por defecto, mostrar temperatura
  const { loginUser, user, token } = useAuth();
  const [history, setHistory] = useState([]);
  const [pronostics, setPronostics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const userData = window.localStorage.getItem("user")
      const token = window.localStorage.getItem("token")

      // Si ya hay sesión, logueo al usuario, sino, lo mando al login
      if (userData && token) {
        loginUser(JSON.parse(userData), token)
      } else {
        router.push("/login")
      }
    }
  }, []);

  const handleParameterChange = (newParameter) => {
    setParameter(newParameter);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Lógica para obtener los datos correspondientes a la nueva fecha seleccionada
  };

  // Lógica para preparar los datos para la gráfica
  const chartData = {
    labels: pronostics ? pronostics.map(e => e.label) : [],
    datasets: [
      {
        label: `${PARAMETER_DICTIONARY[parameter]} histórica`,
        data: history ? history.map(e => e[parameter]) : [],
        fill: true,
        // borderColor: 'rgb(75, 192, 192)',
        color: "pink",
        tension: 1,
      },
      {
        label: `${PARAMETER_DICTIONARY[parameter]} pronosticada`,
        data: pronostics ? pronostics.map(e => e[parameter]) : [],
        fill: true,
        borderColor: 'purple',
        tension: 1,
      },
    ],
  };


  const fetchData = async () => {
    const historyData = await getWeatherDataStatics(token, selectedDate);
    const pronosticData = await getPronosticsStatics(token, selectedDate);

    setPronostics(pronosticData);
    setHistory(historyData);
  }

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [selectedDate, token]);

  return (
    <main className="main-container">
      <div>
        <h1>Comparación de Datos Históricos y Pronósticos</h1>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            maxDate={new Date()} // Solo permitir fechas hasta el día de hoy
            minDate={new Date('2024/01/01')} // Fecha mínima permitida
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div>
          <button style={{ backgroundColor: parameter === "temperature" ? "skyblue" : "" }} onClick={() => handleParameterChange('temperature')}>Temperatura</button>
          <button style={{ backgroundColor: parameter === "humidity" ? "skyblue" : "" }} onClick={() => handleParameterChange('humidity')}>Humedad</button>
          <button style={{ backgroundColor: parameter === "barometricPressure" ? "skyblue" : "" }} onClick={() => handleParameterChange('barometricPressure')}>Presión Barométrica</button>
        </div>
        <Chart data={chartData} />
      </div>
    </main>
  );
}

// export default WithAuth(Home)