import React  ,{ useState } from 'react'

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import appStore from "./store";
import appActions from "./Action";
import { store, view } from "@risingstack/react-easy-state";

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
import { set } from 'date-fns';

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
  

 

  var Status = false ;

  function ResetValues(Values) {
        Values.activite=""
      Status= true;
  }
  
  


  const validate = values => {
    const errors = {};
    
    if (!values.activite) {
      errors.activite = 'Required';
    }
    return errors;
  };

  const App = view(() => {
    const classes = useStyles();
    const [success, setsuccess] = useState(Status);
    const [error, seterror] = useState(Status);
  
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
        var x =  axios.post(`http://localhost:8080/Activite/Add`, values);
          if(x== 200){
            ResetValues(values);
            setsuccess(false);
          }
          else seterror(true);
      //  console.log((await x).status)
    };
  
      function Onseccess() {
        setTimeout(function() {setsuccess(false) }, 3000);
        return (<Alert severity="success" >Ajouté avec success</Alert>);  
      }
  
      function OnError() {
        setTimeout(function() {seterror(false) }, 3000);
        return (<Alert severity="error" >Erreur</Alert>);  
      }
      return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <CssBaseline />
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}> 
              { success ? <Onseccess /> : null }
          { error ? <OnError /> : null }
                <Grid container alignItems="flex-start" spacing={2}>
                
                  <Grid item xs={12}>
                    <Field
                      name="activite"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Activite"
                      initialValue={appStore.data[0].id}
                    />
                  </Grid>
                    
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick = {reset}
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
                      disabled={submitting || pristine}
                    >
                      Submit
                    </Button>
                  </Grid>

                </Grid>
              </Paper>

            </form>
          )}
        />
      </div>
        
        );
      });

function Activiteadd(props) {
    
    
   
       return(
         <App/>
       );     
   
  }

export default Activiteadd
