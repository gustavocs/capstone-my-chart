import { useEffect, useState } from 'react';
import './App.css';

import {
  Grid
} from "@material-ui/core";

import { GridView } from '../src/components/GridView';
import { Chart } from './components/Chart';
import { DataContext } from "./DataContext";

import {
  Button
} from "@material-ui/core";
import { fetchData } from './utils/data';

/* Each day has 24 temperatures, so 72 = 3 days. Could be changed according to needed. 
This approach for pagination is acceptable and will work only if each day has exactly 24 temperatures.
Another approach could be setting an initial day and filtering by a date range,
but personally I prefer to make it simple if possible */
const PAGE_SIZE = 72;

function App() {
  const [city, setCity] = useState("");
  const [fullData, setFullData] = useState(Array<any>);
  const [data, setData] = useState(Array<any>);
  const [page, setPage] = useState(0);

  async function getData() {
    setFullData(await fetchData() as Array<any>);
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setData(fullData.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE))
  }, [fullData, page])

  return (
    <>
      {/* Not sure if Context is needed, maybe passing data using props is fine. */}
      <DataContext.Provider value={{ data }}>
        <Grid item xs={12}>
          <GridView
            selectedCity={city}
            onSetCity={setCity}
          />
        </Grid>
        <Grid item xs={12}>
          <Chart city={city} />
        </Grid>
        <Grid justify="space-between" container spacing={1}>
          <Grid item>
            <Button
              onClick={() => setPage(page - 1)}
              variant="contained"
            >
              Back 3 Days
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setPage(page + 1)}
              variant="contained"
            >
              Forward 3 Days
            </Button>
          </Grid>

        </Grid>
      </DataContext.Provider>
    </>
  );
}
export default App;
