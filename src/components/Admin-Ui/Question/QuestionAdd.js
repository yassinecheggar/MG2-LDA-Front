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
  try {
      axios.get( AppConfig.API +'Question/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
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
    axios.get( AppConfig.API +'Activite/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){     
          appStore.acitivite = response.data;   
      }
  });
  }

  function PostImageLink(params){
    console.log(params);
       try {   
              var x =  ( axios.post(AppConfig.API+`Picture/Add`,params,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})).status;
        
              if(x == 200){
              return true; 
              }
            
              } catch (error) {
                console.log(error)
               return  false;
              }

      }

      function PostFile(params,questionid){
              const x= JSON.parse( window.localStorage.getItem("ldat"));
              const data = new FormData() ;
              data.append('file',params[0]);
              axios.post(AppConfig.API+`uploadFile`, data ,{ headers: { 'Content-Type': 'multipart/form-data', 'Authorization': x.Authorization } }).then(res=>{

                let o = {"id":0 ,"link": AppConfig.API +""+ res.data.fileDownloadUri , "description":"","questionimage":{"id" :questionid}};     
                PostImageLink(o);
                console.log(res);

             });
           
          }


  GetActivite();
  GetDelivrable();
    
  const App = view(() => {
    
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    const [link, setlink] = useState([]);
    
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
        
        values.status="pas de réponse";
        values.userQuest={"id":window.sessionStorage.getItem("user")};

            
              if(!appStore.edit){
             try {
                  values.date = format(new Date(), "yyyy-MM-dd") ;
                  if(values.activiteQuest.id!==""){
                    axios.post(AppConfig.API+`Question/Add`, values ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(res=>{
                    if(res.data!=null){  
                      if(link.length!=0){ 
                        PostFile(link,res.data.id);
                      }
                    } 
                        ResetValues(values);
                        setsuccess(true);
                        GetData();  
                    })}
        
             } catch (err) {
               
             }
              }

            if(appStore.edit){
             
              try {
                if(values.activiteQuest.id!==""){
                  values.date = appStore.data[0].date;
                  axios.put(AppConfig.API+`Question/Update/`+ appStore.data[0].id, values ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(res=>{
                  if(res.data!=null){  
                    if(link.length!=0){ 
                      PostFile(link,appStore.data[0].id);
                    }
                  } 
                      ResetValues(values);
                      setsuccess(true);
                      GetData();  
                  })}
  
              } catch (err) {
                
              }
            }
               
              
    
    };
  
      function Onseccess() {
        setTimeout(function() {setsuccess(false) ; appStore.open=false  }, 1000);
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
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].decsiption : ""}
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

                
                  <MyView/>

                  <Grid item  xs ={12}>
                <input
                  accept="*"
       
                  id="contained-button-file"
                  style={{display:'none'}}
                  type="file"
                  onChange={event=>{setlink(event.target.files)}}
                  multiple={false}
                 //onChange={event=>{files =  event.target.files PostFile(files);}}
                
          
                   />
                   <label htmlFor="contained-button-file" >
                  <Button variant="contained" color="primary" component="span" >
                      Upload
                 </Button>
                   </label>
                   <span className='uploadText'>{link.length>0 ? link[0].name :"" } </span> 
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
                      name="categorie"
                      fullWidth
                      required
                      component={Select}
                      style={{width:250}}
                      type="Text"
                      label="Categorie"
                      initialValue={  appStore.data.length!==0 ?  appStore.data[0].categorie : ""}>

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
