import appStore from "./store";

const appActions = {

  handleOpen: () => {
    appStore.data=[]
    appStore.open = true;
  },
  handleClose: () => {
    appStore.open = false;
    appStore.data=[] ;
    
  },

  handleCloseDialog: () => {
    appStore.dialog = false;
     },

  handlOpenDialog: () => {
    appStore.dialog = true;
  },
  handlError: () => {
    appStore.error = true;
  },

  handleOpenModal: () => {
    appStore.data=[]
    appStore.openM = true;

  },
  handleCloseModal: () => {
    if(!appStore.completed || appStore.Reponse.length!=0){

    appStore.openM = false;
    appStore.data=[] ;
    appStore.linktoImage='';
    appStore.StepperOne = true;
    appStore.activeStep= 0;
    appStore.completed=false;
    appStore.ResId=null;
    appStore.repoonsetext="";
  }
    
  },

  handleFileUpload : event => {
    appStore.linktoImage = event.target.value;
       console.log(event.target.value);
      
    },
    handleStepperone: () => {
      appStore.StepperOne = false;
      appStore.activeStep= 1;
      appStore.completed=true;
      appStore.Reponse=[];
    },
};

export default appActions;
