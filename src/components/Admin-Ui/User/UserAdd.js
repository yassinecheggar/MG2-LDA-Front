import React  ,{ useState,Component } from 'react'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import { Form, Field } from 'react-final-form';
import { TextField ,Select} from 'final-form-material-ui';
import appStore from "./store";
import {  view } from "@risingstack/react-easy-state";
import AppConfig from '../../Global';
import axios from 'axios';
import { Paper,Grid,Button, CssBaseline,  MenuItem,} from '@material-ui/core';



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
        Values.nom="";
        Values.prenom="";
        Values.email="";
        Values.pwd="";
        Values.prev="";

      Status= true;
  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.nom) {
      errors.nom = 'Required';
    }
    if (!values.prenom) {
        errors.prenom = 'Required';
      }

      if (!values.username) {
        errors.username = 'Required';
      }

      
      
    return errors;
  };


  function GetData() {
    axios.get( AppConfig.API +'User/GetAll', { headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){     
          appStore.rows = response.data;   
      }
  });
  }

  
  function GetRoles() {
    axios.get( AppConfig.API +'Role/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){     
          appStore.roles = response.data;   
      }
  });
  }

  const App = view(() => {
    
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
  
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
        var holder = values.roles.id;
        values.roles= [{"id": holder}];
        

        if(!appStore.edit){

        var x =  (await axios.post(AppConfig.API+`User/Add`, values , { headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
        
          if(x == 200){
            ResetValues(values);
            setsuccess(true);
            GetData();
            
          }
          else seterror(true);
        }
        if(appStore.edit){
        
          var y =  (await axios.put(AppConfig.API+`User/Update/`+appStore.data[0].id, values, { headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
          if(y == 200){
            
            ResetValues(values);
            setsuccess(true);
            appStore.edit=false;
            GetData();
          }
          else seterror(true);
        }
        console.log(values)
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
                
                  <Grid item xs={6}>
                    <Field
                      name="nom"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Nom"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].nom : ""}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      name="prenom"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Prenom"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].prenom : ""}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="username"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="username"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].username : ""}
                    />
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Field
                      name="password"
                      fullWidth
                      required
                      component={TextField}
                      type="password"
                      label="Password"
                     
                    />
                  </Grid>
                    

                 <MyView/>
                    
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

      

function UserAdd() {
    
       return(
         <App/>
       );     
  }

  class MyView extends Component {
    componentWillUnmount() {
       
    }
    componentDidMount(){
      GetRoles();
    }
  
    render() { return (  <> 

                  <Grid item xs={6}>
                    <Field
                      name="roles.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Role"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].roles[0].id : ""}>
                                {appStore.roles ? appStore.roles.map(rol => <MenuItem key={rol.id} value={rol.id}>{rol.name}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}
                   
                    </Field>
                  </Grid>
     </> )
     }
  }

export default UserAdd
