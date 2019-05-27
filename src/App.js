import React, { Component } from 'react';
import './App.css';
import DataTable from './DataTable/DataTable';
import { Grid } from '@material-ui/core';

class App extends Component {
  render() {
    return (

      <div className="App">
        <div className='DataTable-container'>
        <Grid container spacing={24}>
            <Grid item xs={12}>
              <DataTable/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
