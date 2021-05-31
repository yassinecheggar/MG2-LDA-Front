import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Dashboard from '../Dashboard/Dashboard'
import { green } from '@material-ui/core/colors';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import SearchIcon from '@material-ui/icons/Search';
import FeedbackIcon from '@material-ui/icons/Feedback';
import NavigationIcon from '@material-ui/icons/Navigation';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SignIn from '../account/SignIn'
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import UserMenu from './UserMenu';

import {  BrowserRouter as Router, Route, Switch , useRouteMatch,NavLink,useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

import IndexPage  from  '../IndexPage'
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
    background: 'linear-gradient(0deg, rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url("images/LogoMG2.png");  ',
  
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
    background: '#636363',
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

export default function Navbar() {


  let match = useRouteMatch();


  const {url , path} = useRouteMatch();


  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openl, setOpenl] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  /*neasted list  to  do  *------------------------------------------------------------------------ multi  neasted list */
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
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
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
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

           <AdminMenu url={url}/>

        {/* 
        <List  component="nav" >
    <ListItem button  >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NavigationIcon />
      </ListItemIcon>
      <ListItemText primary="Navigation" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CastForEducationIcon />
      </ListItemIcon>
      <ListItemText primary="Training" />
    </ListItem>
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <GroupWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
      {openl ? <ExpandLess /> : <ExpandMore />}
    </ListItem>



    <Collapse in={openl} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Question" />
          </ListItem>


          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="FeedBack" />
          </ListItem>



          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <WbIncandescentIcon />
            </ListItemIcon>
            <ListItemText primary="Best Practice" />
          </ListItem>

        </List>
      </Collapse>

    </List>
        <Divider />
        <List>{secondaryListItems}</List>*/}

  
      </Drawer>



      <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>

          
        <Switch>
        <Route path={`${path}/Dashboard`}>
          <Dashboard />
        </Route>
        <Route path={`${path}/SignIn`}>
          <SignIn />
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
}

