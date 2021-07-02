import React, { useState, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

import appStore from "./store";
import appActions from "./Action";
import { view } from "@risingstack/react-easy-state";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchBar from "material-ui-search-bar";
import "./NavigationStyle.css";
import axios from "axios";
import open from 'open';
import AppConfig from "../../Global";
import ReactTooltip from "react-tooltip";
import MenuItem from "@material-ui/core/MenuItem";


import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { tr } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px;",
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
  },
  select: {
    "& .MuiInputBase-input": {
      color: "green",
    },

  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    transitionTimingFunction: "ease-in",
  },
  fixedHeight: {
    height: 200,

    transition: "1s ease",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(0.8)",
      transition: "1s ease",
    },
  },

  TitleHeight: {
    height: 60,
  },

  TitleMargine: {
    marginTopap: 0,
    textAlign: "left",
    color: "#ffffff",
    fontSize: "25px",
  },
  button: {
    marginLeft: 5,
  },

  addButton: {
    fontSize: 20,
    background: "#000000",
  },

  cardPage: {
    backgroundColor: '#000000',
    backgroundImage: 'linear-gradient(147deg, #000000 0%, #2c3e50 74%)',
    transition: "1s ease",
    height: 250,
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
      transition: "1s ease",
    },
  },
  cardPage2: {
    height: 200,
    backgroundColor: '#000000',
    backgroundImage: 'linear-gradient(160deg, #000000 10%, #7f8c8d 140%)',

    transition: "1s ease",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(0.8)",
      transition: "1s ease",
    },
  },

  cardPage3: {
    height: 200,
    backgroundColor: '#141e30',
    backgroundImage: ' linear-gradient(to right, #0f2027, #203a43, #2c5364);',

    transition: "1s ease",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(0.8)",
      transition: "1s ease",
    },
  },


  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  select: {
    // color: "red",
    
  },
   icon: {
    fill: "#ffffff",
    color: '#ffffff',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
   
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));


const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "red"
    },
    "&:hover $notchedOutline": {
      borderColor: "blue"
    },
    "&$focused $notchedOutline": {
      borderColor: "green"
    }
  },
  focused: {},
  notchedOutline: {}
}));




