import data from '../data/Data.txt';
import { tsvJSON } from './utils';

export const getData = async () => {
    const text = await fetch(data);
    const textString = await text.text();
    return tsvJSON(textString);
}

