import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
  import { useParams } from 'react-router-dom';
import Deposits from "./Deposits";



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
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 200,
  },

  Grid: {
    position:'relative',
     marginTop:'50px'
  },
}));

export default function Dashboard() {

  let { topicId } = useParams();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
   <>

          <Grid item xs={12} md={5} lg={3} className={classes.Grid}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} lg={3}  className={classes.Grid}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} lg={3} className={classes.Grid}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} lg={3} className={classes.Grid}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid>

          {/* Chart */}

          
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                
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
}
