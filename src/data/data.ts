import data from './Data.txt';
import { tsvJSON } from '../utils/utils';
import { TemperatureData } from '../types/temperature';

const columns = {
    'Date and Time': 'time',
    'New York': 'newYork',
    'Mexico City': 'mexicoCity',
    'Sao Paulo': 'saoPaulo'
}

/* That's the newline char used by the file. 
Could change according to OS and/or different files  */
const newline = "\r\n";

// This could be a Service making API Calls
export const fetchData = async (): Promise<TemperatureData[]> => {
    try {
        const text = await fetch(data);
        const textString = await text.text();
        return tsvJSON(textString, columns, newline) as TemperatureData[];
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }

}

