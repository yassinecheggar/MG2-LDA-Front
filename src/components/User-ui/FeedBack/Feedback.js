
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
import  FeedbackAdd from './FeedBackAdd';
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
      height: "70vh",
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
    { field: "problemType", headerName: "Problem", flex: 0.1 },
    { field: "feedback", headerName: "Decsiption", flex: 0.1 },
    { field: "validationDate", headerName: "Date Validation", flex: 0.1 },
    { field: "phase", headerName: "Phase", flex: 0.1 },
    { field: `delivrableFeed` , headerName: "Categorie", flex: 0.2 , valueGetter : ({ value }) =>value? value.delivrable: "" },
    { field: `activiteFeed` , headerName: "Acitivité", flex: 0.1  , valueGetter : ({ value }) =>value? value.activite: "" },
    { field: "userFeedback", headerName: "User", flex: 0.1 ,valueGetter : ({ value }) =>value? value.nom+" "+ value.prenom : ""},
   
    
   
    
  ];
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

  async function GetReponse(id) {
    try {
      axios.get( AppConfig.API +'Feedback/GetReponse/'+id,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.Reponse = response.data;   
        }
    });
    } catch (err) {
      
    }
  }

  async function GetResource(id) {
    axios.get( AppConfig.API +'Question/GetResources/'+id ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){     
          appStore.resources = response.data;   
      }
  });
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
        
        FeedBack
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
             <Tooltip title="add FeedBack" placement="right-start">
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
            GetResource(selectedRowData[0].id);
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
                <h2 style={{textAlign: 'center'}}> FeedBack </h2>
               <p style={{position:'absolute' ,top:0 ,  right:5 , margin:0 ,fontSize: 12}} >date:{selection ?selection.date : ""} </p>
                <Divider/>
                <p className='PaperText' style={{marginTop:30, marginBottom:0}}>Activite  : <span> {selection  ? (selection.activiteFeed? selection.activiteFeed.activite :"") : ""}</span></p>
                <p className='PaperText' style={{marginTop:5, marginBottom:0}}>Categorie : <span> {selection  ? (selection.delivrableFeed? selection.delivrableFeed.delivrable :"") : ""}</span></p>
                
                <p  className='PaperText' style={{marginTop:5, marginBottom:0}}>User : <span> {selection  ? (selection.userFeedback? selection.userFeedback.nom +' ' +  selection.userFeedback.prenom     :"") : ""}</span></p>
                <p className='PaperText' style={{marginTop:5, marginBottom:0}}>Phase : <span> {selection ?selection.phase : ""}</span></p>
                <p className='PaperText' style={{marginTop:5, marginBottom:25}}>Date Validation : <span> {selection ?selection.validationDate : "Non Validé"}</span></p>
                
                <Divider/>
                <p className='PaperText'>FeedBack : <span>{selection ?selection.feedback : ""}</span> </p>
                <Divider/>
              
                <p className='PaperText'>Réponses : <span>{selection ?selection.reponse : ""}</span> </p>


                {appStore.Reponse.map(rep => {

            return (
              
              <div style={{ display:'flex' ,  flexDirection:'column' ,  marginTop:0}}>
                      <div style={{display:'flex', justifyContent:'space-around' , padding:20 , paddingTop:5}}>
                        <div style={{marginRight:30  , width:80,  fontSize:11 }}><p style={{marginTop:15,marginBottom:0 , textAlign:'center',color:'#42a4f5'}}>{rep? (rep.userReponse? rep.userReponse.nom +" " +rep.userReponse.prenom : "" ):''}</p><p style={{marginTop:0,marginBottom:0,textAlign:'center',color:'gray'}}>2021-05-01</p></div>
                        <div style={{width:'100%'}}><p>{rep.reponse}</p></div>
                    </div>
                </div>
            );
          })}
            <p className='PaperText' style={{color:'chocolate'}}>Resources</p>
                <div style={{display:'flex'}} >
                {appStore.resources.map(res => {
                    return (
                <Tooltip title={"open "+res.link.substr(res.link.lastIndexOf('.') + 1) +" file " }placement="right-start">
                 <IconButton style={{width:70 , height:70 , marginLeft:20 ,  marginBottom:20 } } onClick={()=>{window.open(res.link)}} >

                    <img src='images/resources.png'  alt ='res'  className='imgResources'/>
                 </IconButton>
                </Tooltip>
                    );
                  })}
        </div>
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
        <FeedbackAdd />
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
