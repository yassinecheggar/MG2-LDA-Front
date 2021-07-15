import React, { useState,Component  } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid , GridToolbar} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
//import DocumentAdd from "./DocumentAdd";
import AddComment  from "./AddComment"
import  Comment from  './Comment';

import Slide from "@material-ui/core/Slide";
import appStore from "./store";
import appActions from "./Action";
import { view } from "@risingstack/react-easy-state";
import axios from 'axios';
import AppConfig from '../../Global';
import './SearchStyle.css';
import Fab from '@material-ui/core/Fab';
import { format } from 'date-fns';
import {Animated} from "react-animated-css";

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
try {
  
    var status =  ( await axios.delete(AppConfig.API+`Document/Delete/`+appStore.data[0].id ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}) ).status;
    console.log("delete Status" , status);
    appStore.dialog= false;
  
    GetData();
} catch (err) {
  
}

}

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


 async function GetComment(id) {
 try {
    axios.get( AppConfig.API +'Document/GetCommentBydoc/'+id ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){     
          appStore.comment = response.data;   
      }
  });
 } catch (err) {
   
 }
}

async function GetUpdate(id) {
 try {
    appStore.update=null;
    axios.get( AppConfig.API +'Document/GetLastModBydoc/'+id ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
      if(response.data){  
        
          appStore.update = response.data;   
      }
  });
 } catch (err) {
   
 }
}
function openFile(params) {
  window.open(params);
}
async function  postDownloaded(iduser,docid){
  var  date = format(new Date(), "yyyy-MM-dd")
  var  obj = {"id":null ,"date":date,"visited":"Doc","userVisit":{"id":iduser},"visitedid":docid};
  axios.post(AppConfig.API+'View/Add',obj,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})
}

