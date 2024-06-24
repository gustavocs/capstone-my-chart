import { useContext } from "react";
import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { DataContext } from "../DataContext";

const ChartData = [
    { newYork: 6.225944404, mexicoCity: 21.90052061, saoPaulo: 32.19307301, time: "1/1/2022 0:00" },
    { newYork: 10.05724972, mexicoCity: 20.50315008, saoPaulo: 33.54266016, time: "1/1/2022 1:00" },
    { newYork: 9.727012278, mexicoCity: 27.47717586, saoPaulo: 39.88701145, time: "1/1/2022 2:00" },
    { newYork: 10.61907375, mexicoCity: 22.53790381, saoPaulo: 34.05214063, time: "1/1/2022 3:00" }
]

export function Chart() {
    const { data } = useContext(DataContext);
    console.info(data);

    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={ChartData}>
                <XAxis
                    dataKey='time'
                    name='Time'
                    type='category'
                />
                <YAxis></YAxis>
                <Legend />
                <Tooltip />
                <Line dataKey="newYork"
                    stroke="green"
                    name='New York'
                />
                <Line dataKey="mexicoCity"
                    stroke="blue"
                    name="Mexico City" />
                <Line dataKey="saoPaulo"
                    stroke="red"
                    name="Sao Paulo" />
            </LineChart>
        </ResponsiveContainer>
    );

}