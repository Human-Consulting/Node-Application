import Chart from 'react-apexcharts';
import { TextDefault } from './Dashboard.styles';

const RadialChart = () => {
  const options = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        track: {
          background: '#2E2E38',
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
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

  const series = [76]; // Porcentagem

  return (
    <div
   style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
    >
      
      
      <Chart options={options} series={series} type="radialBar" height={275} />
      <TextDefault sx={{fontSize: '18px'}}>
            Do seu ultimo projeto
        </TextDefault>
    </div>
  );
};

export default RadialChart;
