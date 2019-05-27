import React from 'react';
import * as PropTypes from 'prop-types'; // * as because of default export being undefined.
import DataTableClickableCell from "./DataTableClickableCell";
import { TableCell } from "@material-ui/core";

class DataTableCell extends React.Component {
    render() {
        const {colName, colValue, rowIndex, handleMapsClick, handleDeleteRow} = this.props;

        if(colName === 'location_coordinates') {
            return <DataTableClickableCell
                handleClickFunc={handleMapsClick}
                rowIndex={rowIndex}
                icon={'OpenInBrowserSharp'}>
            </DataTableClickableCell>
        } else if(colName === 'delete') {
            return <DataTableClickableCell
                handleClickFunc={handleDeleteRow}
                rowIndex={rowIndex}
                icon={'Delete'}>
            </DataTableClickableCell>
        } else {
            return <TableCell>{colValue}</TableCell>
        }
    }
}

DataTableCell.propTypes = {
  colName: PropTypes.string.isRequired,
  colValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
  ]).isRequired,
  rowIndex: PropTypes.number.isRequired,
  handleMapsClick: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired
};

export default DataTableCell;