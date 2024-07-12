import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

import React, { useState } from "react";
import PropTypes from "prop-types";

const BasicTable = ({ headers, rows, paginated }) => {
  // Add headers to props validation

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page after changing rows per page
  };

  const numOfCols = headers.length;

  const groupedRows = rows.reduce((acc, row, idx) => {
    const rowNum = Math.floor((row.id - 1) / numOfCols);
    if (!acc[rowNum]) acc[rowNum] = { rows: [], idx };
    acc[rowNum].rows.push({ row });
    return acc;
  }, {});

  const paginatedRowsKeys = Object.keys(groupedRows).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                return <TableCell key={header.id}>{header.name}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated === false &&
              Object.keys(groupedRows).map((key) => {
                return (
                  <TableRow key={groupedRows[key].idx}>
                    {groupedRows[key].rows.map(({ row }) => {
                      return <TableCell key={row.id}>{row.data}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            {paginated === true &&
              paginatedRowsKeys.map((key) => (
                <TableRow key={groupedRows[key].idx}>
                  {groupedRows[key].rows.map(({ row }) => (
                    <TableCell key={row.id}>{row.data}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {paginated === true && (
        <TablePagination
          component="div"
          count={Object.keys(groupedRows).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[1, 5, 10]}
        />
      )}
    </>
  );
};

BasicTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      data: PropTypes.node,
    })
  ).isRequired,
  paginated: PropTypes.bool,
};

export default BasicTable;
