import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { TemperatureData } from '../types/temperature';
import { CITY_CONFIGS } from '../types/cityConfig';

const strokeWidth = (city: string, current: string): number => {
    return (city === current) ? 3 : 1;
}

export function Chart({ city, data }: { city: string; data: TemperatureData[] }) {

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
                {CITY_CONFIGS.map(config => (
                    <Line
                        key={config.name}
                        dataKey={config.dataKey}
                        stroke={config.color}
                        name={config.name}
                        strokeWidth={strokeWidth(city, config.name)}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );

}