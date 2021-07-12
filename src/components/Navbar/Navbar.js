import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Dashboard from '../Dashboard/Dashboard';
import Delivrable from '../Admin-Ui/Delivrable/Delivrable';
import Area from '../Admin-Ui/Area/Area';
import Direction  from '../Admin-Ui/Direction/Direction';
import Pole  from '../Admin-Ui/Pole/Pole';
import  Type   from '../Admin-Ui/Type/Type';
import  User from '../Admin-Ui/User/User';
import  Perimetre from  '../Admin-Ui/Perimetre/Perimetre';
import  Author from  '../Admin-Ui/Author/Authore';
import  Image from  '../Admin-Ui/Image/Image';
import  Question from  '../Admin-Ui/Question/Question';
import  FeedBack from  '../Admin-Ui/FeedBack/FeadBack';
import  BestPractice from  '../Admin-Ui/BestPractice/BestPractice';
import  Document from  '../Admin-Ui/Document/Document';
import  Comment from  '../Admin-Ui/Comment/Comment';
import Modififcation from  '../Admin-Ui/Modification/Modification';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import appStore from "../account/store";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AppConfig from '../Global';
import DashboardAdmin from '../Dashboard/DashboardAdmin';
import {  view } from "@risingstack/react-easy-state";
import {  BrowserRouter as Router, Route, Switch , useRouteMatch,NavLink,useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import  CompActivite from  '../Admin-Ui/Activite/CompActivite';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
   
    
  
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: 'black',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    background: 'linear-gradient(45deg, rgba(106, 113, 138,0.1), rgba(0, 0, 0,1))',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      
    }),
    
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    background: 'linear-gradient(0deg, rgba(0, 0, 0,0.7), rgba(0, 0, 0,0.3)), url("images/draweradmin.jpg");  ',
  
  
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    background:
    'linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.9)) ',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "Center",
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


function init() {
  appStore.Loged= Boolean (window.sessionStorage.getItem("Loged"));
  // todo :  case jwt expired 
}


function CheckIfLoged(history) {
      
        
  
      axios.get( AppConfig.API +'User/Chek',{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(response  =>{
    

    }, error => {
      if (error.response.status === 401) {
        window.sessionStorage.setItem("Loged",false);
        history.push("/");
      }
    });
  }
   

export default function Navbar() {

  return(<App/>)

}

const App = view(() => {
  const history = useHistory();
  CheckIfLoged(history);
  let match = useRouteMatch();
  const {url , path} = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openl, setOpenl] = React.useState(false);
  const [image, setimage] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpenl(!openl);
  }; 
  
  const handleImage = () => {
    setimage(true);
  }; 


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  /** Nested  list  */
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>

          </Typography>
          <IconButton color="inherit" component={NavLink} to="/">
           
              <ExitToAppIcon />
            
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer 
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} style={{   backgroundImage: "url(images/LogoMG2.png)"}}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{color:'white'}} />
          </IconButton>
        </div>
        <Divider />

           <AdminMenu url={url}/>
  
      </Drawer>

      <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3}>

          
        <Switch> 
          
          <Route path={`${path}/CompActivite`}>
        <CompActivite />
        </Route>
        <Route path={`${path}/Dashboard`}>
          <DashboardAdmin />
        </Route>
        <Route path={`${path}/Delivrable`}>
          <Delivrable />
        </Route>

        <Route path={`${path}/Area`}>
          <Area />
        </Route>

        <Route path={`${path}/Direction`}>
          <Direction />
        </Route>

        <Route path={`${path}/pole`}>
          <Pole />
        </Route>
       

        <Route path={`${path}/Type`}>
          <Type />
        </Route>

        <Route path={`${path}/User`}>
          <User />
        </Route>
       
        <Route path={`${path}/Perimetre`}>
          <Perimetre />
        </Route>
       

        <Route path={`${path}/Author`}>
          <Author />
        </Route>

        <Route path={`${path}/Picture`}>
          <Image />
        </Route>

        <Route path={`${path}/Question`}>
          <Question />
        </Route>

        <Route path={`${path}/FeedBack`}>
          <FeedBack />
        </Route>

        <Route path={`${path}/BestPractice`}>
          <BestPractice />
        </Route>

        <Route path={`${path}/Document`}>
          <Document />
        </Route>
       

        <Route path={`${path}/Comment`}>
          <Comment />
        </Route>
       

        <Route path={`${path}/Modification`}>
          <Modififcation />
        </Route>

      
       
        
        
      </Switch>

        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
     
   
    
        </div>
  );
})

