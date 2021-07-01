import React  ,{ useState ,Component } from 'react'

import Alert from '@material-ui/lab/Alert';
import { Form, Field } from 'react-final-form';
import { Select} from 'final-form-material-ui';
import appStore from "./store";
import {  view } from "@risingstack/react-easy-state";
import AppConfig from '../../Global';
import axios from 'axios';
import { Paper,Grid,Button, CssBaseline,MenuItem} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';


import {  KeyboardDatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';





  function ResetValues(Values) {
        Values.dateModification="";
        Values.userMod="";
        

  }
  
  const validate = values => {
    const errors = {};
    
    
    return errors;
  };


  function GetData() {
    try {
      axios.get( AppConfig.API +'Modif/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.rows = response.data;   
        }
    });
    } catch (err) {
      
    }
  }

  function GetUser() {
   try {
      axios.get( AppConfig.API +'User/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.User = response.data;   
        }
    });
   } catch (err) {
     
   }
  }

  function GetDocument() {
    try {
      axios.get( AppConfig.API +'Document/GetAll' ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.Doc = response.data;   
        }
    });
    } catch (err) {
      
    }
  }
  GetDocument();
  GetUser();
    
  var initDate ; 
  const App = view(() => {
    
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(initDate);
    const handleDateChange = (date) => {

      setSelectedDate(date);
      appStore.date= date;
     
    };
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
        
        try {
            
        if(selectedDate){
        values.dateModification =format(new Date( selectedDate), 'yyyy-MM-dd');
            }else {
               setSelectedDate(new Date());
            }
       
     

        if(!appStore.edit){
        values.date =  format(new Date(), "yyyy-MM-dd") ;
        
        var x =  (await axios.post(AppConfig.API+`Modif/Add`, values ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
        
          if(x == 200){
            ResetValues(values);
            setsuccess(true);
            GetData();
          
            
          }
          else seterror(true);
        }
        if(appStore.edit){
            if(appStore.date){values.validationDate = format(appStore.date, "yyyy-MM-dd")  }else values.validationDate="";
            values.date=appStore.data[0].date; 
          var y =  (await axios.put(AppConfig.API+`Modif/Update/`+appStore.data[0].id, values ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
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
                

               
                  <Grid item xs={12}>
                    <Field 
                    name="dateModification"
                   
                 
                    render={props => {
                     // console.log(props); /* input and meta objects */
                      
                      return  <MuiPickersUtilsProvider utils={DateFnsUtils}> <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="yyyy-MM-dd"
                      
                      value={selectedDate }
                      onChange={handleDateChange}
                      required
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

      

function ModificationAdd() {
    
    
   
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
      
      GetUser();
      GetDocument();

      //  console.log( appStore.data[0].date)
    }
  
 
    render() {
  
      return (
          <>
                
                <Grid item xs={12}>
                    <Field
                      name="userMod.id"
                      fullWidth
                      required
                      component={Select}
                      
                      type="Text"
                      label="User"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].userMod? appStore.data[0].userMod.id : "") : ""}>

             {appStore.User ? appStore.User.map(act => <MenuItem key={act.id} value={act.id}>{act.nom +" " + act.prenom}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}

               
                               
                                
                    </Field>
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Field
                      name="documentMod.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Document"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].documentMod ? appStore.data[0].documentMod.id : ""):""}>

             {appStore.Doc ? appStore.Doc.map(del => <MenuItem key={del.id} value={del.id}>{del.ref + " " +del.nom }</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}

               
                               
                                
                    </Field>
                  </Grid>
          </>
      )
  }
  }
  

export default ModificationAdd
