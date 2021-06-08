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
        Values.decsiption="";
        Values.date="";
        Values.phase="";
        Values.status="";
        Values.problemType="";

        Values.delivrableQuest.id="";

        Values.activiteQuest.id="";

        Status= true;

  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.decsiption) {
      errors.decsiption = 'Required';
    }
    return errors;
  };


  function GetData() {
    axios.get( AppConfig.API +'Question/GetAll').then(response  =>{
  
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
        values.date = format(appStore.date, "yyyy-MM-dd") ;
            try {
              
            
        if(!appStore.edit){

        var x =  (await axios.post(AppConfig.API+`Question/Add`, values)).status;
        
          if(x == 200){
            ResetValues(values);
            setsuccess(true);
            GetData();
            
          }
          else seterror(true);
        }
        if(appStore.edit){
        
          var y =  (await axios.put(AppConfig.API+`Question/Update/`+appStore.data[0].id, values)).status;
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
                      name="decsiption"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Decsiption"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].decsiption : ""}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field 
                    name="date"
                    name="rendez-vous"
                 
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

                  <Grid item xs={6}>
                    <Field
                      name="status"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="statut"
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].status : ""}
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

   

function QuestionAdd() {
    
    
   
       return(
         <App/>
       );     
   
  }

  class MyView extends Component {
    componentWillUnmount() {
       
    }
  
    componentDidMount(){
    if(appStore.data[0]){
     initDate = new Date(appStore.data[0].date)
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
                      name="activiteQuest.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Activité"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].activiteQuest.id : ""}>

             {appStore.acitivite ? appStore.acitivite.map(act => <MenuItem key={act.id} value={act.id}>{act.activite}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}

               
                               
                                
                    </Field>
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Field
                      name="delivrableQuest.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Perimetre"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].delivrableQuest.id : ""}>

             {appStore.delivrable ? appStore.delivrable.map(del => <MenuItem key={del.id} value={del.id}>{del.delivrable}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}

               
                               
                                
                    </Field>
                  </Grid>
          </>
      )
  }
  }

export default QuestionAdd
