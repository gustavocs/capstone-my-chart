import { useContext, useEffect, useState } from "react";
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

export function Chart({ city }: { city: string }) {
    const { data } = useContext(DataContext);

    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={data}>
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
                    strokeWidth={city === 'New York' ? 3 : 1}
                />
                <Line dataKey="mexicoCity"
                    stroke="blue"
                    name="Mexico City"
                    strokeWidth={city === 'Mexico City' ? 3 : 1}

                />
                <Line dataKey="saoPaulo"
                    stroke="red"
                    name="Sao Paulo"
                    strokeWidth={city === 'Sao Paulo' ? 3 : 1}
                />
            </LineChart>
        </ResponsiveContainer>
    );

}