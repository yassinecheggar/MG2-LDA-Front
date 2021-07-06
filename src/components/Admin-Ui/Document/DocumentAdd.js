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
import { OnChange } from 'react-final-form-listeners'



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
      
        Values.langue="";
        Values.trainning= "";
        Values.version= "";
        Values.status= "";
        Values.lien= "";
        Values.ref= "";
        Values.pubDate= null;
        Values.documentPole.id= "";
      
      
      
        Status= true;

  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.nom) {
      errors.nom = 'Required';
    }
    if (!values.langue) {
        errors.phase = 'langue';
      }
  
    if (!values.trainning) {
        errors.trainning = 'Required';
      }

      if (!values.version) {
        errors.version = 'Required';
      }
      if (!values.status) {
        errors.status = 'Required';
      }
     
      if (!values.valideur) {
        errors.valideur = 'Required';
      }   
   
    return errors;
  };


  function GetData() {
    try {
      axios.get( AppConfig.API +'Document/GetAll' ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.rows = response.data;   
        }
    });
    } catch (err) {
      
    }
  }

  function GetType() {
   try {
      axios.get( AppConfig.API +'Type/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.typeDocument = response.data;   
        }
    });
   } catch (err) {
     
   }
  }

  function GetPole() {
   try {
      axios.get( AppConfig.API +'Pole/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.documentPole = response.data;   
            
        }
    });
   } catch (err) {
     
   }}

  function GetDirection() {
    try {
      axios.get( AppConfig.API +'Direction/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.documentdirection = response.data;   
        }
    });
    } catch (err) {
      
    }}

  function GetAuthor() {
   try {
      axios.get( AppConfig.API +'Author/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.docummentauthor = response.data;   
        }
    });
   } catch (err) {
     
   }}

  function GetPerimetre(id) {
    try {
      axios.get( AppConfig.API +'Area/GetPerimetre/'+id ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.documentPerimetre = response.data;   
        }
    });
    } catch (err) {
      
    }
  }

  
  function GetArea() {
    try {
      axios.get( AppConfig.API +'Area/GetAll' ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.documentArea = response.data;  
            console.log(appStore.documentArea); 
        }
    });
    } catch (err) {
      
    }}

  

  function GetValidator() {
  try {
      axios.get( AppConfig.API +'User/GetUsersByPrev',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.validator = response.data;   
        }
    });
  } catch (err) {
    
  }}

  function GetActivite() {
   try {
      axios.get( AppConfig.API +'Activite/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.documentActivite = response.data;   
        }
    });
   } catch (err) {
     
   }}

  
  function GetActiviteById(id) {
     
   try {
      axios.get( AppConfig.API +'Activite/GetById/'+id ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.ActiviteById = response.data;
        }
    });
   } catch (err) {
     
   }}

  function GetPoleById(id) {
     
   try {
      axios.get( AppConfig.API +'Pole/GetById/'+id ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.PoleById = response.data;
         
        }
    });
   } catch (err) {
     
   }}

   function  postModification(iduser,iddoc){
    var  date = format(new Date(), "yyyy-MM-dd")
    var  obj = {"id":null ,"dateModification":date,"documentMod":{"id":iddoc},"userMod":{"id":iduser}};
    console.log(obj)
    axios.post(AppConfig.API+'Modif/Add',obj,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})
  }

  GetType();
  GetPole();
  GetAuthor();
  GetDirection();
  GetValidator();
  GetArea();
  GetActivite();

  const App = view(() => {
    
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    
    const [link, setlink] = useState([]);
    
    const onSubmit =  async values   => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        values.id = 0;
        const x= JSON.parse( window.localStorage.getItem("ldat"));
          try {
                 
        if(!appStore.edit){

          values.ref = appStore.PoleById.pole+"-"+appStore.ActiviteById.abreviation+"-"+values.version ;
          values.pubDate =  format(new Date(), "yyyy-MM-dd") ;
       
        if(link.length!=0){ 
          const data = new FormData() ;
          data.append('file',link[0]);
          
            await axios.post(AppConfig.API+`uploadFile`, data ,{ headers: { 'Content-Type': 'multipart/form-data' , 'Authorization': x.Authorization } }).then(res=>{
           
            values.lien =  res.data.fileDownloadUri ; 
             axios.post(AppConfig.API+`Document/Add`, values ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(res=>{
              setsuccess(true);
              GetData();

             });
          }
         )

         
        }
      }

       
          if(appStore.edit){

            if(link.length!=0){ 

              values.ref = appStore.PoleById.pole+"-"+appStore.ActiviteById.abreviation+"-"+values.version ;
              values.pubDate= appStore.data[0].pubDate;     
              const data = new FormData() ;
              data.append('file',link[0]);
              

              axios.post(AppConfig.API+`uploadFile`, data ,{ headers: { 'Content-Type': 'multipart/form-data' , "Authorization": x.Authorization } }).then(res=>{
                values.lien =  res.data.fileDownloadUri ;   

                axios.put(AppConfig.API+`Document/Update/`+appStore.data[0].id, values ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(res=>{
                  setsuccess(true);
                  appStore.edit=false;
                   GetData();
                   postModification(window.sessionStorage.getItem("user"),appStore.data[0].id)
             });
            }
           )
          }
          else if(link.length==0){
            values.ref = appStore.PoleById.pole+"-"+appStore.ActiviteById.abreviation+"-"+values.version ;
            values.pubDate= appStore.data[0].pubDate;
            values.lien =  appStore.data[0].lien ; 

            
            axios.put(AppConfig.API+`Document/Update/`+appStore.data[0].id, values,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(res=>{
             setsuccess(true);
             appStore.edit=false;
             postModification(window.sessionStorage.getItem("user"),appStore.data[0].id)
             GetData();
            
            });
          }
        }   


     } catch (error) {
            console.log(error)
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
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600  }}>
        <CssBaseline />
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 , overflow:'auto',maxHeight:'90vh'}}> 
              { success ? <Onseccess /> : null }
          { error ? <OnError /> : null }
                <Grid container alignItems="flex-start" spacing={2}>
            


                  <Grid item xs={12}>
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
 
                  <Grid item xs={4}>
                    <Field
                      name="langue"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Langue"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].langue  : ""}>

                       <MenuItem  value="fr">FR</MenuItem>
                       <MenuItem  value="en">ENG</MenuItem>       
                    </Field>
                  </Grid>

                  <Grid item xs={4}>
                    <Field
                      name="trainning"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Training"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].trainning  : ""}>

                       <MenuItem  value="yes">Yes</MenuItem>
                       <MenuItem  value="no">No</MenuItem>       
                    </Field>
                  </Grid>



                  <Grid item xs={6}>
                    <Field
                      name="version"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="version"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].version  : ""}>

                       <MenuItem  value="1">version 1</MenuItem>
                       <MenuItem  value="2">version 2</MenuItem> 
                       <MenuItem  value="3">version 3</MenuItem>
                       <MenuItem  value="4">version 4</MenuItem>   
                       <MenuItem  value="5">version 5</MenuItem>  

                    </Field>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="status"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="statut"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].status  : ""}>

                       <MenuItem  value="ok">Ok</MenuItem>
                       <MenuItem  value="in work">In Work</MenuItem> 
                       <MenuItem  value="Nok">Not Ok</MenuItem>
                      

                    </Field>
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

