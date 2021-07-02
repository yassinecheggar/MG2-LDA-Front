import React  ,{ useState ,Component } from 'react'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import { Form, Field } from 'react-final-form';
import { TextField ,Select} from 'final-form-material-ui';
import appStore from "./store";
import {  view } from "@risingstack/react-easy-state";
import AppConfig from '../../Global';
import axios from 'axios';
import { Paper,Grid,Button, CssBaseline,MenuItem,IconButton} from '@material-ui/core';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Typography from "@material-ui/core/Typography";
import SendIcon from '@material-ui/icons/Send';
import {default as MytextField} from "@material-ui/core/TextField";
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';


import {  KeyboardDatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
import { Apps, ControlCameraSharp } from '@material-ui/icons';
import appActions from './Action';

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
    },
    button: {
      marginRight: theme.spacing(1)
    },
    completed: {
      display: "inline-block"
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }));
 
  
  function getSteps() {
    return ["Select campaign settings", "Create an ad group", "Create an ad"];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return "Step 1: add Feedback";
      case 1:
        return "Step 2: add Solution ";
      
      default:
        return "Unknown step";
    }
  }
  var Status = false ;

  function ResetValues(Values) {
        Values.feedback="";
        Values.activiteFeed="";
        Values.date="";
        Values.validationDate="";
        Values.phase="";

        Values.problemType="";
  


      Status= true;
  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.feedback) {
      errors.feedback = 'Required';
    }
    return errors;
  };


  function GetData() {
    axios.get( AppConfig.API +'Feedback/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){     
          appStore.rows = response.data;   
      }
  });
  }

  function GetDelivrable() {
    axios.get( AppConfig.API +'Delivrable/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){     
          appStore.delivrable = response.data;   
      }
  });
  }

  function GetActivite() {
    axios.get( AppConfig.API +'Activite/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){     
          appStore.acitivite = response.data;   
      }
  });
  }
  GetActivite();
  GetDelivrable();
    

  const App = view(() => {
      return (
        
        <div style={{ padding: 16, margin: 'auto',width:'50%'}}>
        <Paper  style={{overflow:'auto',maxHeight:'90vh'}}>
          <h2 style={{textAlign:'center', marginTop:30 ,  color:'chocolate'}}>Ajouter un FeedBack </h2>
          <div style={{display:'flex',justifyContent:'center'}}>
                <Stepper  nonLinear activeStep={appStore.activeStep} style={{width:'50%' }}>
                
                <Step key="1" completed={appStore.completed}>
                  <StepButton   > step 1 </StepButton>
                </Step>

                <Step key="2">
                  <StepButton > step 2 </StepButton>
                </Step>
                
                </Stepper>

        </div>
        <CssBaseline />

         {appStore.StepperOne ? <Stepone/> : <Steptwo/> }
         </Paper>
        </div>
        );
      });

  const Stepone = view(() => {

    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    
   
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
        
       
     try {
     
        values.date =  format(new Date(), "yyyy-MM-dd") ;
        values.userFeedback={"id":window.sessionStorage.getItem("user")};
        await axios.post(AppConfig.API+`Feedback/Add`, values,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(res=>{

        if(res.data!=null){  

         
         
          GetData();
          appStore.ResId=res.data;
          //GetReponse(appStore.ResId);
          ResetValues(values);
          appActions.handleStepperone();
          
        }
        else seterror(true);
       })
        
          
        
     } catch (error) {
          seterror(true);
     }

       
        
      console.log(values)
    };
  
      function Onseccess() {
        setTimeout(function() {setsuccess(false)  }, 2000);
        return (<Alert severity="success" >Ajouté avec success</Alert>);  
      }
  
      function OnError() {
        setTimeout(function() {seterror(false) }, 3000);
        return (<Alert severity="error" >Erreur</Alert>);  
      }
      return (

        
        <>
        
       
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
                      component={Select}
                      type="Text"
                      label="Probleme"
                      formControlProps={{ fullWidth: true }}
                     >

                           <MenuItem key="1" value="Outil"> Incident</MenuItem>
                           <MenuItem key="2" value="Metier">Anomalie</MenuItem>
                           <MenuItem key="3" value="Point bloqant Urgent">Point bloqant</MenuItem>
                          
                           <MenuItem key="5" value="Autre">Autre</MenuItem>
                    </Field>
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
      </>
        

  )})

  const Steptwo = view(() => {
    return (
      <>
              <CssBaseline />
              <h3 style={{textAlign: 'center' ,color:'grey'}}>saisissez une reponses</h3>

              {appStore.Reponse.map(rep => {

return (
  
  <div style={{ display:'flex' ,  flexDirection:'column'}}>
            <div style={{display:'flex', justifyContent:'space-around' , padding:20 , paddingTop:5}}>
            <div style={{marginRight:30  , width:80,  fontSize:11 }}><p style={{marginTop:15,marginBottom:0 , textAlign:'center',color:'#42a4f5'}}>{rep? (rep.userReponse? rep.userReponse.nom +" " +rep.userReponse.prenom : "" ):''}</p>
            <p style={{marginTop:0,marginBottom:0,textAlign:'center',color:'gray'}}>{rep.date.substring(0,10)}</p></div>
            <div style={{width:'100%'}}><p>{rep.reponse}</p></div>
        </div>
    </div>
);
})}

              <div style={{width:'100%' , display:'flex', marginBottom:30,  justifyContent:'center' , position:'relative' ,  marginTop:60 } }>
                <MytextField required  label="réponse..." value={appStore.repoonsetext} onChange={ event => appStore.repoonsetext = event.target.value}  variant="filled" style={{Width:'70%' ,marginLeft:60}} multiline rows={6} fullWidth></MytextField>
                <IconButton  style={{ alignSelf:"flex-end" } } onClick={()=>{PostRepose(appStore.repoonsetext)}} color='secondary' ><SendIcon/> </IconButton>
              </div>
             <div style={{height:20}}>

             </div>    
      </>
    )
  })

  async function  PostRepose(params){

    if(params!=''){
      if(appStore.ResId.id !=''){
      try {
        var jsonObj = {"id":0,"reponse":params ,"date": format(new Date(), "yyyy-MM-dd"),"repsonseFeedback":{"id":appStore.ResId.id} , "userReponse":{"id":110}  }
       var x =  (await axios.post(AppConfig.API+`Reponse/Add`, jsonObj ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
        if(x == 200){
         appStore.repoonsetext= ""; 
         GetReponse(appStore.ResId.id)
          console.log("ok");
          
        }
        else console.log("err"); ;
      } catch (err) {
        
      }
    console.log(jsonObj);}}
  }
  // add  get  Reponse  by  Feed  back  name  in  back end
   function GetReponse(id) {
    try {
      axios.get( AppConfig.API +'Feedback/GetReponse/'+id,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.Reponse = response.data;   
        }
    });
    } catch (err) {
      
    }
  }


function FeedBackAdd() {
    
       return(
         <App/>
       );     
   
  }


  
  class MyView extends Component {
    componentWillUnmount() {
       
    }
  
    componentDidMount(){
      GetActivite();
      GetDelivrable();
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
                      label="Activité"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].activiteFeed? appStore.data[0].activiteFeed.id : "") : ""}>

             {appStore.acitivite ? appStore.acitivite.map(act => <MenuItem key={act.id} value={act.id}>{act.activite}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}
            
                    </Field>
                  </Grid>

                  
                  <Grid item xs={12} style={{marginBottom:30}}>
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
