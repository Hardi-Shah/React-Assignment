import React, { useState, useEffect } from "react";
import { getAPIService } from "../Services/APIService";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core";
import { Paper, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '90%',
        margin: 'auto',
        marginTop: 50
    },
    head: {
        backgroundColor: 'darkblue'
    },
    headcolor: {
        color: 'white'
    },
    paper: {
        marginTop: 20,
        width: '100%',
        margin: 'auto',
        marginBottom: 35
    },
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    },
    modalpaper: {
        position: 'absolute',
        width: '560px',
        marginLeft: '456px',
        marginTop: '100px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    search:{
        width: 274, marginTop: '40px', marginRight: 745, borderRadius: 4
    }
}));

export default function PageList() {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await getAPIService()
        setData(result.data.hits);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [search, setSearch] = useState('');

    const filteredProducts = e => {
        setSearch(e.target.value);
    };

    const body = (
        <>
            <TableContainer className={classes.modalpaper} component={Paper} >
                <button style={{ marginLeft: '485px' }}
                    className="btn fa fa-times modalclose"
                    onClick={handleClose}
                >
                </button>
                <p><strong>Your data is:</strong></p>
                <div>
                    {
                        data.map((experience, i) => {
                            return (
                                <div key={experience.title}>
                                    <div>
                                        <p>{experience.title}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </TableContainer>
        </>
    );

    return (
        <div className="container">
            <label>Search:</label>
            <input type='text' className={classes.search} placeholder='Search...' onChange={filteredProducts} />
            <TableContainer className={classes.paper} component={Paper} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow className={classes.head}>
                            <TableCell className={classes.headcolor}>#</TableCell>
                            <TableCell className={classes.headcolor}>Title</TableCell>
                            <TableCell className={classes.headcolor}>URL</TableCell>
                            <TableCell className={classes.headcolor}>Created_At</TableCell>
                            <TableCell className={classes.headcolor}>Author</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {data.filter((val) => {
                            if (search === '') {
                                return val;
                            }
                            else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                            else if (val.author.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                            else if (val.url.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                        })
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={row.title} className={classes.root}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell onClick={handleOpen} >{row.title}</TableCell>
                                    <TableCell onClick={handleOpen}>{row.url}</TableCell>
                                    <TableCell onClick={handleOpen} >{row.created_at}</TableCell>
                                    <TableCell onClick={handleOpen}>{row.author}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
