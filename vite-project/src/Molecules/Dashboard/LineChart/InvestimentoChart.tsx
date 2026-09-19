import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import ModalInvestimento from '../../Modais/ModalInvestimento/ModalInvestimento';
import { useParams } from 'react-router';
import { Investimento } from '../../../Utils/cruds/CrudsInvestimento';
import { useTheme as useMuiTheme } from '@mui/material/styles';

interface InvestimentoChartProps {
  orcamento?: number | string | null;
  financeiros?: Investimento[] | null;
  toogleModal?: (investimento: Investimento | null) => void;
  atualizarEntidade?: () => void | Promise<void>;
}

const LineChart = ({ orcamento, financeiros, toogleModal, atualizarEntidade }: InvestimentoChartProps) => {


  const { idProjeto } = useParams();
  const theme = useMuiTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleBadgeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const mesesNome = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const totaisPorMes = Array(12).fill(0);


  financeiros?.forEach(financeiro => {
    const data = new Date(financeiro.dtInvestimento as string);
    const mes = !isNaN(data.getTime()) ? data.getUTCMonth() : null;

    if (mes !== null) {
      totaisPorMes[mes] += Number(financeiro.valor) || 0;
    }
  });

  let ultimoMesComDados = -1;
  for (let i = totaisPorMes.length - 1; i >= 0; i--) {
    if (totaisPorMes[i] > 0) {
      ultimoMesComDados = i;
      break;
    }
  }

  const resultadoFinal: { mes: string; valor: number }[] = [];
  let acumulado = 0;
  for (let i = 0; i <= ultimoMesComDados; i++) {
    acumulado += totaisPorMes[i];
    resultadoFinal.push({
      mes: mesesNome[i],
      valor: acumulado
    });
  }

  const orcamentoNumerico = Number(orcamento) || 0;
  const orcamentos = resultadoFinal.map(() => orcamentoNumerico);

  const options: ApexOptions = {
    chart: {
      id: 'multi-line',
      toolbar: { show: false }
    },
    colors: ['#008FFB', '#ff1744'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'straight',
      width: [2, 1],
      dashArray: [0, 0]
    },
    fill: {
      type: ['gradient', 'solid'],
      opacity: [0, 0],
      gradient: {
        shade: theme.palette.mode,
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.4,
        stops: [0, 90, 100]
      }
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontSize: '12px'
        }
      },
      categories: resultadoFinal.map(item => item.mes),
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      shared: false,
      intersect: false,
      theme: theme.palette.mode,
    },
    legend: {
      show: false
    },
  };

  const series = [
    {
      name: 'Investimento',
      data: resultadoFinal.map(item => item.valor)
    },
    {
      name: "Orçamento",
      data: orcamentos
    }
  ];

  return (
    <div className="App" style={{ padding: '1rem', height: '70%', background: theme.palette.background.default, width: '100%', borderRadius: '20px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Investimentos</h2>
        {idProjeto == null ? null : <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={handleBadgeClick as unknown as React.MouseEventHandler<SVGSVGElement>} />}
      </div>
      <Chart options={options} series={series} type="area" height={'85%'} />
      <ModalInvestimento
        investimentos={financeiros || []}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        toogleModal={toogleModal}
        atualizarEntidade={atualizarEntidade}
      />
    </div>
  );
};

export default LineChart;
