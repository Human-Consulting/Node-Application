import dayjs from 'dayjs';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const BurndownChart = ({ dados, idSprint }) => {
    const theme = useTheme();

    if (!dados || dados.length === 0) return null;
    const hoje = dayjs();

    const sprintSelecionada = dados.sprints.find(s => s.idSprint == idSprint);
    if (!sprintSelecionada) return null;

    const burndown = sprintSelecionada.burndown;
    const totalTarefas = burndown[0]?.totalTarefas || 0;
    const diasTotais = burndown.length;

    const concluidas = burndown
        .filter(d => dayjs(d.dia).isBefore(hoje) || dayjs(d.dia).isSame(hoje, 'day'))
        .map(d => d.tarefasConcluidas);

    const ideal = Array.from({ length: diasTotais }, (_, i) => {
        const restantes = totalTarefas - (totalTarefas / (diasTotais - 1)) * i;
        return Math.max(restantes, 0);
    });

    const dias = burndown.map(d => dayjs(d.dia).format("DD/MM"));

    const labelColor = theme.palette.iconPrimary;
    const gridColor = theme.palette.custom.border || "#444";
    const tooltipTheme = theme.palette.mode === "dark" ? "dark" : "light";

    const options = {
        chart: {
            type: 'line',
            background: 'transparent',
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        grid: {
            borderColor: gridColor,
        },
        legend: {
            show: true,
            labels: {
                colors: labelColor,
            }
        },
        xaxis: {
            categories: dias,
            tickAmount: 6,
            labels: { 
                style: { 
                    colors: labelColor,
                    fontSize: '13px'
                } 
            },
        },
        yaxis: {
            min: 0,
            max: totalTarefas,
            tickAmount: 5,
            labels: {
                style: { 
                    colors: labelColor,
                    fontSize: '13px'
                },
                formatter: (val) => Math.round(val),
            },
        },
        tooltip: {
            theme: tooltipTheme,
            style: {
                fontSize: '14px',
            },
            y: {
                formatter: val => `${val.toFixed(0)} tarefas`,
            },
        },
    };

    const series = [
        {
            name: 'Ideal',
            data: ideal,
            color: theme.palette.primary.main,
        },
        {
            name: 'Real',
            data: concluidas.map(c => totalTarefas - c),
            color: theme.palette.custom.primary || theme.palette.secondary.main,
        },
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="line"
            height="85%"
            width="100%"
        />
    );
};

export default BurndownChart;
