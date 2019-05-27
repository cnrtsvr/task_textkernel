import React from 'react';
import {TableHead, TableRow, TableCell, Tooltip, TableSortLabel} from '@material-ui/core';
import * as PropTypes from 'prop-types';

class TableHeadWithSort extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { sort, sortBy, cols } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {cols.map(
                        col => {
                            if(col.name !== 'delete' && col.name !== 'location_coordinates') {
                                return <TableCell
                                        key={col.name}
                                        sortDirection={sortBy === col.name ? sort : false}
                                    >
                                    <Tooltip
                                        title="Sort"
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={sortBy === col.name}
                                            direction={sort}
                                            onClick={this.createSortHandler(col.name)}
                                        >
                                            {col.header}
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                            } else {
                                return <TableCell key={col.name}>
                                    {col.header}
                                </TableCell>
                            }
                        },
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

TableHeadWithSort.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    cols: PropTypes.array.isRequired
};

export default TableHeadWithSort;