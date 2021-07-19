import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

export const PatientList: FunctionComponent = () => {
  const [patients, setPatients] = useState<Record<string, any>[]>([]);

  console.log('patients[0]: ', patients[0])
  useEffect(() => {
    (async function getPatients() {
      try {
        const resp = await axios.get("/api/patients");
        // Reversing here because the DB query didn't seem to respond to ORDER BY ... _DESC_
        setPatients(resp.data.reverse());
      } catch (e) {
        console.error(e?.response?.data?.message);
      }
    })();
  }, []);

  // const onClick = (e) => {
  //   console.log('e: ', e); TypeScript error Parameter 'e' implicitly has an 'any' type. TS7006
  //                            I'm not familiar with resolving this since I don't know Typescript.
  // };

  return (
    <div style={{ height: "100%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>MRN</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Starred</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patients.map((patient) => (
              <TableRow key={`${patient.id}`}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.mrn}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell /*onClick={onClick}*/>{patient.starred ? <span>&#9733;</span> : <span>&#9734;</span> }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
