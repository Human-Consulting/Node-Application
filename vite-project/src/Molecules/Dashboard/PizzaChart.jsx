import Chart from 'react-apexcharts';

const PizzaChart = () => {
  const options = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    labels: ['Produto A', 'Produto B', 'Produto C'],
    colors: ['#00E396', '#0090FF', '#775DD0'], // cores vibrantes/tech
    legend: {
      position: 'bottom',
      labels: {
        colors: '#ccc',
        useSeriesColors: false
      },
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial, sans-serif'
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#000000']
      }
     
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '18px',
              color: '#fff'
            },
            value: {
              show: true,
              fontSize: '16px',
              color: '#ccc',
              formatter: (val) => `${val}%`
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              color: '#888',
              formatter: () => '100%'
            }
          }
        }
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '14px'
      }
    },
    stroke: {
      show: false
    }
  };

  const series = [35, 25, 20];

  return (
    <div
      className="App"

    >
    
      <Chart options={options} series={series} type="donut" width="100%" height={300} />
    </div>
  );
};

export default PizzaChart;
