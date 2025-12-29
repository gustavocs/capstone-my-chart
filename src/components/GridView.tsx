import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import * as React from "react";
import { useMemo } from "react";
import { TemperatureData } from "../types/temperature";
import { CITY_CONFIGS, CityStats } from "../types/cityConfig";

/**
 * Calculate min and max temperatures for a specific city
 */
const calculateCityStats = (
  data: TemperatureData[],
  dataKey: keyof TemperatureData
): { min: number; max: number } => {
  if (data.length === 0) {
    return { min: Infinity, max: -Infinity };
  }

  const values = data.map(d => Number(d[dataKey]));
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

/**
 * Calculate statistics for all cities
 */
const calculateAllCityStats = (data: TemperatureData[]): CityStats[] => {
  return CITY_CONFIGS.map(config => {
    const stats = calculateCityStats(data, config.dataKey);
    return {
      name: config.name,
      color: config.color,
      ...stats,
    };
  });
};

export function GridView({
  selectedCity,
  onSetCity,
  data
}: {
  selectedCity?: string;
  onSetCity?: (column: string) => void;
  data: TemperatureData[];
}): React.ReactElement | null {
  // Memoize city statistics to avoid recalculating on every render
  const cityStats = useMemo(() => calculateAllCityStats(data), [data]);

  return (
    <Box width={1}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>City</TableCell>
              <TableCell>Lower Limit</TableCell>
              <TableCell>Upper Limit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cityStats.map((city) => (
              <TableRow
                key={city.name}
                onClick={() => onSetCity?.(selectedCity === city.name ? "" : city.name)}
                style={selectedCity === city.name ? { backgroundColor: "#f0f0f0", cursor: "pointer" } : { cursor: "pointer" }}
              >
                <TableCell style={{ backgroundColor: city.color }}></TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.min}</TableCell>
                <TableCell>{city.max}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
