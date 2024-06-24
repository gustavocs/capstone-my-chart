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

function App() {
  const [sortColumn, setSortColumn] = useState("");
  const [data, setData] = useState({});

  async function fetchData() {
    try {
      const result = await getData();
      setData(result);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <DataContext.Provider value={{ data }}>
        <Grid item xs={12}>
          <GridView
            sortColumn={sortColumn}
            onSetSortColumn={setSortColumn}
          />
        </Grid>
        <Grid item xs={12}>
          <Chart />
        </Grid>
        <Grid justify="space-between" container spacing={1}>
          <Grid item>
            <Button
              variant="contained"
            >
              Back 3 Days
            </Button>
          </Grid>
          <Grid item>
            <Button
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
