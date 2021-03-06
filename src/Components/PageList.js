import React, { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { apiurl } from "../Services/APIService";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core";
import { Paper, Modal } from '@material-ui/core';
import axios from "axios";

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
        marginBottom: 35,
        boxShadow: theme.shadows[5],
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
    labelsearch: {
        marginLeft: -338
    },
    labeltitle: {
        marginLeft: -270
    },
    search: {
        width: 274, marginTop: '40px', marginRight: 288, borderRadius: 4
    },
    titledropdown: {
        width: 230, marginTop: '0px', marginRight: 14, borderRadius: 4
    },
    Created_atdropdown: {
        width: 230, marginTop: '0px', marginRight: -340, borderRadius: 4
    },
    dataEnd:{
        opacity:0
    }
}));

export default function PageList() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const currentPage = useRef();
    const [nbpages, setNbpages] = useState(true);
    const [lastElementInsideTableForCheckingVisibilityRef,
        isLastElementInsideTableVisible] = useInView();

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (isLastElementInsideTableVisible && data && data.length > 0 && nbpages) {
            loadData();
        }
    }, [isLastElementInsideTableVisible]);

    useEffect(() => {
        let interval;
        if (nbpages) {
            interval = setInterval(() => {
                loadData();
            }, 10000)
        }
        return () => clearInterval(interval)
    }, [data]);

    const loadData = () => {
        const pageno = currentPage.current ? currentPage.current : 0;
        currentPage.current = pageno + 1;
        axios.get(apiurl + pageno)
            .then(result => {
                setData([...data, ...result.data.hits])
                if (pageno >= result.data.nbPages) {
                    setNbpages(false);
                }
            })
    };

    const dataEnd = useCallback(
        (node) => {
            lastElementInsideTableForCheckingVisibilityRef(node);
        }, [lastElementInsideTableForCheckingVisibilityRef]
    );

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [search, setSearch] = useState('');
    const [row, setRow] = useState('');

    const filteredProducts = e => {
        setSearch(e.target.value);
    };

    const ModalPopUp = (
        <>
            <TableContainer className={classes.modalpaper} component={Paper} >
                <button style={{marginLeft:'485px'}}
                    className="btn fa fa-times modalclose"
                    onClick={handleClose}
                >
                </button>
                <p><strong>Your data is:</strong></p>
                <div>
                    {JSON.stringify({
                        "current title is ": row.title, "current url is ": row.url, "current created_at is ": row.created_at, "current author is ": row.author
                    })}
                </div>
            </TableContainer>
        </>
    );

    return (
        <div className="container">
            <label className={classes.labelsearch}>Search:</label>
            <input type='text' className={classes.search} placeholder='Search...' onChange={filteredProducts} />

            <label className={classes.labeltitle}>Search by Title:</label>
            <select name='selectTitle' className={classes.titledropdown} onChange={filteredProducts}>
                <option value=''>Select Title</option>
                {data.map((option, index) => {
                    return (
                        <option key={index} value={option.title}>
                            {option.title}
                        </option>
                    )
                })}
            </select>

            <label>Search by Created_At:</label>
            <select name='selectOption' className={classes.Created_atdropdown} onChange={filteredProducts}>
                <option value=''>Select Created_At </option>
                {data.map((option, index) => {
                    return (
                        <option key={index} value={option.created_at}>
                            {option.created_at}
                        </option>
                    )
                })}
            </select>

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
                            else if (val.title?.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                            else if (val.author?.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                            else if (val.url?.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                            else if (val.created_at?.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                            else {
                                return false;
                            }
                        })
                            .map((item, index) => (
                                <TableRow key={index} className={classes.root} onClick={() => { setRow(item); handleOpen(); }}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.url}</TableCell>
                                    <TableCell>{item.created_at}</TableCell>
                                    <TableCell>{item.author}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div ref={dataEnd} className={classes.dataEnd}>End of Result</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {ModalPopUp}
            </Modal>
        </div>
    );
}