function DocumentAdd() {

       return(
         <App/>
       );     
   
  }

  class MyView extends Component {


    constructor () {
      super()
      this.state = { loaded: false }
    }
  
    componentWillUnmount() {
      appStore.edit=false;
    }
  
    componentDidMount(){

    if(appStore.data[0]!=null){
     GetPoleById(appStore.data[0].documentPole.id);
     GetPerimetre(appStore.data[0].documentPerimetre.perimetreArea.id);
     GetActiviteById(appStore.data[0].documentActivite.id);
     
    }
      
    GetType();
    GetPole();
    GetAuthor();
    GetDirection();
    GetValidator();
    GetArea();
    GetActivite();

        //console.log( appStore.data[0].appStore.documentPole)
    }
  
 
    render() {
      const { loaded } = this.state;
      
      return (
          <>
          
          <Grid item xs={12}>
                    <Field
                      name="documentActivite.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="ACtivite"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].documentActivite? appStore.data[0].documentActivite.id : "") : ""}>
                      
                      {appStore.documentActivite ? appStore.documentActivite.map(activ => <MenuItem key={activ.id} value={activ.id}> {activ.activite}</MenuItem>) : <MenuItem key="default" value="default">Select a direction</MenuItem>}
         
         
                    </Field>

                    <OnChange name="documentActivite.id">
                        {(value, previous) => {
                         try {
                           GetActiviteById(value);
                         } catch (error) {
                           console.log(error );
                         }
                         
                          }}
                     </OnChange>
                  </Grid>


          <Grid item xs={12}>
                    <Field
                      name="documentdirection.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Direction"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].documentdirection? appStore.data[0].documentdirection.id : "") : ""}>
                      
                      {appStore.documentdirection ? appStore.documentdirection.map(dir => <MenuItem key={dir.id} value={dir.id}>{dir.directiondesc}</MenuItem>) : <MenuItem key="default" value="default">Select a direction</MenuItem>}
                    </Field>
                  </Grid>


                
                <Grid item xs={12}>
                    <Field
                      name="documentPole.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Pole"
                      formControlProps={{ fullWidth: true }}
                  
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].documentPole? appStore.data[0].documentPole.id : "") : ""}>

                      {appStore.documentPole ? appStore.documentPole.map(pl => <MenuItem key={pl.id} value={pl.id}>{pl.pole}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}
         
                               
                                
                    </Field>

                    <OnChange name="documentPole.id">
                        {(value, previous) => {
                         try {
                          GetPoleById(value);
                         } catch (error) {
                          console.log(error );
                         }
                          }}
                     </OnChange>
                  </Grid>


                  <Grid item xs={12}>
                    <Field
                      name="documentPerimetre.perimetreArea.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Area"

                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].documentPerimetre.perimetreArea? appStore.data[0].documentPerimetre.perimetreArea.id : "") : ""}>

                      {appStore.documentArea ? appStore.documentArea.map(Ar => <MenuItem key={Ar.id} value={Ar.id}>{Ar.areadesc}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}
         
                    
                    </Field>
                    <OnChange name="documentPerimetre.perimetreArea.id">
                        {(value, previous) => {
                         
                            GetPerimetre(value);
                          }}
                     </OnChange>
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Field
                      name="documentPerimetre.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Perimetre"
                     
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ?  appStore.data[0].documentPerimetre.id : "" }>

                      {appStore.documentPerimetre ? appStore.documentPerimetre.map(per => <MenuItem key={per.id} value={per.id}>{per.perimetre}</MenuItem>) : <MenuItem key="default" value="default">Select an Area</MenuItem>}
         
                    
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="valideur"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Valideur"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].documentPerimetre? appStore.data[0].valideur : "") : ""}>

                      {appStore.validator ? appStore.validator.map(val => <MenuItem key={val.id} value={val.id}>{val.nom +" " + val.prenom}</MenuItem>) : <MenuItem key="default" value="default">Select a Perimetre</MenuItem>}
         
         
                    </Field>
                  </Grid>



                  
                  <Grid item xs={12}>
                    <Field
                      name="typeDocument.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="TypeDocument"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].typeDocument ? appStore.data[0].typeDocument.id : ""):""}>

                      {appStore.typeDocument ? appStore.typeDocument.map(type => <MenuItem key={type.id} value={type.id}>{type.typedoc}</MenuItem>) : <MenuItem key="default" value="default">Select a  type</MenuItem>}
         
                      </Field>
                      </Grid>
                 
                      <Grid item xs={12}>
                    <Field
                      name="docummentauthor.id"
                      fullWidth
                      required
                      component={Select}
                      type="Text"
                      label="Author"
                      formControlProps={{ fullWidth: true }}
                      initialValue={  appStore.data.length!=0 ? (appStore.data[0].docummentauthor? appStore.data[0].docummentauthor.id : "") : ""}>

                      {appStore.docummentauthor ? appStore.docummentauthor.map(aut => <MenuItem key={aut.id} value={aut.id}>{aut.nom +"" +aut.prenom}</MenuItem>) : <MenuItem key="default" value="default">Select an Author</MenuItem>}
         
                               
                                
                    </Field>
                  </Grid>

          </>
      )
  }
  }

 

export default DocumentAdd
