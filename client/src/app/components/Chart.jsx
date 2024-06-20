import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
  return (
    <div style={{ height: '500px' }}>
      <Line
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Hora del día',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Valor',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
