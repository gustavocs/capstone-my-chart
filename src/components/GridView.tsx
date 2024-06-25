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
import { useContext } from "react";
import { DataContext } from "../DataContext";



export function GridView({
  selectedCity,
  onSetCity
}: {
  selectedCity?: string;
  onSetCity?: (column: string) => void;
}): React.ReactElement | null {

  const { data } = useContext(DataContext);

  const newYorkData = data.map((d: any) => Number(d.newYork));
  const mexicoCityData = data.map((d: any) => Number(d.mexicoCity));
  const saoPauloData = data.map((d: any) => Number(d.saoPaulo));

  const Cities = [
    { cityName: "New York", color: "green", min: Math.min(...newYorkData), max: Math.max(...newYorkData) },
    { cityName: "Mexico City", color: "blue", min: Math.min(...mexicoCityData), max: Math.max(...mexicoCityData) },
    { cityName: "Sao Paulo", color: "red", min: Math.min(...saoPauloData), max: Math.max(...saoPauloData) }
  ]
  return (
    <Box width={1}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                City
              </TableCell>
              <TableCell>
                Lower Limit
              </TableCell>
              <TableCell>
                Upper Limit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Cities.map((city, i) => (
              <TableRow key={city.cityName} onClick={() => onSetCity?.(selectedCity === city.cityName ? "" : city.cityName)} style={selectedCity === city.cityName ? { backgroundColor: "#f0f0f0" } : {}}>
                <TableCell style={{ backgroundColor: city.color }}></TableCell>
                <TableCell>{city.cityName}</TableCell>
                <TableCell>{city.min}</TableCell>
                <TableCell>{city.max}</TableCell>
              </TableRow>
            ))};
          </TableBody>
        </Table>
      </TableContainer>
    </Box >
  );
}
