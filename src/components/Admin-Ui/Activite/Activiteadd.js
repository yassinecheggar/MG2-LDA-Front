import React  ,{ useState } from 'react'

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';

import axios from 'axios';

import {
    Paper,
    Grid,
    Button,
    CssBaseline,
    Hidden,
  } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "500px",
      width: "800px",
    }
  }));
  

 
  const onSubmit =  async values   => {
     
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    values.id = 0;
    //axios.post(`http://localhost:8080/Activite/Add`, values)
    window.alert(JSON.stringify(values, 0, 2));
   
  };

  


  const validate = values => {
    const errors = {};
    
    if (!values.activite) {
      errors.activite = 'Required';
    }
    return errors;
  };

  

function Activiteadd(props) {
    const classes = useStyles();
    const [myState, setMyState] = useState(props);

    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);

    function Notfication() {
        if(success)
            return (<Alert severity="success" >Ajouté avec success</Alert>);

        if(error)
         return ( <Alert severity="error">Erreur</Alert>);
    
            }

            function clearState() {
                setMyState.activite("")
              
            }
    return (
        
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <CssBaseline />
        
        
        {Notfication()}
     
       
     
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
                      value={myState.activite}
                    />
                  
                  </Grid>
                
                
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick = {values.activite=""}
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
