import React, { useState,Component  } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

import appStore from "./store";
import appActions from "./Action";
import { view } from "@risingstack/react-easy-state"; 
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import SearchBar from "material-ui-search-bar";
import  './NavigationStyle.css';
import axios from 'axios';
import AppConfig from '../../Global';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      transitionTimingFunction: 'ease-in',
    },
    fixedHeight: {
      height: 200,
     
      transition: '1s ease',
      "&:hover": {
       
      cursor: 'pointer',
    transform: 'scale(0.8)',
    transition: '1s ease',
      },
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

    cardPage :{
        position: "relative",
        height: 250,
        
    },

    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
   
  }));
  ;

  function GetActivite() {
    axios.get( AppConfig.API +'Activite/GetAll').then(response  =>{
  
      if(response.data){     
          appStore.rows = response.data;
          appStore.res = appStore.rows;  
          appStore.hasResult=true; 
      }
  });
  }

  function GetDocType() {
    axios.get( AppConfig.API +'Type/GetAll').then(response  =>{
  
      if(response.data){     
          appStore.Typerows = response.data;
          appStore.Typeres = appStore.Typerows;  
          appStore.TypehasResul=true; 
        
      }
  });
  }

  function GetDoc() {
    axios.get( AppConfig.API +'Document/GetAll').then(response  =>{
  
      if(response.data){     
          appStore.Docrows = response.data;
          appStore.Docres = appStore.Docrows;  
          appStore.DochasReslut=true; 
        
      }
  });
  }

  /*function filterByValueall(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}*/

function filterByValue(array, string) {
  try {
    return array.filter(o =>o.activite.toLowerCase().includes(string.toLowerCase()));
  } catch (error) {
    return [];
  }
  
}
function filterByValueType(array, string) {
  try {
     return array.filter(o =>o.typedoc.toLowerCase().includes(string.toLowerCase()));
  } catch (error) {
    return [];
  }
 
}



  const Activite = view(()  => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <>
      <Grid item xs={12} md={12} lg={12} >
       
           
             <div className='SerachContainer'>
                <SearchBar onChange={(newValue) => {appStore.res= filterByValue(appStore.rows,newValue) }} 
                      //onRequestSearch={() => console.log(``, )}
  />
              </div>  
      </Grid>
    { appStore.hasResult? appStore.res.map((value, index) => {
        return <Grid item xs={6} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <div className='clickable' onClick={ appActions.NextStepT}>
                  <h2>{value.activite}</h2>
              </div>
             
            </Paper>
        </Grid>
      }):""} 
        </>
) } );

const DocType = view(()  => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
     
    <Grid item xs={12} md={12} lg={12} style={{position:'relative'}} >
     <IconButton style={{position:'absolute'}} onClick={appActions.previousStepA}><KeyboardBackspaceIcon className='icon'/></IconButton>
    
    <div className='SerachContainer'>
    
                <SearchBar onChange={(newValue) => {appStore.Typeres= filterByValueType(appStore.Typerows,newValue) }} 
                      //onRequestSearch={() => console.log(``, )}
  />
              </div>  
    </Grid>
  { appStore.TypehasResul? appStore.Typeres.map((value, index) => {
      return <Grid item xs={6} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <div className='clickable' onClick={ appActions.previousStepD} >
                <h2>{value.typedoc}</h2>
            </div>
          </Paper>
      </Grid>
    }):""} 
      </>
) } );



const DocList = view(()  => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
     
    <Grid item xs={12} md={12} lg={12} style={{position:'relative'}} >
     <IconButton style={{position:'absolute'}} onClick={appActions.NextStepT}><KeyboardBackspaceIcon className='icon'/></IconButton>
    
    <div className='SerachContainer'>
    
                <SearchBar onChange={(newValue) => {appStore.Docres= filterByValueType(appStore.Docrows,newValue) }} 
                      //onRequestSearch={() => console.log(``, )}
  />
              </div>  
    </Grid>
  { appStore.Docres? appStore.Docres.map((value, index) => {
      return <Grid item xs={6} md={4} lg={3}>
          <Paper className={classes.cardPage}>

            <div className='cardContainer' >
             
              <h2 className='CardTitle'>{value.nom}</h2>
              
            </div>
             <IconButton style={{ position: 'absolute', right: '0px',  top: '-50px' }} >
                <img className='image' src='images/pdfIcon.png'/>
              </IconButton>
          </Paper>
      </Grid>
    }):""} 
      </>
) } );


const App = view(()  => {

  if(appStore.isActiviteSelected){return (<MyView2/>);}
  if(appStore.isTypeSelected){return (<MyView />  ) }
  if(appStore.isDocSelected){return (<MyView3 />  ) }
  

})

function Navigation() {
    return (
        <>
        <App/>
        </>
    )
}

class MyView extends Component {
  componentWillUnmount() {
    
  }

  componentDidMount(){
    GetDocType();
  }

  saveState() {
    alert("exiting")
  }
  render() {

    return (
      <DocType/>
    )
}
}

class MyView2 extends Component {
  componentWillUnmount() {
    
  }

  componentDidMount(){
    GetActivite();
  }

  saveState() {
    alert("exiting")
  }
  render() {

    return (
      <Activite/>
    )
}
}


class MyView3 extends Component {
  componentWillUnmount() {
    
  }

  componentDidMount(){
    GetDoc();
  }

  saveState() {
    alert("exiting")
  }
  render() {

    return (
      <DocList/>
    )
}
}

export default Navigation
