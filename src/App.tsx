import React, { useEffect, useState } from 'react';
import './App.css';

import {
  Grid
} from "@material-ui/core";

import { GridView } from '../src/components/GridView';
import { Chart } from './components/Chart'
import { DataContext } from "./DataContext";

import {
  Button
} from "@material-ui/core";
import { getData } from './utils/data';

const PAGE_SIZE = 72; // Each day has 24 temperatures, so 72 = 3 days. Could be changed according to needed

function App() {
  const [city, setCity] = useState("");
  const [fullData, setFullData] = useState(Array<any>);
  const [data, setData] = useState(Array<any>);
  const [page, setPage] = useState(0);

  async function fetchData() {
    try {
      const result = await getData();
      setFullData(result as Array<any>);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setData(fullData.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE))
  }, [fullData, page])

  return (
    <>
      <DataContext.Provider value={{ data, fullData }}>
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
