import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
import Search  from '../User-ui/Search/Search';
import  Navigation  from  '../User-ui/Navigation/Navigation';
import  Trainning  from  '../User-ui/Trainning/Trainning';
import  BestPractice  from  '../User-ui/BestPractice/BestPractice';
import  Question  from  '../User-ui/Question/Question';
import  FeedBack  from  '../User-ui/FeedBack/Feedback';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AppConfig from '../Global';
import appStore from "../account/store";
import {  view } from "@risingstack/react-easy-state";
import {  BrowserRouter as Router, Route, Switch , useRouteMatch,NavLink,useParams } from 'react-router-dom';
import UserMenu from './UserMenu';
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

const drawerWidth = 230;

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
    background: 'linear-gradient(45deg, rgba(0, 0, 0,0.1), rgba(0, 0, 0,1))',
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
    background: 'linear-gradient(0deg, rgba(0, 0, 0,0.8), rgba(0, 0, 0,0.6)), url("images/drawerimg.jpg");  ',
    
  
  
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

init();
const App = view(() => {

  let match = useRouteMatch();
  const {url , path} = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openl, setOpenl] = React.useState(false);
  const history = useHistory();

  CheckIfLoged(history);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpenl(!openl);
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
          <Tooltip title="Log-out">
          <IconButton color="inherit" component={NavLink} to="/">
              <ExitToAppIcon />
          </IconButton>
          </Tooltip>
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
            <ChevronLeftIcon style={{color:'white'}}/>
          </IconButton>
        </div>
        <Divider />

            <div >
           <UserMenu url={url}  />
           </div>
        
      </Drawer>



      <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3}>

          { appStore.Loged ?

       
        <Switch> 
          
          <Route path={`${path}/Search`}>
        <Search />
        </Route>
        <Route  path={`${path}/Dashboard` }>
          <Dashboard />
        </Route>

        <Route path={`${path}/Navigation`}>
          <Navigation />
        </Route>
       

        <Route path={`${path}/Trainning`}>
          <Trainning />
        </Route>


        <Route path={`${path}/Bestpractice`}>
          <BestPractice />
        </Route>

        <Route path={`${path}/Question`}>
          <Question />
        </Route>

        <Route path={`${path}/FeedBack`}>
          <FeedBack />
        </Route>
       
       
  
      </Switch>
      :
      ""
   }
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main> 
    </div>
  );
})

export default function NavbarUser() {
       
        return(
          <App/>

        );
}

