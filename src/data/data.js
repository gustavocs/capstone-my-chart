import data from './Data.txt';
import { tsvJSON } from '../utils/utils';

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
export const fetchData = async () => {
    try {
        const text = await fetch(data);
        const textString = await text.text();
        return tsvJSON(textString, columns, newline);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

}

