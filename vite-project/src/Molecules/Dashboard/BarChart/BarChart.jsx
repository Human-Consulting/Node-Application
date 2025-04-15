import Chart from 'react-apexcharts';

const MinimalBarChart = () => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
        borderRadius: 4
      }
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
          show: false
        }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: '#fff'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    colors: ['#fff']
  };

  const series = [
    {
      name: 'Sales',
      data: [400, 150, 100, 450, 300, 50, 350, 200, 410]
    }
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #2c2e8a, #0f1125)',
        padding: '1rem',
        borderRadius: '1rem',

      }}
    >
      <Chart options={options} series={series} type="bar" height={150} width="100%" />
    </div>
  );
};

export default MinimalBarChart;
