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

const strokeWidth = (city: string, current: string): number => {
    return (city === current) ? 3 : 1;
}

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
                    strokeWidth={strokeWidth(city, 'New York')}
                />
                <Line dataKey="mexicoCity"
                    stroke="blue"
                    name="Mexico City"
                    strokeWidth={strokeWidth(city, 'Mexico City')}

                />
                <Line dataKey="saoPaulo"
                    stroke="red"
                    name="Sao Paulo"
                    strokeWidth={strokeWidth(city, 'Sao Paulo')}
                />
            </LineChart>
        </ResponsiveContainer>
    );

}