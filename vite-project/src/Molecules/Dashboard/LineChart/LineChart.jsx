import Chart from 'react-apexcharts';

const LineChart = () => {
    const options = {
        chart: {
          id: 'multi-line',
          toolbar: {
            show: false
          }
        },
        colors: ['#008FFB', '#00E396'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ['#00E396', '#008FFB'],
            inverseColors: false,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100]
          }
        },
        grid: {
          show: true,
          borderColor: '#444',
          strokeDashArray: 4
        },
        xaxis: {
          labels: {
            style: {
              colors: '#888',
              fontSize: '12px'
            }
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
          
        },
        yaxis: {
          show: true,
          labels: {
            style: {
              colors: '#888',
              fontSize: '12px'
            }
          }
        },
        tooltip: {
          shared: true,
          intersect: false
        }
      };
    
      const series = [
        {
          name: 'Vendas 2024',
          data: [30, 40, 35, 50, 49]
        },
        {
          name: 'Vendas 2025',
          data: [23, 30, 44, 45, 41]
        }
      ];
    
      return (
        <div className="App" style={{ width: '100%', padding: '1rem' }}>
        <h2>Gráfico de Linhas com Gradiente</h2>
        <Chart options={options} series={series} type="area" height={350} width="100%" />
      </div>
      );
    };
  export default LineChart;