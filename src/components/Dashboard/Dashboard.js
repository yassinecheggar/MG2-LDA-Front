import React,{useEffect,Component } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import  DynamicChart  from  './Chart2';
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
  import { useParams } from 'react-router-dom';
import Deposits from "./Deposits";
import  CheckboxList ,{ Question} from  './ListDoc'
import  './Dash.css';
import appStore from "./store";
import {  view } from "@risingstack/react-easy-state";
import axios from 'axios';
import AppConfig from '../Global';
import {Animated} from "react-animated-css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background:
      'linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url("images/home3.jpg");  ',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "Center",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 135,
  },
  fixedHeight2: {
    height: 350,
  },

  Grid: {
    position:'relative',
     marginTop:'50px'
  },
}));

function Getlast() {
  try {
     axios.get( AppConfig.API +'Document/GetLast',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
   
       if(response.data){     
           appStore.AddedLast = response.data;   
         
       }
   });
  } catch (err) {
    console.log(err)
  }
 }
//********************************* to do    oooooooooooooooooooooooooooooo */
 function CheckValidity() {
  try {
    axios.get( AppConfig.API +'User/Chek',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
  
  });
 } catch (err) {
   AppConfig.loged=false;
 }
  
 }

 function GetDash() {
  try {
     axios.get( AppConfig.API +'Document/GetCountDash',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
   
       if(response.data){     
           appStore.dash = response.data;   
         
       }
   });
  } catch (err) {
    
  }
 }

 function GetlastEdit(){
  try {
     axios.get( AppConfig.API +'Document/GetLastMode',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
   
       if(response.data){     
           appStore.edited = response.data;   
         
       }
   });
  } catch (err) {
    console.log(err)
  }
 }

 
 function GetUnAnswered () {
  try {
     axios.get( AppConfig.API +'Question/getNoneAnswerd',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
   
       if(response.data){     
           appStore.UnAnswered = response.data;   
         
       }
   });
  } catch (err) {
    
  }
 }

 function GetCountdocType () {
  try {
     axios.get( AppConfig.API +'View/getDocumentTypeCount',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
   
       if(response.data){     
           appStore.downloaded = response.data;   
         
       }
   });
  } catch (err) {
    
  }
 }
 
 function GetCountdocDownload() {
  try {
     axios.get( AppConfig.API +'View/getDocumentCountByType',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
   
       if(response.data){     
           appStore.count = response.data;   
         
       }
   });
  } catch (err) {
    
  }
 }
 
 

const App = view(() => {

  const classes = useStyles();
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
 

  

  return (
   <>

          <Grid item xs={12} md={5} lg={3} className={classes.Grid}>
          <Animated animationIn="bounceInDown" animationOut="fadeOut" animationInDuration={2000} isVisible={true} >
            <Paper className={fixedHeightPaper}>
              <Deposits  color='orange' title='Document' subtitle={appStore.dash[0]} link='images/doc.png'/>
            </Paper>
            </Animated>
          </Grid>

          <Grid item xs={12} md={5} lg={3}  className={classes.Grid}>
          <Animated animationIn="bounceInDown" animationOut="fadeOut" animationInDuration={2100} isVisible={true} >
            <Paper className={fixedHeightPaper}>
              <Deposits  color='green' title='Best Practice' subtitle={appStore.dash[1]} link='images/creativity.png'/>
            </Paper>
            </Animated>
          </Grid>

          <Grid item xs={12} md={5} lg={3} className={classes.Grid}>
          <Animated animationIn="bounceInDown" animationOut="fadeOut" animationInDuration={2200} isVisible={true} >
            <Paper className={fixedHeightPaper}>
              <Deposits  color='#ff0059' title='Question' subtitle={appStore.dash[2]} link='images/question.png' />
            </Paper>
            </Animated>
          </Grid>

          <Grid item xs={12} md={5} lg={3} className={classes.Grid}>
          <Animated animationIn="bounceInDown" animationOut="fadeOut" animationInDuration={2300} isVisible={true} >
            <Paper className={fixedHeightPaper}>
              <Deposits  color='#00c4fa' title='Feedback' subtitle={appStore.dash[3]} link='images/good-feedback.png'/>
            </Paper> 
            </Animated>
          </Grid>

          {/* Chart */}

          
            <Grid item xs={12} md={12} lg={12}>
            <Animated animationIn="pulse" animationOut="fadeOut" animationInDuration={2500} isVisible={true} >
              <Paper className={classes.fixedHeight2}>

                <div style={{width:'100%', display:'flex' , flexDirection:'row',justifyContent:"center" ,}}>
                  <Typography variant='h5' style={{marginTop:"10px",  marginBottom:"10px"}}> Popular Document </Typography>
                </div>
              
                <DynamicChart data1={appStore.downloaded} data2={appStore.count}/>
               
              </Paper>
              </Animated>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
            <Animated animationIn="slideInLeft" animationOut="fadeOut" animationInDuration={2600} isVisible={true} >
              <Paper className={classes.fixedHeight2}>
              <div style={{width:'100%', display:'flex' , flexDirection:'row',justifyContent:"center" ,}}>
                  <Typography variant='h5' style={{marginTop:"10px",  marginBottom:"10px"}}> Last added Documents </Typography>
                </div>
                <div style={{height:"80%",width:'100%'  , overflow:'auto'}}>

                   <CheckboxList  icon='add' img='images/document.png' data={appStore.AddedLast} />
                </div>
              </Paper>
              </Animated>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
            <Animated animationIn="slideInRight" animationOut="fadeOut" animationInDuration={2600} isVisible={true} >
              <Paper className={classes.fixedHeight2}>
              <div style={{width:'100%', display:'flex' , flexDirection:'row',justifyContent:"center" ,}}>
                  <Typography variant='h5' style={{marginTop:"10px",  marginBottom:"10px"}}> Last Modified Documents </Typography>
                </div>

                <div style={{height:"80%",width:'100%'  , overflow:'auto'}}>
                   <CheckboxList icon='edit' img='images/document.png' data={appStore.edited} date="lola"/>
                </div>
               
              </Paper>
              </Animated>
            </Grid>

            

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.fixedHeight2}>
              <div style={{width:'100%', display:'flex' , flexDirection:'row',justifyContent:"center" ,}}>
                  <Typography variant='h5' style={{marginTop:"10px",  marginBottom:"10px"}}> Unanswered questions </Typography>
                </div>

                <div style={{height:"80%",width:'100%'  , overflow:'auto'}}>
                   <Question color="#ff9b21" img='images/document.png' icon='del'  data={appStore.UnAnswered}/>
                </div>
               
              </Paper>
            </Grid>

          {/* Recent Orders */}
          {/** 
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>*/}

</>
        
  
  );
  
})

export default function Dashboard() {

  return(<MyView/>);
  
}


class MyView extends Component {
  componentWillUnmount() {
    
  }

  componentDidMount(){
    Getlast();
    GetlastEdit();
    GetDash();
    GetUnAnswered();
    GetCountdocType();
    GetCountdocDownload();
  }

  saveState() {
    alert("exiting")
  }
  render() {

    return (
        <>
          <App/>
        </>
    )
}
}

