import express from "express";
import db from "./util/db";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const rows = db
      .prepare(`SELECT id, mrn, name, dob, starred FROM patients`)
      .all();
    // sqlite doesn't have a boolean type, so map 1/0 to true/false for the API
    const patients = rows.map((row) => {
      return { ...row, starred: row.starred === 1 };
    });
    res.json(patients);
  } catch (e) {
    res.status(500).json({ message: e?.message });
  }
});

export default router;
