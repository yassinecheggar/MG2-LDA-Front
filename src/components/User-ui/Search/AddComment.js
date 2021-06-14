import React  ,{ useState } from 'react'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import appStore from "./store";
import {  view } from "@risingstack/react-easy-state";
import AppConfig from '../../Global';
import axios from 'axios';
import { Paper,Grid,Button, CssBaseline,} from '@material-ui/core';
import { format } from 'date-fns';


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
        Values.comment=""
     
  }
  
  const validate = values => {
    const errors = {};
    
    if (!values.comment) {
      errors.comment = 'Required';
    }

    return errors;
  };



  async function GetComment(id) {
    axios.get( AppConfig.API +'Document/GetCommentBydoc/'+id).then(response  =>{
  
      if(response.data){     
          appStore.comment = response.data;   
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
        values.documentComment="";
     
        values.dateComment =format(new Date(), "yyyy-MM-dd") ;
        let jsonobj={"id" : 0 , "comment" : values.comment , "documentComment" :{"id":appStore.selected.id} ,"dateComment" : format(new Date(), "yyyy-MM-dd") ,"userComment" : {"id":176}   }
        
        
        var x =  (await axios.post(AppConfig.API+`Comment/Add`, jsonobj)).status;
        
        //values.documentComment.id=appStore.data[0].id;
        if(x == 200){
            //ResetValues(values);
            setsuccess(true);
         GetComment(appStore.selected.id);
            
          }
          else seterror(true);
        
     // console.log(jsonobj);
    
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
                      name="comment"
                      fullWidth
                      required
                      multiline
                      component={TextField}
                      type="text"
                      label="Comment"
                      
                    />
                  </Grid>

                


                    
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      
                      disabled={submitting || pristine}
                    >
                      Clear
                    </Button>
                  </Grid>

                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting || pristine}
                    >
                      Comment
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

      

function CommentAdd() {
    
    
   
       return(
         <App/>
       );     
   
  }

export default CommentAdd
