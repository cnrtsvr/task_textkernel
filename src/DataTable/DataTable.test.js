import React from 'react';
import DataTable from './DataTable';
import { mount } from 'enzyme';
import testData from './testData';
import TableToolbar from './components/TableToolbarWithFilter';
import TableHeadWithSort from './components/TableHeadWithSort';
import {Table, TableBody, TableCell, TableRow, TablePagination} from '@material-ui/core';
import {OpenInBrowserSharp, Delete} from '@material-ui/icons'


describe('DataTable', () => {
    it('rendered table correctly according to columns and data arrays', () => {
        const cols = testData.cols;
        const data = testData.data;

        const container = mount(<DataTable/>);

        // ToDo: If able to, find a solution to that Babel and CRA Jest problem that makes it
        //  impossible to run jest tests with import syntax.

        // TableToolbar rendered and only once
        const toolbar = container.find(TableToolbar);
        expect(toolbar).toHaveLength(1);


        // Table rendered and only once
        const table = container.find(Table);
        expect(table).toHaveLength(1);

        // TableHeadWithSort rendered and only once
        const thead = table.find(TableHeadWithSort);
        expect(thead).toHaveLength(1);

        // Headers' count equals to cols array
        const headers = thead.find(TableCell);
        expect(headers).toHaveLength(cols.length);

        // Headers' texts are correct
        headers.forEach((th, index) => {
            expect(th.text()).toEqual(cols[index].header);
        });

        // TableBody rendered and only once
        const tbody = table.find(TableBody);
        expect(tbody).toHaveLength(1);

        // Set pagination to 25
        const pagination = tbody.find(TablePagination);
        pagination.simulate('change', {
            target: {
                value: 25
            }
        });

        // Rows' count is equal to data array
        const rows = tbody.find(TableRow);
        expect(rows).toHaveLength(25);

        // Check if cells rendered correctly
        const cellKeys = cols.map(col => {
            return col.name;
        });
        rows.forEach((tr, index) => {
            const cells = tr.find(TableCell);
            // Cell count is correct
            expect(cells).toHaveLength(cellKeys.length + 1);

            // Cell texts are correct
            cells.forEach((td, idx) => {
                if(idx === 2) {
                    const icon = td.find(OpenInBrowserSharp);
                    expect(icon).toHavelength(1);
                } else if(idx === 3) {
                    const icon = td.find(Delete);
                    expect(icon).toHaveLength(1);
                } else {
                    expect(td.text()).toEqual(data[index][cellKeys[idx]]);
                }
            });
        });
    });
});
