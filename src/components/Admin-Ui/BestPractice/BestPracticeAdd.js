import React  ,{ useState ,Component } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import { Form, Field } from 'react-final-form';
import { TextField ,Select} from 'final-form-material-ui';
import appStore from "./store";
import {  view } from "@risingstack/react-easy-state";
import AppConfig from '../../Global';
import axios from 'axios';
import { Paper,Grid,Button, CssBaseline,MenuItem} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';


import {  KeyboardDatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
import { date } from 'faker';

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
        Values.description="";
      
        Values.categorie="";
        Values.phase= "";
        Status= true;

  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.description) {
      errors.description = 'Required';
    }

      
    if (!values.phase) {
        errors.phase = 'Required';
      }

        
    if (!values.categorie) {
        errors.categorie = 'Required';
      }

        
   
    return errors;
  };


  function GetData() {
    axios.get( AppConfig.API +'BestPractice/GetAll').then(response  =>{
  
      if(response.data){     
          appStore.rows = response.data;   
      }
  });
  }

  function GetDelivrable() {
    axios.get( AppConfig.API +'Delivrable/GetAll').then(response  =>{
  
      if(response.data){     
          appStore.delivrable = response.data;   
      }
  });
  }

  function GetActivite() {
    axios.get( AppConfig.API +'Activite/GetAll').then(response  =>{
  
      if(response.data){     
          appStore.acitivite = response.data;   
      }
  });
  }
  GetActivite();
  GetDelivrable();
    
  var initDate ; 
  const App = view(() => {
    
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(initDate);
    const handleDateChange = (date) => {
      setSelectedDate(date);
      appStore.date= date;
      //console.log(appStore.date);
    };
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
        
            try {
              
            
        if(!appStore.edit){
         values.date =  format(new Date(), "yyyy-MM-dd") ;
        var x =  (await axios.post(AppConfig.API+`BestPractice/Add`, values)).status;
        
          if(x == 200){
            ResetValues(values);
            setsuccess(true);
            GetData();
            
          }
          else seterror(true);
        }
        if(appStore.edit){
        
          var y =  (await axios.put(AppConfig.API+`BestPractice/Update/`+appStore.data[0].id, values)).status;
          if(y == 200){
            
            ResetValues(values);
            setsuccess(true);
            appStore.edit=false;
            GetData();
          }
          else seterror(true);
        }

      } catch (error) {
              console.log(error)
      }
      
      //  console.log((await x).status)
      console.log(values);
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
                

                <MyView/>


                  <Grid item xs={12}>
                    <Field
                      name="description"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Description"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].description : ""}
                    />
                  </Grid>

                  
                      
      

                 

                  <Grid item xs={12}>
                    <Field
                      name="categorie"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Categorie"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].categorie : ""}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="phase"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Phase"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].phase : ""}
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

   

function BestPracticeAdd() {
    
    
   
       return(
         <App/>
       );     
   
  }

  class MyView extends Component {
    componentWillUnmount() {
       
    }
  
    componentDidMount(){
    if(appStore.data[0]){
     initDate = new Date(appStore.data[0].date);
     appStore.date= initDate;
    }
      
      GetActivite();
      GetDelivrable();

      //  console.log( appStore.data[0].date)
    }
  
 
    render() {
  
      return (
          <>
                
                <Grid item xs={12}>
                    <Field
                      name="activiteBest.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Activité"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].activiteBest? appStore.data[0].activiteBest.id : "") : ""}>

                      {appStore.acitivite ? appStore.acitivite.map(act => <MenuItem key={act.id} value={act.id}>{act.activite}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}
         
                               
                                
                    </Field>
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Field
                      name="delivrableBest.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Perimetre"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].delivrableBest ? appStore.data[0].delivrableBest.id : ""):""}>

                      {appStore.delivrable ? appStore.delivrable.map(del => <MenuItem key={del.id} value={del.id}>{del.delivrable}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}
         
               
                               
                                
                    </Field>
                  </Grid>
          </>
      )
  }
  }

 

export default BestPracticeAdd
