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
import { format } from 'date-fns';
import '../../../App.css';

import {  KeyboardDatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
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
    }
  }));
  


  function ResetValues(Values) {
        Values.decsiption="";
        Values.phase="";
        Values.problemType="";
        Values.categorie="";
        Values.activiteQuest="";
      
  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.decsiption) {
      errors.decsiption = 'Required';
    }
    if (!values.phase) {
      errors.phase = 'Required';
    }
    if (!values.problemType) {
      errors.problemType = 'Required';
    }

    if (!values.categorie) {
      errors.categorie = 'Required';
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

  function PostImageLink(params){
    console.log(params);
    var x =  ( axios.post(AppConfig.API+`Picture/Add`,params)).status;
        try {      
              if(x == 200){
              return true; 
            }
            console.log();
              } catch (error) {
                console.log(error)
               return  false;
              }

      }




  GetActivite();
  GetDelivrable();
    
  var initDate ; 
  const App = view(() => {
    
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    const [link, setlink] = useState('');
    
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
        values.date = format(new Date(), "yyyy-MM-dd") ;
        values.status="pas de réponse";
        values.userQuest={"id":109};
            try {
              if(values.activiteQuest.id!==""){
                axios.post(AppConfig.API+`Question/Add`, values).then(res=>{
                  if(res.data!=null){  

                    if(link!=''){ 
                      let o = {"id":0 ,"link": link , "description":"","questionimage":{"id" :res.data.id}};
                        console.log(o); 
                      PostImageLink(o);
                    }
                  } 
                  
                  ResetValues(values);
                  setsuccess(true);
                  GetData();  

                  }
                )
              }
               
              
        } catch (error) {
              console.log(error)
      }
    };
  
      function Onseccess() {
        setTimeout(function() {setsuccess(false) ; appStore.openM=false  }, 1000);
        return (<Alert severity="success" >Ajouté avec success</Alert>);  
      }
  
      function OnError() {
        setTimeout(function() {seterror(false) }, 3000);
        return (<Alert severity="error" >Erreur</Alert>);  
      }
      return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600,  height:'90%'  }}>
        <CssBaseline />
       
        <Form 
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate >
              
              <Paper className='addpaper'> 
              { success ? <Onseccess /> : null }
          { error ? <OnError /> : null }
                <Grid container alignItems="flex-start" spacing={2}  >
                
                  <Grid item xs={12}>
                    <Field
                      name="decsiption"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      multiline
                      rows={4}
                      label="Decsiption"
                      
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
                     
                    />
                  </Grid>

                  

                  <MyView/>

                  <Grid item  xs ={12}>
                <input
                  accept="*"
       
                  id="contained-button-file"
                  className="hidden"
                  type="file"
                  onChange={event=>{setlink(event.target.value)}}
                   />
                   <label htmlFor="contained-button-file" >
                  <Button variant="contained" color="primary" component="span" >
                      Upload
                 </Button>
                   </label>
                   <span className='uploadText'>{link} </span> 
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
                      name="activiteQuest.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Activité"
                      formControlProps={{ fullWidth: true }}
                      initialValue="">

             {appStore.acitivite ? appStore.acitivite.map(act => <MenuItem key={act.id} value={act.id}>{act.activite}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}

               
                               
                                
                    </Field>
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Field
                      name="categorie"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Categorie"
                      formControlProps={{ fullWidth: true }}
                     >

                           <MenuItem key="1" value="Outil"> Outil</MenuItem>
                           <MenuItem key="2" value="Metier">Metier</MenuItem>
                           <MenuItem key="3" value="Point bloqant Urgent">Point bloqant Urgent</MenuItem>
                           <MenuItem key="4" value="Point blocqunat non urgent">Point blocqunat non urgent</MenuItem>
                           <MenuItem key="5" value="Autre">Autre</MenuItem>
                    </Field>
                  </Grid>
          </>
      )
  }
  }

 

export default QuestionAdd
