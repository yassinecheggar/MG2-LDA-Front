import React, { useState,Component  } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FeedBackAdd from "./FeedBackAdd";

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
    height: 600,
  },

  TitleHeight: {
    height: 60,
  },

  TitleMargine: {
    marginTopap: 0,
    textAlign: "center",
    color: "#00d4bb",
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
  { field: "id", headerName: "Id", flex: 0.1 },
  { field: "activiteFeed", headerName: "Activite", flex: 0.2  , valueGetter : ({ value }) => value? value.activite : ""},
  { field: "delivrableFeed", headerName: "Delivrable ", flex: 0.1 , valueGetter : ({ value }) => value?  value.delivrable : "" },
  { field: "feedback", headerName: "Feedback", flex: 0.2 },
  { field: "problemType", headerName: "ProblemType", flex: 0.2 },
  { field: "date", headerName: "Date", flex: 0.1 },
  { field: "phase", headerName: "Phase", flex: 0.1 },
  { field: "validationDate", headerName: "Date Validation", flex: 0.1 },
  { field: "userFeedback", headerName: "User", flex: 0.1 ,valueGetter : ({ value }) =>value? value.nom+" "+ value.prenom : ""},
  {
    field: "color",
    headerName: "Action",
    flex: 0.1,
    renderCell: () => (
      <>
        <IconButton
          style={{ color: "#e81e32" }}
          onClick={function () {
            Delete();
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          style={{ color: "#0091ff" }}
          onClick={function () {
            Edit();
          }}
        >
          <EditIcon />
        </IconButton>
      </>
    ),
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//generateRows(appStore.DataGrid);
var IDselected = null;

function Edit() {
  console.log("Edit", IDselected);
  appStore.edit=true;
  appStore.open=true;

}

function Delete() {
  //console.log("delete", appStore.data[0].id);
  appStore.dialog=true;
}

async  function DeleteRequest(){

  var status =  ( await axios.delete(AppConfig.API+`Feedback/Delete/`+appStore.data[0].id) ).status;
  console.log("delete Status" , status);
  appStore.dialog= false;

  GetData();

}

function GetData() {
  axios.get( AppConfig.API +'Feedback/GetAll').then(response  =>{

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
            variant="h3"
            className={classes.TitleMargine}
          >
            {" "}
            Feedback{" "}
          </Typography>
       
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper}>
          <div
            style={{
              Height: 30,
              marginBottom: 10,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {" "}
            <IconButton
              aria-label="add Feedback"
              style={{ color: "#039632" }}
              onClick={appActions.handleOpen}
            >
              {" "}
              <AddCircleIcon />
            </IconButton>
          </div>
          <DataGrid
            rows={appStore.rows}
            columns={columns}
            pageSize={10}
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
          <FeedBackAdd />
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

function Feedback() {
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

export default Feedback;
