import React from 'react';
import axios from 'axios';
import {Table, TableBody, TablePagination, Paper,
    LinearProgress, Fade} from '@material-ui/core';
import TableHeadWithSort from './components/TableHeadWithSort';
import TableToolbar from './components/TableToolbarWithFilter';
import DataTableRow from './components/DataTableComponents/DataTableRow';
import MapsDialog from './components/MapsDialog';
import ConfirmationDialog from './components/ConfirmationDialog';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cols: [],
            sort: 'asc',
            sortBy: 'job_title',
            rowsPerPage: 10,
            page: 0,
            showLoader: false,
            filterBy: '',
            mapsDialogOpen: false,
            mapsDialogLocation: {
                lat: 0,
                lng: 0
            },
            confirmationDialogOpen: false,
            selectedRowIndexToDelete: -1
        };
    }

    render () {
        return (
            <div>
                <Paper>
                    <TableToolbar onFilterChange={this.handleFilterChange}/>
                    <Fade
                        in={this.state.showLoader}
                        unmountOnExit>
                        <LinearProgress />
                    </Fade>
                    <Table>
                        <TableHeadWithSort sort={this.state.sort}
                                           sortBy={this.state.sortBy}
                                           onRequestSort={this.handleRequestSort}
                                           cols={this.state.cols}/>
                        <TableBody>
                            {this.getCurrentPageData()
                                .map((row, index) => {
                                    return <DataTableRow key={index}
                                                         colNames={this.state.cols}
                                                        row={row}
                                                        handleDeleteRow={this.handleDeleteRow}
                                                        handleMapsClick={this.handleMapsClick}>

                                    </DataTableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                    <TablePagination rowsPerPageOptions={[10, 25, 50]}
                                     component='div'
                                     count={this.getCurrentPageData(false).length}
                                     rowsPerPage={this.state.rowsPerPage}
                                     page={this.state.page}
                                     backIconButtonProps={{
                                         'aria-label': 'Previous Page',
                                     }}
                                     nextIconButtonProps={{
                                         'aria-label': 'Next Page',
                                     }}
                                     onChangePage={this.handleChangePage}
                                     onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                </Paper>
                <MapsDialog open={this.state.mapsDialogOpen} location={this.state.mapsDialogLocation}
                            onClose={this.handleMapsModalClose}/>
                <ConfirmationDialog open={this.state.confirmationDialogOpen} onClose={this.handleConfirmModalClose}
                                    onApprove={this.handleConfirmModalApprove}/>
            </div>
        )
    }

    handleRequestSort = (event, property) => {
        const sortBy = property;
        const sort = this.state.sortBy === property && this.state.sort === 'desc' ? 'asc' : 'desc';

        this.setState({ sort, sortBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleMapsClick = (event, index) => {
        const data = this.state.data[(this.state.page * this.state.rowsPerPage) + index];
        if(data) {
            this.setState({
                mapsDialogLocation: {
                    lat: parseFloat(data.location_coordinates[0]),
                    lng: parseFloat(data.location_coordinates[1])
                }
            });
            this.setState({
                mapsDialogOpen: true
            });
        }
    };

    handleDeleteRow = (event, index) => {
        this.setState({
            selectedRowIndexToDelete: index,
            confirmationDialogOpen: true
        });
    };

    handleConfirmModalApprove = event => {
        if(this.state.selectedRowIndexToDelete > -1) {
            const newData = [...this.getCurrentPageData(false)];
            const deleteIndex = newData.findIndex(row => row.id === this.state.selectedRowIndexToDelete);
            newData.splice(deleteIndex, 1);
            this.setState({
                data: newData,
                selectedRowIndexToDelete: -1,
                confirmationDialogOpen: false
            })
        }
    };

    handleConfirmModalClose = event => {
        this.setState({
            confirmationDialogOpen: false,
            selectedRowIndexToDelete: -1
        });
    };

    handleMapsModalClose = event => {
        this.setState({
            mapsDialogOpen: false
        })
    };

    handleFilterChange = event => {
        this.setState({
            filterBy: event.currentTarget.value
        });
    };

    getCurrentPageData(withSlice = true) {
        if(!withSlice) {
            return this.stableSort(this.state.data, this.getSorting(this.state.sort, this.state.sortBy));
        }
        const sorted = this.stableSort(this.filterData(), this.getSorting(this.state.sort, this.state.sortBy));
        return sorted.slice(this.state.page * this.state.rowsPerPage,
            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage);
    };

    stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    filterData() {
        if(this.state.filterBy) {
            const filterText = this.state.filterBy.toUpperCase();
            return this.state.data.filter(row => {
                const orgMatch = row.organization_name ? row.organization_name.toUpperCase().includes(filterText) : false;
                const jobMatch = row.job_title ? row.job_title.toUpperCase().includes(filterText) : false;
                return orgMatch || jobMatch;
            });
        }
        return this.state.data;
    }

    getTableData() {
        this.setState({showLoader: true});
        axios.get('https://cors-anywhere.herokuapp.com/https://us.jobfeed.com/data/info-recent-jobs').then(response => {
            const stateObj = {
                data: [],
                cols: []
            };
            stateObj.data = response.data.map((item, index) => {
                return {
                    ...item,
                    id: index,
                };
            });
            stateObj.cols = [
                {
                    header: "Job Title",
                    name: "job_title"
                },
                {
                    header: "Organization Name",
                    name: "organization_name"
                },
                {
                    header: "Location",
                    name: "location_coordinates"
                },
                {
                    header: 'Delete',
                    name: 'delete'
                }
            ];
            this.setState(stateObj);
        }).then(() => {
            this.setState({showLoader: false});
        });
    }

    componentWillMount() {
        this.getTableData();
    }
}

export default DataTable;