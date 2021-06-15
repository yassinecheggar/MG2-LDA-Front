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
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
   
  }));
  ;

  function GetData() {
    axios.get( AppConfig.API +'Activite/GetAll').then(response  =>{
  
      if(response.data){     
          appStore.rows = response.data;
          appStore.res = appStore.rows;   
      }
  });
  }

  /*function filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}*/

function filterByValue(array, string) {
  return array.filter(o =>o.activite.toLowerCase().includes(string.toLowerCase()));
}

  GetData();

  const App = view(()  => {
    
    const classes = useStyles();
    const [selectionModel, setSelectionModel] = useState([]);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    const elements = ['one', 'two', 'three', 'three', 'three', 'three', 'three', 'three', 'three', 'three', 'three', 'three'    ];
    return (
      <>
      <Grid item xs={12} md={12} lg={12} >
       
           
             <div className='SerachContainer'>
                <SearchBar 
                  
                    onChange={(newValue) => {appStore.res= filterByValue(appStore.rows,newValue) }} 
                      //onRequestSearch={() => console.log(``, )}
  />
               </div>
       
      </Grid>

      
   
    { appStore.res.map((value, index) => {
        return <Grid item xs={6} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <div className='clickable' onClick={()=> console.log(`clicked` )}>
                  <h2>{value.activite}</h2>
              </div>
             
            </Paper>
        </Grid>
      })}
        
       
        </>
) } );

function Navigation() {
    return (
        <>
        <App></App>
        </>
    )
}

export default Navigation
