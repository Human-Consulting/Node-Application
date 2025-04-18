import Chart from 'react-apexcharts';
import { TextDefault } from './Dashboard.styles';

const RadialChart = ({ progresso }) => {
  const options = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '80%',
        },
        track: {
          background: '#2E2E38',
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -15,
            color: '#ccc',
            fontSize: '16px'
          },
          value: {
            color: '#00E396',
            fontSize: '24px',
            fontWeight: 'bold',
            offsetY: 10
          }
        }
      }
    },
    colors: ['#00E396'],
    labels: ['Progresso'],
  };

  const series = [progresso];

  return (
    <div style={{width: '50%'}}>
      <Chart options={options} series={series} type="radialBar" height={150} />
    </div>
  );
};

export default RadialChart;