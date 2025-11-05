import { Block } from '@mui/icons-material';
import Chart from 'react-apexcharts';

const RadialChart = ({ comImpedimento, progresso }) => {
  const isBlocked = !!comImpedimento;

  const options = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        track: {
          background: '#2E2E38',
        },
        dataLabels: {
          show: !isBlocked,
          name: {
            color: '#ccc',
            fontSize: '14px',
            offsetY: -10,
          },
          value: {
            color: '#00E396',
            fontSize: '20px',
            fontWeight: 'bold',
            offsetY: 10,
          },
        },
      },
    },
    colors: [isBlocked ? '#FF1744' : '#00E396'],
    labels: ['Progresso'],
  };

  const series = [isBlocked ? 100 : (progresso || 0)];

  return (
    <div
      style={{
        width: '120px',
        height: '120px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={150}
        width={150}
      />

      {isBlocked && (
        <Block
          sx={{
            color: '#FF1744',
            fontSize: 80,
            position: 'absolute',
          }}
        />
      )}
    </div>
  );
};

export default RadialChart;