function GetActivite() {
 try {
    axios.get(AppConfig.API + "Activite/GetAll" ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then((response) => {
      if (response.data) {
        appStore.rows = response.data;
        appStore.res = appStore.rows;
        appStore.hasResult = true;
      }
    });
 } catch (err) {
   
 }
}

function GetDocType() {
  try {
    axios.get(AppConfig.API + "Type/GetAll",{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then((response) => {
      if (response.data) {
        appStore.Typerows = response.data;
        appStore.Typeres = appStore.Typerows;
        appStore.TypehasResul = true;
      }
    });
  } catch (err) {
    
  }
}

function GetDoc() {
  try {
    axios.get(AppConfig.API + "Document/GetAll",{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then((response) => {
      if (response.data) {
        appStore.Docrows = response.data;
        appStore.Docres = appStore.Docrows;
        appStore.DochasReslut = true;
      }
    });
  } catch (err) {
    
  }
}
/*
  function filterByallValue(array, string) {    

    try {
      array.filter(o =>Object.keys(o).some( k => o[k].toLowerCase().includes(string.toLowerCase())));
    } catch (error) {
      return  null;
    }
    
  //  return array.filter(o =>Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}*/

function filterByValue(array, string) {
  try {
    return array.filter((o) =>
      o.activite.toLowerCase().includes(string.toLowerCase())
    );
  } catch (error) {
    return [];
  }
}
function filterByValueType(array, string) {
  try {
    return array.filter((o) =>
      o.typedoc.toLowerCase().includes(string.toLowerCase())
    );
  } catch (error) {
    return [];
  }
}

function filterByValueDoc(array, string, col) {
  try {
    return array.filter((o) =>
      o[col].toLowerCase().includes(string.toLowerCase())
    );
  } catch (error) {
    return [];
  }
}

function filterByValueDocNested(array, string, col) {
  const x =[ {main: 'documentPole', sub: 'pole' },
    {main: 'documentdirection', sub: 'directiondesc'},
    {main: 'nom', sub: null},
    {main: 'pubDate', sub: null},
    {main: 'langue', sub: null},
    {main: 'ref', sub: null},
    {main: 'docummentauthor', sub: 'prenom'},
    {main: 'typeDocument', sub: 'typedoc'}];

    var y =  x.filter(function(it) {
      return it.main == col;
  });

  
  if(y[0].sub!=null){
    let x1 =y[0].main;
    let x2 =y[0].sub;
    try {
      return array.filter((o) =>
        o[x1][x2].toLowerCase().includes(string.toLowerCase())
      );
    } catch (error) {
      return [];
    }
  }else{
    let x1 =y[0].main;
    try {
      return array.filter((o) =>
        o[x1].toLowerCase().includes(string.toLowerCase())
      );
    } catch (error) {
      return [];
    }

  }
 
}

const Activite = view(() => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <div className="SerachContainer">
          <SearchBar
            onChange={(newValue) => {
              appStore.res = filterByValue(appStore.rows, newValue);
            }}
            //onRequestSearch={() => console.log(``, )}
          />
        </div>
      </Grid>
      {appStore.hasResult
        ? appStore.res.map((value, index) => {
            return (
              <Grid item xs={6} md={4} lg={3}>
                <Paper className={classes.cardPage3}>
                  <div className="clickable" onClick={appActions.NextStepT}>
                    <h2 style={{color:'white'}} >{value.activite}</h2>
                  </div>
                </Paper>
              </Grid>
            );
          })
        : ""}
    </>
  );
});

const DocType = view(() => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      <Grid item xs={12} md={12} lg={12} style={{ position: "relative" }}>
        <IconButton
          style={{ position: "absolute" }}
          onClick={appActions.previousStepA}
        >
          <KeyboardBackspaceIcon className="icon" />
        </IconButton>

        <div className="SerachContainer">
          <SearchBar
            onChange={(newValue) => {
              appStore.Typeres = filterByValueType(appStore.Typerows, newValue);
            }}
            //onRequestSearch={() => console.log(``, )}
          />
        </div>
      </Grid>
      {appStore.TypehasResul
        ? appStore.Typeres.map((value, index) => {
            return (
              <Grid item xs={6} md={4} lg={3}>
                <Paper className={classes.cardPage2} >
                  <div className="clickable" onClick={appActions.previousStepD}>
                    <h2 style={{color:"white"}}>{value.typedoc}</h2>
                  </div>
                </Paper>
              </Grid>
            );
          })
        : ""}
    </>
  );
});

function openFile(params) {
 
  // axios.get(params,{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(res=>{
    
  // });

  window.open(params);
}

const DocList = view(() => {
  const outlinedInputClasses = useOutlinedInputStyles();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      <Grid item xs={12} md={12} lg={12} style={{ position: "relative" }}>
        <IconButton
          style={{ position: "absolute" }}
          onClick={appActions.NextStepT}
        >
          <KeyboardBackspaceIcon className="icon" />
        </IconButton>
        <div className="SerachContainer">
          <SearchBar
            onChange={(newValue) => {
              appStore.Docres = filterByValueDocNested(
                appStore.Docrows,
                newValue,
                appStore.colFilter
              );
            }}
            //onRequestSearch={() => console.log(``, )}
          />

        <div style={{marginLeft:20}}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label" style={{color:'white'}}>critère</InputLabel>
           <Select
            className={classes.select}
            labelId="demo-simple-select-outlined-label"
            style={{color:'white' ,width:150}}
            placeholder='search by..'
            
            id="demo-simple-select-outlined"
            value={appStore.colFilter}
             onChange={appActions.handlchnageSelect}
            label="Select"
            inputProps={{
              name: "Filter",
              classes: {
                icon: classes.icon,
                borderColor: "green"
              }
             
            }}  ><MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'nom'}>Nom</MenuItem>
          <MenuItem value={'ref'}>Ref</MenuItem>
          <MenuItem value={'pubDate'}>date</MenuItem>
          <MenuItem value={'docummentauthor'}>auteur</MenuItem>
          <MenuItem value={'documentPole'}>pole</MenuItem>
          <MenuItem value={'documentdirection'}>direction</MenuItem>
          <MenuItem value={'typeDocument'}>Typedocument</MenuItem>
         
        </Select>
        </FormControl>
        </div>
         
        
            
        </div>
      </Grid>
      {appStore.Docres
        ? appStore.Docres.map((value, index) => {
            return (
              <Grid item xs={12} md={6} lg={3} style={{ marginTop: 40 }}>
                <Paper className={classes.cardPage}>
                  <div style={{ display: "flex", position: "relative" }}>
                    <IconButton onClick={()=>openFile(AppConfig.API + value.lien ,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})}
                      style={{
                        position: "absolute",
                        right: "0px",
                        top: "-50px",
                      }}
                    >
                      <img className="image" src="images/pdfIcon.png" />
                    </IconButton>

                    <div
                      className='dataCardContainer'
                     
                      
                    >
                      <p className="CardText"  data-tip  data-for={value ? 'nom'+value.id : ""}>
                        <span>Nom :</span> {value ? value.nom : ""}
                      </p>
                      <p className="CardText" data-tip data-for={value ? 'date'+value.id : ""}>
                        <span>Date :</span>
                        {value ? value.pubDate : ""}
                      </p>
                      <p className="CardText" data-tip  data-for={value ? 'version'+value.id : ""}>
                        <span>Version :</span>
                        {value ? value.version : ""}
                      
                      </p>
                      <p className="CardText" data-tip  data-for={value ? 'auteur' +value.id : ""}>
                        <span>Auteur :</span>
                        {value
                          ? value.docummentauthor
                            ? value.docummentauthor.nom +
                              " " +
                              value.docummentauthor.prenom
                            : ""
                          : ""}
                      </p>
                      <p className="CardText" data-tip  data-for={value ? 'langue'+value.id : ""}>
                        <span>Langue:</span>
                        {value ? value.langue : ""}
                      </p>

                      <p className="CardText" data-tip  data-for={value ? 'area'+value.id : ""}>
                        <span>Area:</span>
                        {value ? (value.documentPerimetre?(value.documentPerimetre.perimetreArea ? value.documentPerimetre.perimetreArea.areadesc :"") :"") : ""}
                      </p>

                      <p className="CardText" data-tip  data-for={value ? 'perimetre'+value.id : ""}>
                        <span>Perimetre:</span>
                        {value ? (value.documentPerimetre? value.documentPerimetre.perimetre :"") : ""}
                      </p>
                    </div>

                  </div>

                  <ReactTooltip id={value ? 'nom'+value.id : "n"} aria-haspopup="true" role="example" >
                    <p>{value ? value.nom : ""}</p>
                  </ReactTooltip>
                  <ReactTooltip id={value ? 'date'+value.id : "n"} aria-haspopup="true" role="example" >
                    <p> {value ? value.pubDate : ""}</p>
                  </ReactTooltip>
                  <ReactTooltip id={value ? 'version'+value.id : "n"} aria-haspopup="true" role="example" >
                    <p>{value ? value.version : ""}</p>
                  </ReactTooltip>
                  <ReactTooltip id={value ? 'auteur'+value.id : "n"} aria-haspopup="true" role="example" >
                    <p>{value
                          ? value.docummentauthor
                            ? value.docummentauthor.nom +
                              " " +
                              value.docummentauthor.prenom
                            : ""
                          : ""}</p>
                  </ReactTooltip>
                  <ReactTooltip id={value ? 'langue'+value.id : "n"} aria-haspopup="true" role="example" >
                    <p> {value ? value.langue : ""}</p>
                  </ReactTooltip>

                  <ReactTooltip id={value ? 'area'+value.id : "n"} aria-haspopup="true" role="example" >
                    <p> {value ? (value.documentPerimetre?(value.documentPerimetre.perimetreArea ? value.documentPerimetre.perimetreArea.areadesc :"") :"") : ""}</p>
                  </ReactTooltip>

                  <ReactTooltip id={value ? 'perimetre'+value.id : "n"} aria-haspopup="true" role="example" >
                    <p>  {value ? (value.documentPerimetre? value.documentPerimetre.perimetre :"") : ""}</p>
                  </ReactTooltip>

                </Paper>
              </Grid>
            );
          })
        : ""}
    </>
  );
});

const App = view(() => {
  if (appStore.isActiviteSelected) {
    return <MyView2 />;
  }
  if (appStore.isTypeSelected) {
    return <MyView />;
  }
  if (appStore.isDocSelected) {
    return <MyView3 />;
  }
});

function Navigation() {
  return (
    <>
      <App />
    </>
  );
}

class MyView extends Component {
  componentWillUnmount() {}

  componentDidMount() {
    GetDocType();
  }

  saveState() {
    alert("exiting");
  }
  render() {
    return <DocType />;
  }
}

class MyView2 extends Component {
  componentWillUnmount() {}

  componentDidMount() {
    GetActivite();
  }

  saveState() {
    alert("exiting");
  }
  render() {
    return <Activite />;
  }
}

class MyView3 extends Component {
  componentWillUnmount() {}

  componentDidMount() {
    GetDoc();
  }

  saveState() {
    alert("exiting");
  }
  render() {
    return <DocList />;
  }
}

export default Navigation;
