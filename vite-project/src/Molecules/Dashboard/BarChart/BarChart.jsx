import Chart from 'react-apexcharts';

const MinimalBarChart = ({ areas }) => {
  const valores = areas?.map(a => a?.valor || 0) ?? [];
  const categorias = areas?.map(a => a?.nome || '') ?? [];

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '20%',
        borderRadius: 4,
        distributed: true
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: '#333',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: categorias,
      labels: {
        style: {
          colors: '#fff'
        }
      },
      min: 0,
      stepSize: 5
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
          fontWeight: 600
        }
      }
    },
    colors: ['#4dabf5', '#00E396', '#ffca28', '#ef5350'],
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
  };

  const series = [
    {
      name: 'Tarefas',
      data: valores
    }
  ];

  return (
    <div
      style={{
        // background: 'linear-gradient(to right, #1F1F1F, #0f1125)',
        borderRadius: '1rem',
        // background: '#22272B'
      }}
    >
      <Chart options={options} series={series} type="bar" height={300} width="100%" />
    </div>
  );
};

export default MinimalBarChart;
