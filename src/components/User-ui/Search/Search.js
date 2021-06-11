import React, { useState,Component  } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid , GridToolbar} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
//import DocumentAdd from "./DocumentAdd";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import appStore from "./store";
import appActions from "./Action";
import { view } from "@risingstack/react-easy-state";
import axios from 'axios';
import AppConfig from '../../Global';
import './SearchStyle.css';

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
  { field: "id", headerName: "Id", flex: 1 },
  { field: "ref", headerName: "Ref", flex: 1 },
  { field: "nom", headerName: "Nom", flex: 1 },
  { field: "langue", headerName: "Langue", flex: 1 },
  { field: "typeDocument", headerName: "Type", flex: 1 ,valueGetter : ({ value }) => value.typedoc },
  { field: "documentPole", headerName: "Pole", flex: 1,valueGetter : ({ value }) => value.pole },
  { field: "documentPerimetre", headerName: "Perimetre", flex: 1 ,valueGetter : ({ value }) => value.perimetre +"  "+ value.perimetreArea.areadesc },
  
  { field: "docummentauthor", headerName: "Author", flex: 1 ,valueGetter : ({ value }) => value.nom + value.prenom},
  { field: "documentdirection", headerName: "Direction", flex: 1,valueGetter : ({ value }) => value.directiondesc },
  
  { field: `trainning` , headerName: "Trainning", flex: 1  },
  { field: `pubDate` , headerName: "PubDate", flex: 1  },
  { field: "valideur", headerName: "Valideur", flex: 1 },
 
  
];


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//generateRows(appStore.DataGrid);
var IDselected = null;

 function Edit() {
 
  appStore.edit=true;
  appStore.open=true;

}

function Delete() {
  //console.log("delete", appStore.data[0].id);
  appStore.dialog=true;
}

async  function DeleteRequest(){

  var status =  ( await axios.delete(AppConfig.API+`Document/Delete/`+appStore.data[0].id) ).status;
  console.log("delete Status" , status);
  appStore.dialog= false;

  GetData();

}

function GetData() {
  axios.get( AppConfig.API +'Document/GetAll').then(response  =>{

    if(response.data){     
        appStore.rows = response.data;   
    }
});
}

const App = view(()  => {
  
  const classes = useStyles();
  const [selectionModel, setSelectionModel] = useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  

  return (
    <>
    
      <Grid item xs={12} md={12} lg={12}>
        
          <Typography
            component="h3"
            variant="p"
            className={classes.TitleMargine}
          >
          
            Looking for a document? 
          </Typography>

        <Button variant="contained" color="primary" style={{float: 'right'}} onClick={appActions.handleOpen}>
        Add Document
      </Button>

      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper}>
         
           
         
          <DataGrid
            rows={appStore.rows}
            columns={columns}
            pageSize={10}
            components={{
                Toolbar: GridToolbar,
              }}
            onSelectionModelChange={(newSelection) => {
              setSelectionModel(newSelection.selectionModel);
            }}
            onRowSelected={(e) => {
              IDselected = e.data.fname;
            }}
            onSelectionModelChange={(e) => {
              const selectedIDs = new Set(e.selectionModel);
              const selectedRowData = appStore.rows.filter((row) =>
                selectedIDs.has(row.id)
              );

              appStore.data = selectedRowData;
              console.log("selected rowData:",  appStore.data);
            }}
          />
        </Paper>
      </Grid>

{/**---------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} md={12} lg={8}  >
           
                
                <Paper elevation={5}  className={fixedHeightPaper} style={{background:'linear-gradient(0deg, rgba(0, 147, 233,0.4), rgba(0,0,0,0.8))' , position:'relative'} }>
                <p className='docInfoTitle'>Document Informations </p>
                <Grid
                        container
                        direction="row"
                         justify="center"
                        alignItems="center"
                        spacing={2}
                        style={{marginTop:20}}
                >
                <Grid item xs={6} md={6} lg={6} >
                        
                        <p className='docInfoField'> ID : </p>
                        <p className='docInfoField'> Reference : </p>
                        <p className='docInfoField'> Nom : </p>
                        <p className='docInfoField'> Direction : </p>
                        <p className='docInfoField'> Version : </p>
                        <p className='docInfoField'> Statut : </p>
                        <p className='docInfoField'> Doc Type : </p>
                        <p className='docInfoField'> Langue : </p>
                       
                        
                </Grid>

                <Grid item xs={6} md={6} lg={6} >
                        <p className='docInfoField'> Area : </p>
                        <p className='docInfoField'> Perimetre : </p>
                        <p className='docInfoField'> Autheur : </p>
                        <p className='docInfoField'> Date Publication : </p>
                        <p className='docInfoField'> Direction : </p>
                        <p className='docInfoField'> Last Updater : </p>
                        <p className='docInfoField'> Activity : </p>
                        <p className='docInfoField'> Valideur : </p>
                        
                </Grid>
                </Grid>
                <IconButton
              
              style={{ position: 'absolute', right: '10px',  bottom: '10px' }}
             
            >
             <img className='image' src='images/pdfIcon.png'/>
            </IconButton>
               
                
                </Paper>
            

      </Grid>


      <Grid item xs={12} md={12} lg={4}  >
           
                <Paper className={fixedHeightPaper}>




                </Paper>
            

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
         
        </Fade>
      </Modal>

      <Dialog
        open={appStore.dialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={appActions.handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Supprimer ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          voulez vous vraiment le supprimer de façon permanente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={appActions.handleCloseDialog} color="primary">
            non
          </Button>
          <Button onClick={DeleteRequest} color="secondary">
            oui
          </Button>
        </DialogActions>
      </Dialog>
      <MyView/>
    </>
  );
});

function Search() {
  return <App />;
}


class MyView extends Component {
  componentWillUnmount() {
    
  }

  componentDidMount(){
    GetData();
  }

  saveState() {
    alert("exiting")
  }
  render() {

    return (
        <>
          
        </>
    )
}
}

export default Search;
 