const App = view(()  => {
  
  const classes = useStyles();
  const [selectionModel, setSelectionModel] = useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [selection, setSelection] = useState();
  const [enable, setEnable] = useState(true);
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
      {/*     
        <Button variant="contained" color="primary" style={{float: 'right'}} onClick={appActions.handleOpenModal}>
        Add Document
      </Button> */}

      </Grid>

      <Grid item xs={12} md={12} lg={12}>
      <Animated animationIn="fadeIn"  animationInDuration={2000} isVisible={true} >
        <Paper className={fixedHeightPaper}>
         
           
         
          <DataGrid
            rows={appStore.rows}
            columns={columns}
            pageSize={10}
            components={{
                Toolbar: GridToolbar,
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
              appStore.selected = selectedRowData[0];
              GetComment(selectedRowData[0].id);
              GetUpdate(selectedRowData[0].id);
              
              setSelection( selectedRowData[0]);
              setEnable(false);
              //console.log("selected rowData:",  selection);
              //console.log("selected rowData Store:",  appStore.data[0]);
              
            }}
          />
        </Paper>
        </Animated>
      </Grid>

{/**---------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <Grid item xs={12} md={12} lg={8}  >
           
      <Animated animationIn="slideInLeft "  animationInDuration={2000} isVisible={true} >
                <Paper elevation={5}  className={fixedHeightPaper} style={{background:'linear-gradient(0deg, rgba(0, 147, 233,0.4), rgba(0,0,0,0.8))' , position:'relative'} }>
                <p className='docInfoTitle'>Document Informations </p>
                <Grid
                        container
                        wrap="nowrap"
                        direction="row"
                         justify="center"
                        alignItems="center"
                        spacing={2}
                        style={{marginTop:20}}
                >
                <Grid item xs={6} md={6} lg={6} >
                        
                        
                        <p className='docInfoField'> ID :  <span className='DocTypoField'>{selection ? selection.id : ""} </span> </p> 
                        <p className='docInfoField'> Reference : <span className='DocTypoField'>{selection ? selection.ref : ""} </span> </p>
                        <p className='docInfoField'> Nom : <span className='DocTypoField'>{selection ? selection.nom : ""}</span> </p>
                        <p className='docInfoField'> Direction : <span className='DocTypoField'>{selection ? (selection.documentdirection? selection.documentdirection.directiondesc :"") : ""}</span> </p>
                        <p className='docInfoField'> Version : <span className='DocTypoField'>{selection ? selection.version : ""}</span> </p>
                        <p className='docInfoField'> Statut : <span className='DocTypoField'>{selection ? selection.status : ""} </span></p>
                        <p className='docInfoField'> Doc Type : <span className='DocTypoField'>{selection ? (selection.typeDocument? selection.typeDocument.typedoc :"") : ""}</span> </p>
                        <p className='docInfoField'> Langue :<span className='DocTypoField' >{selection ? selection.langue : ""} </span> </p>
                       
                        
                </Grid>

                <Grid item xs={6} md={6} lg={6} >
                        <p className='docInfoField'> Area : <span className='DocTypoField' >{selection ? (selection.documentPerimetre?(selection.documentPerimetre.perimetreArea ? selection.documentPerimetre.perimetreArea.areadesc :"") :"") : ""} </span> </p>
                        <p className='docInfoField'> Perimetre :<span className='DocTypoField' > {selection ? (selection.documentPerimetre? selection.documentPerimetre.perimetre :"") : ""}</span></p>
                        <p className='docInfoField'> Auteur : <span className='DocTypoField' >{selection ? (selection.docummentauthor? selection.docummentauthor.nom +" "+ selection.docummentauthor.prenom :"") : ""}</span></p>
                        <p className='docInfoField'> Date Publication :<span className='DocTypoField' >{selection ? selection.pubDate : ""} </span></p>
                        <p className='docInfoField'> Pole :<span className='DocTypoField' >{selection ? (selection.typeDocument? selection.typeDocument.typedoc :"") : ""}</span> </p>
                        <p className='docInfoField'> Last Update :  <span className='DocTypoField' >{appStore.update ? appStore.update.dateModification : ""} </span> <span className='DocTypoField' >{appStore.update ? ( appStore.update.userMod?  appStore.update.userMod.nom +' '+ appStore.update.userMod.prenom   :"") : ""} </span> </p>
                       
                        <p className='docInfoField'> Activity :<span className='DocTypoField' >{selection ? (selection.documentActivite? selection.documentActivite.activite :"") : ""} </span></p>
                        <p className='docInfoField'> Valideur :<span className='DocTypoField' >{selection ? selection.valideur : ""}</span></p>
                        
                </Grid>
                </Grid>
                { selection ? selection.lien ?
              <IconButton onClick={()=>{
                openFile(AppConfig.API + selection.lien ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))});
                
                postDownloaded(window.sessionStorage.getItem("user"),selection.id);
              }
            
            
            }
                style={{ position: 'absolute', right: '10px',  bottom: '10px' }}>
                <img className='image' src='images/pdfIcon.png' alt='doc'/>
              </IconButton>
               :"" :""
              }
                </Paper>
                </Animated>

      </Grid>


      <Grid item xs={12} md={12} lg={4}   >
      <Animated animationIn="slideInRight"  animationInDuration={2000} isVisible={true} >
                <Paper className={fixedHeightPaper}  style={{position:'relative'}} >

                <Comment />
                   <div style={{position:'sticky' ,right:0 ,bottom:0 ,  display:"flex" ,flexDirection:'row-reverse'}} >
                      <Fab  color="secondary"  onClick={appActions.handleOpen}  disabled={enable} >
                    <AddIcon />
                      </Fab>
                    </div>
                

                </Paper>
            
                </Animated>
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
        }} >

        <Fade in={appStore.open}>
         <AddComment/>
        </Fade>
      </Modal>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={appStore.openModal}
        onClose={appActions.handleCloseModal }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2000,
        }} >
          
        <Fade in={appStore.open}>
         
        </Fade>
      </Modal>

      
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
 