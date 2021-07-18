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

  useEffect(() => {
    (async function getPatients() {
      try {
        const resp = await axios.get("/api/patients");
        setPatients(resp.data);
      } catch (e) {
        console.error(e?.response?.data?.message);
      }
    })();
  }, []);

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
                <TableCell>{"Add Stars Here"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
