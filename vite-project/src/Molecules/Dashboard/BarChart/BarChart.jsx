import Chart from 'react-apexcharts';

const MinimalBarChart = ({ valores, categorias }) => {

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
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
  };

  const series = [
    {
      name: 'Tarefas',
      data: valores
    }
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height="85%"
      width="100%"
    />
  );
};

export default MinimalBarChart;
