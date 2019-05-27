import React from 'react';
import {Toolbar, Typography, Input, InputAdornment} from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import * as PropTypes from 'prop-types';
import withStyles from "@material-ui/core/es/styles/withStyles";

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.secondary.light,
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
        flex: '0 0 auto'
    },
    title: {
        flex: '0 0 auto',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class TableToolbarWithFilter extends React.Component {
    render() {
        const { classes, onFilterChange } = this.props;

        return (
            <Toolbar>
                <div className={classes.title}>
                    <Typography variant="h6" id="tableTitle">
                        Latest Jobs from JobFeed
                    </Typography>
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    <Input id="standard-search"
                               placeholder="Filter Table"
                               type="search"
                               className={classes.textField}
                               margin="none"
                               onChange={onFilterChange}
                               startAdornment ={
                                   <InputAdornment position="start">
                                       <FilterListIcon/>
                                   </InputAdornment>
                               }
                               />
                </div>
            </Toolbar>
        );
    }
}

TableToolbarWithFilter.propTypes = {
    classes: PropTypes.object,
    onFilterChange: PropTypes.func.isRequired
};

const TableToolbar = withStyles(toolbarStyles)(TableToolbarWithFilter);

export default TableToolbar;