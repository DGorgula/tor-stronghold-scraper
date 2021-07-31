import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './StickyHeadTable.css'

// const useStyles = makeStyles({
//     root: {
//         width: '90%',
//         margin: '0 auto',
//     },
//     container: {
//         maxHeight: 440,
//     },
// });

export default function StickyHeadTable({ data, titles }) {
    // const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div id="table">
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead id="table-head">
                        <TableRow
                            className="table-header"
                        >
                            {titles.map((title, i) => (
                                <TableCell
                                    key={i}
                                    align="center"
                                >
                                    {title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                // <Paste key={i} paste={paste} />
                                <TableRow className="table-row" role="checkbox" tabIndex={-1} key={i}>
                                    {titles.map((title, j) => {
                                        const value = row[title.toLowerCase()];
                                        return (
                                            <TableCell key={j} align="center" maxWidth="20">
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}
