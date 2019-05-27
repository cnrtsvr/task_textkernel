import React from 'react';
import {IconButton, TableCell} from "@material-ui/core";
import {OpenInBrowserSharp, DeleteSharp, WarningSharp} from "@material-ui/icons";
import * as PropTypes from 'prop-types'; // * as because of default export being undefined.


class DataTableClickableCell extends React.Component {
    render() {
        const { handleClickFunc, rowIndex, icon } = this.props;
        if(icon === 'OpenInBrowserSharp') {
            return <TableCell>
                <IconButton onClick={e => handleClickFunc(e, rowIndex)} color="primary" component="span">
                    <OpenInBrowserSharp />
                </IconButton>
            </TableCell>
        } else if(icon === 'Delete') {
            return <TableCell>
                <IconButton onClick={e => handleClickFunc(e, rowIndex)} color="primary" component="span">
                    <DeleteSharp />
                </IconButton>
            </TableCell>
        } else {
            return <TableCell>
                <WarningSharp/>
            </TableCell>
        }
    }
}

DataTableClickableCell.propTypes = {
  handleClickFunc: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired
};

export default DataTableClickableCell;