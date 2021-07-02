
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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import  './Bestpractice.css';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import  BestPracticeAdd from './BestPracticeAdd';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
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
    { field: "description", headerName: "Decsiption", flex: 0.2 },
    { field: "date", headerName: "Date", flex: 0.1 },
    { field: "phase", headerName: "Phase", flex: 0.1 },
    
    { field: `delivrableBest` , headerName: "Delivrable", flex: 0.2  , valueGetter : ({ value }) => value.delivrable },
    { field: `activiteBest` , headerName: "Acitivité", flex: 0.1  , valueGetter : ({ value }) => value.activite },
    { field: "userBestPractice", headerName: "User", flex: 0.1 ,valueGetter : ({ value }) =>value? value.nom+" "+ value.prenom : ""},
   
    
  ];
  function GetData() {
  try {
      axios.get( AppConfig.API +'BestPractice/GetAll',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.rows = response.data;   
        }
    });
  } catch (err) {
    
  }
  }

  async function GetResource(id) {
   try {
      axios.get( AppConfig.API +'BestPractice/GetResources/'+id,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    
        if(response.data){     
            appStore.resources = response.data;   
        }
    });
   } catch (err) {
     
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
        
        Best Practices
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
             <Tooltip title="add Best Practice" placement="right-start">
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
            GetResource(selectedRowData[0].id);
            setSelection( selectedRowData[0]);
           
            appStore.open=true;
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

            
         <Paper className='Papercomp'>
                <h2 style={{textAlign: 'center'}}> Best Practice</h2>
               <p style={{position:'absolute' ,bottom:0 ,  right:5 , margin:0 ,fontSize: 12}} >date:{selection ?selection.date : ""} </p>
                <Divider/>
                <p className='PaperText' style={{marginTop:30, marginBottom:0}}>Activite  : <span> {selection  ? (selection.activiteBest? selection.activiteBest.activite :"") : ""}</span></p>
                <p className='PaperText' style={{marginTop:5, marginBottom:0}}>Delivrable : <span> {selection  ? (selection.delivrableBest? selection.delivrableBest.delivrable :"") : ""}</span></p>
                <p className='PaperText' style={{marginTop:5, marginBottom:0}}>Categorie  : <span>  {selection ?selection.categorie : ""}</span></p>
                <p  className='PaperText' style={{marginTop:5, marginBottom:0}}>User : <span> {selection  ? (selection.userBestPractice? selection.userBestPractice.nom +' ' +  selection.userBestPractice.prenom     :"") : ""}</span></p>
                <p className='PaperText' style={{marginTop:5, marginBottom:25}}>Phase : <span> {selection ?selection.phase : ""}</span></p>
                
                <Divider/>
                <p className='PaperText'>Description : <span>{selection ?selection.description : ""}</span> </p>
                <Divider/>
                <p className='PaperText' style={{color:'chocolate'}}>Resources</p>

                {appStore.resources.map(res => {
                    return (
                <Tooltip title="open file" placement="right-start">
                 <IconButton style={{width:70 , height:70 , marginLeft:20 ,  marginBottom:20 } } onClick={()=>{window.open(res.link)}} >

                    <img src='images/resources.png'  alt ='res'  className='imgResources'/>
                 </IconButton>
                </Tooltip>
                    );
                  })}
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
          <BestPracticeAdd/>
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
    componentWillUnmount() {}
  
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
