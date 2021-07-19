# Oncora Medical

## Problem

Patient list
  - Star patients
    - Click on a star icon in right column
  - Star
    - 2 states
      1. Starred
      2. Unstarred
  - Starred patients move to the top
  - Persist state in db

### Understanding

Add stars
  - Icon?
  - HTML?
Style stars per selection state
Sort list per selection state
Create a click event on stars
  - Update db

#### Discovery

1. Assess frontend
  - Identify React component where stars will render **CHECK**
2. Identify how to interact w/ the db                **CHECK**
  - `better-sqlite3`
3. Survey the backend                                **CHECK**
  - Express app
    - `Router`
      - Modularized app
      - Declare routes

## Examples / Test Cases

Running list
  - Has columns

## Data Structures

- N/A

## Algorithm

1. Create route handler                               **CHECK**
  1. Parse `req.params` for id of patient and state of starred
  2. POST
    - Update db
    - `UPDATE patients SET starred = ? WHERE id == ?`
    - Test w/ example patient id and Insomnia
2. Modify column to be a star, conditionally filled   **CHECK**
3. Order table columns by 'starred'                   **blocked**
  - NOTE: Attempt to order DESC in SQL query ineffective
    - `SELECT id, mrn, name, dob, starred FROM patients ORDER BY starred DESC`
  - _Reversed client side after ordering_
4. Create `onClick` for table column                  **blocked**
  1. Parse event for id of column (e.g. id of parent)
  2. Make axios call
    - POST to endpoint w/ desired parameters
