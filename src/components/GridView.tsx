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

const Cities = [
  { cityName: "New York", color: "green", min: 0, max: 50 },
  { cityName: "Mexico City", color: "blue", min: 0, max: 50 },
  { cityName: "Sao Paulo", color: "red", min: 0, max: 50 }
]

export function GridView({
  sortColumn,
  onSetSortColumn
}: {
  sortColumn?: string;
  onSetSortColumn?: (column: string) => void;
}): React.ReactElement | null {

  const { data } = useContext(DataContext);
  console.info(data);

  return (
    <Box width={1}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell
                onClick={() => onSetSortColumn?.("city")}
              >
                City {sortColumn === "city" ? <span>*</span> : ""}
              </TableCell>
              <TableCell
                onClick={() => onSetSortColumn?.("lowerLimit")}
              >
                Lower Limit {sortColumn === "lowerLimit" ? <span>*</span> : ""}
              </TableCell>
              <TableCell
                onClick={() => onSetSortColumn?.("upperLimit")}
              >
                Upper Limit {sortColumn === "upperLimit" ? <span>*</span> : ""}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Cities.map((city, i) => (
              <TableRow key={city.cityName}>
                <TableCell style={{ backgroundColor: city.color }}></TableCell>
                <TableCell>{city.cityName}</TableCell>
                <TableCell>{city.min}</TableCell>
                <TableCell>{city.max}</TableCell>
              </TableRow>
            ))};
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
