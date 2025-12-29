import { useState } from 'react';
import './App.css';

import {
  Grid,
  CircularProgress,
  Typography
} from "@material-ui/core";

import { GridView } from '../src/components/GridView';
import { Chart } from './components/Chart';

import {
  Button
} from "@material-ui/core";
import { fetchData } from './data/data';
import { useDatePagination } from './hooks/useDatePagination';

// Number of days to show per page
const DAYS_PER_PAGE = 3;

function App() {
  const [city, setCity] = useState("");

  // Use custom hook for date-based pagination with integrated data fetching
  const {
    data,
    isLoading,
    error,
    handleNavigateBack,
    handleNavigateForward,
    isBackDisabled,
    isForwardDisabled,
  } = useDatePagination({ fetchDataFn: fetchData, daysPerPage: DAYS_PER_PAGE });

  if (isLoading) {
    return (
      <Grid container justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Typography color="error">Error loading data: {error.message}</Typography>
      </Grid>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <GridView
          selectedCity={city}
          onSetCity={setCity}
          data={data}
        />
      </Grid>
      <Grid item xs={12}>
        <Chart city={city} data={data} />
      </Grid>
      <Grid justify="space-between" container spacing={1}>
        <Grid item>
          <Button
            onClick={handleNavigateBack}
            variant="contained"
            disabled={isBackDisabled}
          >
            Back 3 Days
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={handleNavigateForward}
            variant="contained"
            disabled={isForwardDisabled}
          >
            Forward 3 Days
          </Button>
        </Grid>

      </Grid>
    </>
  );
}
export default App;
