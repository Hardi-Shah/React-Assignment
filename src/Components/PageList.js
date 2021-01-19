import React, { useState, useEffect } from "react";
import { getAPIService } from "../Services/APIService";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core";
import {Paper } from '@material-ui/core';

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
        marginTop: 102,
        width: '80%',
        margin: 'auto'
    },
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}));

export default function PageList() {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const result = await getAPIService()
        setCategories(result.data);

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

    return (
        <div className="container">
            <TableContainer className={classes.paper} component={Paper} >
                {/* <Link className="btn btn-outline-primary AddCategory" to="/categories/add">Add Category</Link> */}
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow className={classes.head}>
                            <TableCell className={classes.headcolor}>#</TableCell>
                            <TableCell className={classes.headcolor}>Name</TableCell>
                            <TableCell className={classes.headcolor}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((category, index) => (
                                <TableRow key={category.id} className={classes.root}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell >{category.title}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>        
        </div>
    );
}
