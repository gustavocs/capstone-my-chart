const columns = {
    'Date and Time': 'dateTime',
    'New York': 'newYorkData',
    'Mexico City': 'mexicoCityData',
    'Sao Paulo': 'saoPauloData'
}

const newline = "\r\n";

export const tsvJSON = (tsv) => {
    var lines = tsv.split(newline);
    var result = [];
    var headers = lines[0].split("\t");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split("\t");

        for (var j = 0; j < headers.length; j++) {
            if (columns[headers[j]]) {
                obj[columns[headers[j]]] = currentline[j];
            }
        }
        result.push(obj);
    }

    return result;
}