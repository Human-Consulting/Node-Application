import dayjs from 'dayjs';
import Chart from 'react-apexcharts';

const BurndownChart = ({ dados, idSprint }) => {
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
            borderColor: '#333',
        },
        legend: {
            show: false,
        },
        xaxis: {
            categories: dias,
            tickAmount: 6,
            labels: { style: { colors: '#fff' } },
        },
        yaxis: {
            min: 0,
            max: totalTarefas,
            tickAmount: 5,
            labels: {
                style: { colors: '#fff' },
                formatter: (val) => Math.round(val),
            },
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val) => `${val.toFixed(0)} tarefas`,
            },
        },
    };

    const series = [
        {
            name: 'Ideal',
            data: ideal,
            color: '#008FFB', //TODO Avaliar cores
        },
        {
            name: 'Real',
            data: concluidas.map(c => totalTarefas - c),
            color: '#FF4560', //TODO Avaliar cores
            color: '#00ff99', //TODO Avaliar cores
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
