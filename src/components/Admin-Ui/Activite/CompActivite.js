import React ,{ useState }  from 'react'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import faker from "faker";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { Height } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Activiteadd from './Activiteadd';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';  
import Slide from '@material-ui/core/Slide';


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

      TitleMargine:{
        marginTopap: 0 ,
        textAlign:"center",
    color: "#474747",
      },
    button: {
        marginLeft:5
      },

      addButton: {
        fontSize:20,
        background: "#000000",
      },
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
  }));

  
  const columns = [
    { field: "id", headerName: "Id" , flex:0.1 },
    { field: "fname", headerName: "Nome", flex:0.2},
    { field: "lname", headerName: "Cognome", flex:0.2},
    { field: "address", headerName: "Indirizzo", flex:0.2 },
    { field: "email", headerName: "Email" , flex:0.2},
    { field: "phone", headerName: "Telefono" , flex:0.1},
    {
      field: "color",
      headerName: "X",
       flex:0.2,
      renderCell: () => (
        <>
        <IconButton style={{ color: '#e81e32'}} onClick={function(){Delete()}}>
         <DeleteIcon />
        </IconButton>
        <IconButton  style={{ color: '#0091ff'}}onClick={function(){Edit()}} >
         <EditIcon />
        </IconButton>
      </>
      )
    },
  ];

  const rows = [];

  function generateRows() {
    for (var i = 0; i < 20; i++) {
      var fName = faker.name.firstName();
      var lName = faker.name.lastName();
      var address = faker.address.city();
      var email = faker.internet.exampleEmail();
      var phone = faker.phone.phoneNumber();
      //var color = faker.commerce.color();
  
      rows.push({
        id: i,
        fname: fName,
        lname: lName,
        address: address,
        email: email,
        phone: phone
        //color: ""
      });
    }
  }
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  generateRows();
  var IDselected = null;

  function Edit() {
    console.log("Edit", IDselected)
  }
  
  function Delete() {
    console.log("delete", IDselected)
  }

function CompActivite() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [selectionModel, setSelectionModel] = useState([]);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

     const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
    
    return (
        <>
        <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.TitleHeight}> <Typography component="h3" variant="h3" className={classes.TitleMargine}> Activité </Typography></Paper>
        </Grid>

                <Grid item xs={12} md={12} lg={12}>
                        <Paper className={fixedHeightPaper}>
                            <div style={{Height:30 ,  marginBottom:10, display:"flex", justifyContent:"flex-end"}}> <IconButton  aria-label="add activite" style={{ color: '#039632'}} onClick={handleOpen}> <AddCircleIcon /></IconButton></div>
                        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}

        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection.selectionModel);
      }}
      onRowSelected={(e) => {IDselected = e.data.fname }}
      
      onSelectionModelChange ={(e) => {
        const selectedIDs = new Set(e.selectionModel);
        const selectedRowData = rows.filter((row) =>
          selectedIDs.has(row.id)
        );
        //console.log("selected rowData:", selectedRowData.id);
      }}
    
      />
              </Paper>

             
            </Grid>


    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2000
        }}
      >

        <Fade in={open}>
          <Activiteadd/>
        </Fade>
      </Modal>


      <Dialog
    open={openDialog}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Let Google help apps determine location. This means sending anonymous location data to
        Google, even when no apps are running.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog} color="primary">
        Disagree
      </Button>
      <Button onClick={handleCloseDialog} color="primary">
        Agree
      </Button>
    </DialogActions>
  </Dialog>

        </>
    )
}



export default CompActivite

