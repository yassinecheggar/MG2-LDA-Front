import React  ,{ useState ,Component } from 'react'

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
import { Apps, ControlCameraSharp } from '@material-ui/icons';




  function ResetValues(Values) {
        Values.feedback="";
        Values.activiteFeed="";
        Values.date="";
        Values.validationDate="";
        Values.phase="";

        Values.problemType="";
  


  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.feedback) {
      errors.feedback = 'Required';
    }
    return errors;
  };


  function GetData() {
  try {
      axios.get( AppConfig.API +'Feedback/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.rows = response.data;   
        }
    });
  } catch (err) {
    
  }
  }

  function GetDelivrable() {
   try {
      axios.get( AppConfig.API +'Delivrable/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.delivrable = response.data;   
        }
    });
   } catch (err) {
     
   }
  }

  function GetActivite() {
  try {
      axios.get( AppConfig.API +'Activite/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.acitivite = response.data;   
        }
    });
  } catch (err) {
    
  }
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
        
        values.userFeedback={"id":window.sessionStorage.getItem("user")};
     

        if(!appStore.edit){
        try {
          values.date =  format(new Date(), "yyyy-MM-dd") ;
          
          var x =  (await axios.post(AppConfig.API+`Feedback/Add`, values ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
          
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
              if(appStore.date){values.validationDate = format(appStore.date, "yyyy-MM-dd")  }else values.validationDate="";
              values.date=appStore.data[0].date; 
            var y =  (await axios.put(AppConfig.API+`Feedback/Update/`+appStore.data[0].id, values,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
            if(y == 200){
              
              ResetValues(values);
              setsuccess(true);
              appStore.edit=false;
              GetData();
            }
            else seterror(true);
           } catch (err) {
             
           }
        }
      //  console.log((await x).status)
      console.log(values)
    };
  
      function Onseccess() {
        setTimeout(function() {setsuccess(false) ;appStore.open=false; }, 2000);
        return (<Alert severity="success" >Ajout?? avec success</Alert>);  
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
                      name="problemType"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="ProblemType"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].problemType : ""}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="feedback"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Feedback"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].feedback : ""}
                    />
                  </Grid>

                  <Grid item xs={6}>
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
                 
                  <Grid item xs={12}>
                    <Field 
                    name="date"
                    
                 
                    render={props => {
                     // console.log(props); /* input and meta objects */
                      
                      return  <MuiPickersUtilsProvider utils={DateFnsUtils}> <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="yyyy-MM-dd"
                      
                      value={selectedDate}
                      onChange={handleDateChange}
                        disableOpenOnEnter
                        animateYearScrolling={false}
                        autoOk={true}
                        clearable
                    /></MuiPickersUtilsProvider>;
                    }} />
                      
                      
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

      

function FeedBackAdd() {
    
    
   
       return(
         <App/>
       );     
   
  }


  
  class MyView extends Component {
    componentWillUnmount() {
       
    }
  
    componentDidMount(){
    

    if(appStore.data[0]){
     initDate = new Date(appStore.data[0].validationDate);
     appStore.date= initDate;
    }else initDate = null;
      
      GetActivite();
      GetDelivrable();

      //  console.log( appStore.data[0].date)
    }
  
 
    render() {
  
      return (
          <>
                
                <Grid item xs={12}>
                    <Field
                      name="activiteFeed.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Activit??"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].activiteFeed? appStore.data[0].activiteFeed.id : "") : ""}>

             {appStore.acitivite ? appStore.acitivite.map(act => <MenuItem key={act.id} value={act.id}>{act.activite}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}

               
                               
                                
                    </Field>
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Field
                      name="delivrableFeed.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Perimetre"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].delivrableFeed ? appStore.data[0].delivrableFeed.id : ""):""}>

             {appStore.delivrable ? appStore.delivrable.map(del => <MenuItem key={del.id} value={del.id}>{del.delivrable}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}

               
                               
                                
                    </Field>
                  </Grid>
          </>
      )
  }
  }
  

export default FeedBackAdd
