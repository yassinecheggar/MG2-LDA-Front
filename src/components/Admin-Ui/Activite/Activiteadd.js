import React from 'react'

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import Hidden from '@material-ui/core/Hidden';

import {
    Paper,
    Grid,
    Button,
    CssBaseline,
  } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({

    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "500px",
      width: "800px",
    }
  }));
  

 
  const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    values.id = "null";
    window.alert(JSON.stringify(values, 0, 2));
  };


  const validate = values => {
    const errors = {};
    
    if (!values.activite) {
      errors.activite = 'Required';
    }
    return errors;
  };
function Activiteadd() {
    const classes = useStyles();
    return (
        
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <CssBaseline />
        
        <Form
          onSubmit={onSubmit}
          
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}> 
                <Grid container alignItems="flex-start" spacing={2}>
                
                  <Grid item xs={12}>
                    <Field
                      name="activite"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Activite"
                    />
                  </Grid>
                
                
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
             {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */} 
            </form>
          )}
        />
      </div>
        
    )
}

export default Activiteadd
