import React  ,{ useState ,Component } from 'react'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import { Form, Field } from 'react-final-form';
import { TextField ,Select } from 'final-form-material-ui';
import appStore from "./store";
import {  view } from "@risingstack/react-easy-state";
import AppConfig from '../../Global';
import axios from 'axios';
import { Paper,Grid,Button, CssBaseline,MenuItem} from '@material-ui/core';



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
        Values.perimetre="";
        
      Status= true;
  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.perimetre) {
      errors.perimetre = 'Required';
    }
    return errors;
  };


  function GetData() {
  try {
      axios.get( AppConfig.API +'Perimetre/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.rows = response.data;   
        }
    });
  } catch (err) {
    
  }
  }

  function GetArea() {
    try {
      axios.get( AppConfig.API +'Area/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.areas = response.data;   
        }
    });
    } catch (err) {
      
    }
  }

  const App = view(() => {
    
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
  
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
       
        if(!appStore.edit){

      try {
        var x =  (await axios.post(AppConfig.API+`Perimetre/Add`, values,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
          
            if(x == 200){
              ResetValues(values);
              setsuccess(true);
              GetData();
              
            }
            else seterror(true);
      } catch (err) {
        
      }
        }
        if(appStore.edit){

       try {
         
            var y =  (await axios.put(AppConfig.API+`Perimetre/Update/`+appStore.data[0].id, values,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
            if(y == 200){
              
              ResetValues(values);
              setsuccess(true);
              appStore.edit=false;
              GetData();
            }
            else seterror(true);
       } catch (err) {
         
       }
         // console.log((values));
        }
       
    };
  
      function Onseccess() {
        setTimeout(function() {setsuccess(false) ;appStore.open=false; }, 2000);
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
                      name="perimetre"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Perimetre"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].perimetre : ""}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="perimetreArea.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Area"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].perimetreArea.id : ""}>

             {appStore.areas ? appStore.areas.map(area => <MenuItem key={area.id} value={area.id}>{area.areadesc}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}

               
                               
                                
                    </Field>
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
        <MyView/>
      </div>
        
        );
      });

      

function PerimetreAdd() {
    
    
   
       return(
         <App/>
       );     
   
  }


  class MyView extends Component {
    componentWillUnmount() {
      
    }
  
    componentDidMount(){
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
       sleep(300);
      GetArea();
      
    }
  
 
    render() {
  
      return (
          <>
            
          </>
      )
  }
  }

export default PerimetreAdd
