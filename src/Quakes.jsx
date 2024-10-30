import { Button, Container, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";

const URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

function Quakes() {
  const [quakes, setQuakes] = useState([]);

  async function fetchQuakes() {
    console.log("Clicked");
    const resp = await fetch(URL);
    const data = await resp.json();
    setQuakes(data.features);
  }

  console.log(quakes);

  return (
    <div>
      <Container maxWidth="md">
        <Stack direction="column" spacing={2}>
          <Typography variant="h2">Quakes</Typography>
          <Button
            variant="contained"
            sx={{ width: "30%", marginBottom: 4 }}
            onClick={() => fetchQuakes()}
          >
            Get Quakes!
          </Button>
        </Stack>
        {/* {quakes.length > 0 && JSON.stringify(quakes)} */}
        {/* <ul>
        {quakes.length > 0 &&
          quakes.map(quake => {
            return <li key={quake.id}>{quake.properties.place}</li>;
          })}
      </ul> */}
        {quakes && <QuakesTable quakes={quakes} />}
      </Container>
    </div>
  );
}

export default Quakes;

function QuakesTable({ quakes }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align="right">Magnitude</TableCell>
            <TableCell align="right">Depth (km)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quakes.map((quake) => (
            <TableRow
              key={quake.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{quake.properties.place}</TableCell>
              <TableCell align="right">{quake.properties.mag}</TableCell>
              <TableCell align="right">
                {quake.geometry.coordinates[2]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
