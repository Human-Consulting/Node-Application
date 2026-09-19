import { Block } from '@mui/icons-material';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme as useMuiTheme } from '@mui/material/styles';

interface RadialChartProps {
  comImpedimento?: boolean | null;
  progresso?: number | null;
}

const RadialChart = ({ comImpedimento, progresso }: RadialChartProps) => {
  const isBlocked = !!comImpedimento;
  const theme = useMuiTheme();

  const options: ApexOptions = {
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
          background: theme.palette.divider,
        },
        dataLabels: {
          show: !isBlocked,
          name: {
            color: theme.palette.text.secondary,
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
