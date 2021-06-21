
import React, { useState, Component } from "react";
import appStore from "./store";
import appActions from "./Action";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { view } from "@risingstack/react-easy-state";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid , GridToolbar} from "@material-ui/data-grid";
import axios from 'axios';
import AppConfig from '../../Global';

import Typography from "@material-ui/core/Typography";

import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import  QuestionAdd from './QuestionAdd';
import {TextField ,Button} from '@material-ui/core/';
import '../../../App.css';
import SendIcon from '@material-ui/icons/Send';
import { format } from "date-fns";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      
    },
    fixedHeight: {
      height: 500,
    },
  
    TitleHeight: {
      height: 60,
      
    },
  
    TitleMargine: {
      marginTopap: 0,
      textAlign: "left",
      color: "#ffffff",
      fontSize:'25px' ,
      
    },
    button: {
      marginLeft: 5,
    },
  
    addButton: {
      fontSize: 20,
      background: "#000000",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
   
  }));

  const columns = [
    { field: "id", headerName: "Id", flex: 0.1 },
    { field: "date", headerName: "Date", flex: 0.1 },
    { field: "decsiption", headerName: "Decsiption", flex: 0.2 },
    { field: "problemType", headerName: "Problem", flex: 0.1 },
    { field: "phase", headerName: "Phase", flex: 0.1 },
    { field: `categorie` , headerName: "Categorie", flex: 0.2 },
    { field: "status", headerName: "Statut", flex: 0.1 },
    { field: `activiteQuest` , headerName: "Acitivité", flex: 0.1  , valueGetter : ({ value }) =>value? value.activite: "" },
    { field: "userQuest", headerName: "User", flex: 0.1 ,valueGetter : ({ value }) =>value? value.nom+" "+ value.prenom : ""},
   
    
   
    
  ];
  function GetData() {
    axios.get( AppConfig.API +'Question/GetAll').then(response  =>{
  
      if(response.data){     
          appStore.rows = response.data;   
      }
  });
  }

  async function GetReponse(id) {
    axios.get( AppConfig.API +'Question/GetReponse/'+id).then(response  =>{
  
      if(response.data){     
          appStore.Reponse = response.data;   
      }
  });
  }
  

  async function  PostRepose(params){

    if(params!=''){
      var jsonObj = {"id":0,"reponse":params ,"date": format(new Date(), "yyyy-MM-dd"),"repsonseQuestion":{"id":appStore.data[0].id} , "userReponse":{"id":110}  }
      var x =  (await axios.post(AppConfig.API+`Reponse/Add`, jsonObj)).status;
      if(x == 200){
       appStore.repoonsetext= ""; 
        console.log("ok");
        GetReponse( appStore.data[0].id);
      }
      else console.log("err"); ;
    
    console.log(jsonObj);
     }   

  }

