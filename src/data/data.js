import data from './Data.txt';
import { tsvJSON } from '../utils/utils';

export const columns = {
    'Date and Time': 'time',
    'New York': 'newYork',
    'Mexico City': 'mexicoCity',
    'Sao Paulo': 'saoPaulo'
}

// This could be a Service making API Calls
export const fetchData = async () => {
    try {
        const text = await fetch(data);
        const textString = await text.text();
        return tsvJSON(textString, columns);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

}

