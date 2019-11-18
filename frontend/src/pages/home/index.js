import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { Card, Title, Container } from './style';
import Page from '../../components/page';
import api from '../../services/api';
import DatePicker from '../../components/form-components/date-picker';
import { colors } from '../../configs/styled-components-options';
import Select from '../../components/form-components/select';
import { parser } from '../../util/select-parser';

const data_set_colors = [
    colors.green,
    colors.red,
    colors['blue=links'],
    colors['blue-dark'],
];

function Home(props) {
    const [datasData, setDatasData] = useState(null);
    const [totaisData, setTotaisData] = useState(null);
    const [date, setDate] = useState(null);
    const [filterTotais, setFilterTotais] = useState({
        data_referencia: null,
        funcionario: null,
        filial: null,
    });
    const [defaultOptionsFiliais, setDefaultOptionsFiliais] = useState([]);
    const [defaultOptionsFuncionarios, setDefaultOptionsFuncionarios] = useState([]);

    async function loadFiliais(search, callback = null) {
        const params = {
            filial: search || '',
        };

        const filiais = await api.get('filiais', {
            params,
        });

        const options = parser('filial', 'id', filiais.data.results);

        if (callback) {
            callback(options);
        }

        return options;
    }

    async function loadFuncionarios(search, callback = null) {
        const params = {
            filial: search || '',
        };

        const filiais = await api.get('funcionarios', {
            params,
        });

        const options = parser('nome', 'id', filiais.data.results);

        if (callback) {
            callback(options);
        }

        return options;
    }

    const getLabel = (value) => {
        switch (value) {
            case 'total_cadastros':
                return 'Total de cadastros';
            case 'total_renovacoes':
                return 'Total de renovações';
            case 'total_reativacoes':
                return 'Total de reativações';
            case 'total_vendas':
                return 'Total de vendas';
            default:
                return value;
        }
    };

    function buildTotalBarChart(dados) {
        const { data_referencia, ...item } = dados[0] ? dados[0] : [];

        const new_data = {
            labels: dados.map(object => object.data_referencia),
            datasets: Object.keys(item).map((value, index) => ({
                label: getLabel(value),
                backgroundColor: data_set_colors[index],
                borderColor: data_set_colors[index],
                borderWidth: 1,
                hoverBackgroundColor: data_set_colors[index],
                hoverBorderColor: data_set_colors[index],
                data: dados.map(object => object[value]),
            })),
        };

        setDatasData(new_data);
    }

    async function getDatasData(filtros = null) {
        if (filtros) {
            const dados = await api.get('feedbacks/estatisticas/datas', {
                params: { limit: 6, ...filtros },
            });

            buildTotalBarChart(dados.data.results);
        } else {
            const dados = await api.get('feedbacks/estatisticas/datas', {
                params: {
                    limit: 6,
                },
            });

            buildTotalBarChart(dados.data.results);
        }
    }

    function buildTotalDoughnutChart(data) {
        const new_data = {
            labels: Object.keys(data).map(key => getLabel(key)),
            datasets: [
                {
                    data: Object.values(data),
                    backgroundColor: data_set_colors,
                    hoverBackgroundColor: data_set_colors,
                },
            ],
        };

        setTotaisData(new_data);
    }

    async function getTotaisData(filtros = null) {
        if (filtros) {
            if (filtros.data_referencia) {
                filtros.data_referencia = moment(filtros.data_referencia).format('DD/MM/YYYY');
            }
            const dados = await api.get('feedbacks/estatisticas/totais', {
                params: { ...filtros },
            });

            buildTotalDoughnutChart(dados.data.results);
        } else {
            const dados = await api.get('feedbacks/estatisticas/totais');

            buildTotalDoughnutChart(dados.data.results);
        }
    }

    useEffect(() => {
        const getDefaultOptions = async () => {
            const filiais = await loadFiliais();
            setDefaultOptionsFiliais(filiais);
            const funcionarios = await loadFuncionarios();
            setDefaultOptionsFuncionarios(funcionarios);
        };

        getDefaultOptions();
        getDatasData();
        getTotaisData();
    }, []);

    useEffect(() => {
        getTotaisData({ ...filterTotais });
    }, [filterTotais]);

    function filterByDate(value) {
        setDate(value);
        if (value) {
            getDatasData({ data_referencia: moment(value).format('DD/MM/YYYY') });
        } else {
            getDatasData();
        }
    }

    function getFilterTotais(index, value) {
        if (index === 'data_referencia') {
            if (value) {
                setFilterTotais({ ...filterTotais, [index]: value });
            } else {
                const { data_referencia, ...filters } = filterTotais;
                setFilterTotais({ ...filters, [index]: null });
            }
        }

        if (index === 'filial') {
            if (value) {
                setFilterTotais({ ...filterTotais, [index]: value.value });
            } else {
                const { filial, ...filters } = filterTotais;
                setFilterTotais({ ...filters, [index]: null });
            }
        }

        if (index === 'funcionario') {
            if (value) {
                setFilterTotais({ ...filterTotais, [index]: value.value });
            } else {
                const { funcionario, ...filters } = filterTotais;
                setFilterTotais({ ...filters, [index]: null });
            }
        }
    }

    return (
        <Page title="Bem Vindo">
            {datasData && (
                <Card>
                    <Container>
                        <Title>Estatísticas por data</Title>
                        <Bar
                            width={600}
                            height={250}
                            data={datasData}
                            options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    }],
                                },
                            }}
                        />

                    </Container>
                    <Container width="40%">
                        <Title>Filtros</Title>
                        <DatePicker label="Data" name="data" onChange={filterByDate} value={date} />
                    </Container>
                </Card>
            )}
            {totaisData && (
                <Card margin="20px 0 0 0 ">
                    <Container>
                        <Title>Estatísticas totais</Title>
                        <Doughnut
                            width={600}
                            height={250}
                            data={totaisData}
                        />

                    </Container>
                    <Container width="40%">
                        <Title>Filtros</Title>
                        <DatePicker
                            label="Data"
                            name="data"
                            onChange={value => getFilterTotais('data_referencia', value)}
                            value={filterTotais.data_referencia}
                        />
                        <Select
                            name="filial"
                            type_select="async"
                            onChange={value => getFilterTotais('filial', value)}
                            noOptionsMessage={() => 'Nenhuma filial encontrada'}
                            loadOptions={loadFiliais}
                            cacheOptions
                            label="Filial"
                            placeholder="Selecione"
                            icon="icon-company"
                            margin="10px 0 0 0"
                            defaultOptions={defaultOptionsFiliais}
                        />
                        <Select
                            name="funcionario"
                            type_select="async"
                            onChange={value => getFilterTotais('funcionario', value)}
                            noOptionsMessage={() => 'Nenhum funcionario encontrado'}
                            loadOptions={loadFuncionarios}
                            cacheOptions
                            label="Funcionário"
                            placeholder="Selecione"
                            icon="icon-employee"
                            margin="10px 0 0 0"
                            defaultOptions={defaultOptionsFuncionarios}
                        />
                    </Container>
                </Card>
            )}
        </Page>
    );
}

export default Home;
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis dataKey="data_referencia" />
//    <YAxis />
//    <Tooltip />
//    <Legend />
//    <Bar dataKey="total_renovacoes" name="Renovações" fill={colors.green} />
// <Bar dataKey="total_reativacoes" name="Reativações" fill={colors.red} />
// <Bar dataKey="total_vendas" name="Vendas" fill={colors['blue=links']} />
// <Bar dataKey="total_cadastros" name="Cadastros" fill={colors['blue-dark']} />
// </BarChart>
