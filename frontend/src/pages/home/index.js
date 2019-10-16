import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import moment from 'moment';
import { Card, Title, Container } from './style';
import Page from '../../components/page';
import api from '../../services/api';
import DatePicker from '../../components/form-components/date-picker';
import { colors } from '../../configs/styled-components-options';

function Home(props) {
    const [data, setData] = useState(null);
    const [date, setDate] = useState(null);

    async function getData(filtros = null) {
        if (filtros) {
            const dados = await api.get('feedbacks/estatisticas/total', {
                params: { ...filtros },
            });

            setData(null);
            setData(dados.data.results);
        } else {
            const dados = await api.get('feedbacks/estatisticas/total');

            setData(dados.data.results);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    function filterByDate(value) {
        setDate(value);
        if (value) {
            getData({ data_referencia: moment(value).format('DD/MM/YYYY') });
        } else {
            getData();
        }
    }

    return (
        <Page title="Bem Vindo">
            {data && (
                <Card>
                    <Container>
                        <Title>Estatísticas totais</Title>
                        <BarChart width={600} height={250} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data_referencia" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total_renovacoes" name="Renovações" fill={colors.green} />
                            <Bar dataKey="total_reativacoes" name="Reativações" fill={colors.red} />
                            <Bar dataKey="total_vendas" name="Vendas" fill={colors['blue=links']} />
                            <Bar dataKey="total_cadastros" name="Cadastros" fill={colors['blue-dark']} />
                        </BarChart>
                    </Container>
                    <Container width="50%">
                        <Title>Filtros</Title>
                        <DatePicker name="data" onChange={filterByDate} value={date} />
                    </Container>
                </Card>
            )}
        </Page>
    );
}

export default Home;
