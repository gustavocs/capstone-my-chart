import data from '../data/Data.txt';
import { tsvJSON } from './utils';

// This could be a Service making API Calls
export const fetchData = async () => {
    try {
        const text = await fetch(data);
        const textString = await text.text();
        return tsvJSON(textString);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

}