const App = view(() => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [selection, setSelection] = useState();
  
  
    return(
   <>
    <Grid item xs={12} md={12} lg={12}>
        
        <Typography
          component="h3"
          variant="p"
          className={classes.TitleMargine}
        >
        
        How to be more Efficient ?
        </Typography>
  
     

    </Grid>

    <Grid item xs={12} md={12} lg={12}>

   
      <Paper className={fixedHeightPaper}>
       
      <div
            style={{
              Height: 30,
              marginBottom: 10,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
             <Tooltip title="add Question" placement="right-start">
            <IconButton
              aria-label="add activite"
              style={{ color: "#039632" }}
              onClick={appActions.handleOpenModal}
            >
              {" "}
              <AddCircleIcon />
            </IconButton>
            </Tooltip>
          </div>
       
        <DataGrid
          rows={appStore.rows}
          columns={columns}
          pageSize={10}
          components={{
              Toolbar: GridToolbar,
            }}
          
         
          onSelectionModelChange={(e) => {
            const selectedIDs = new Set(e.selectionModel);
            const selectedRowData = appStore.rows.filter((row) =>
              selectedIDs.has(row.id)
            );

            appStore.data = selectedRowData;
            appStore.selected = selectedRowData[0];

            setSelection( selectedRowData[0]);
            GetReponse(selectedRowData[0].id);
            appStore.open=true;
            appStore.repoonsetext='';
            //console.log("selected rowData:",  selection);
            //console.log("selected rowData Store:",  selection);
            
          }}
        />
      </Paper>
    </Grid>

<Grid  xs={12} md={12} lg={2}></Grid>
    

    
    <Grid item xs={12} md={12} lg={7} justify = "center">

    </Grid>


    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={appStore.open}
        onClose={appActions.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2000,
        }}
      >
        <Fade in={appStore.open}>

            
         <Paper className='Papercomp' style={{overflow:'auto',maxHeight:'90vh'}}>
                <h2 style={{textAlign: 'center'}}> Question ? </h2>
               <p style={{position:'absolute' ,top:0 ,  right:5 , margin:0 ,fontSize: 12}} >date:{selection ?selection.date : ""} </p>
                <Divider/>
                <p className='PaperText' style={{marginTop:30, marginBottom:0}}>Activite  : <span> {selection  ? (selection.activiteQuest? selection.activiteQuest.activite :"") : ""}</span></p>
                <p className='PaperText' style={{marginTop:5, marginBottom:0}}>Delivrable : <span> {selection  ? (selection.delivrableQuest? selection.delivrableQuest.delivrable :"") : ""}</span></p>
                
                <p  className='PaperText' style={{marginTop:5, marginBottom:0}}>User : <span> {selection  ? (selection.userQuest? selection.userQuest.nom +' ' +  selection.userQuest.prenom     :"") : ""}</span></p>
                <p className='PaperText' style={{marginTop:5, marginBottom:25}}>Phase : <span> {selection ?selection.phase : ""}</span></p>
                
                <Divider/>
                <p className='PaperText'>Description : <span>{selection ?selection.decsiption : ""}</span> </p>
                <Divider/>
                <Divider/>
                <p className='PaperText'>Réponse : <span>{selection ?selection.reponse : ""}</span> </p>


                {appStore.Reponse.map(rep => {

            return (
              
              <div style={{ display:'flex' ,  flexDirection:'column'}}>
                      <div style={{display:'flex', justifyContent:'space-around' , padding:20 }}>
                        <div style={{marginRight:30  , width:80,  fontSize:11 }}><p style={{marginTop:15,marginBottom:0 , textAlign:'center',color:'#42a4f5'}}>{rep? (rep.userReponse? rep.userReponse.nom +" " +rep.userReponse.prenom : "" ):''}</p><p style={{marginTop:0,marginBottom:0,textAlign:'center',color:'gray'}}>2021-05-01</p></div>
                        <div style={{width:'100%'}}><p>{rep.reponse}</p></div>
                    </div>
                </div>
            );
          })}

               

                
                <div style={{width:'100%' , display:'flex', marginBottom:10 ,  justifyContent:'center' , marginTop:10, position:'relative' }}>
                
                   <TextField  label="réponse..." value={appStore.repoonsetext} onChange={ event => appStore.repoonsetext = event.target.value} variant="filled" style={{width:'70%' ,marginLeft:60}} multiline rows={6}></TextField>
                   <IconButton  style={{ alignSelf:"flex-end" }} color='secondary' onClick={()=>{PostRepose(appStore.repoonsetext)}}><SendIcon/> </IconButton>
                 
                   
                </div>
               
                <Divider/>

                <p className='PaperText' style={{color:'chocolate'}}>Resources</p>
              
                <Tooltip title="open file" placement="right-start">
                 <IconButton style={{width:70 , height:70 , marginLeft:20 ,  marginBottom:20}}>

                <img src='images/resources.png'  alt ='res'  className='imgResources'/>
                 </IconButton>
                </Tooltip>
        </Paper>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={appStore.openM}
        onClose={appActions.handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2000,
        }}
      >
        <Fade in={appStore.openM}>
        <QuestionAdd />
          </Fade>
        </Modal>
   </>);
  });


function BestPractice() {
    return (
       <MyView/>
    )
}

class MyView extends Component {
    componentWillUnmount() {
      appStore.Reponse=[];
    }
  
    componentDidMount() {
        GetData();
    }
  
    saveState() {
     
    }
    render() {
      return <App />;
    }
  }

export default BestPractice
