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
    appStore.openM = false;
    appStore.data=[] ;
    appStore.linktoImage='';
  },

  handleFileUpload : event => {
    appStore.linktoImage = event.target.value;
       console.log(event.target.value);
      
    },
  
};

export default appActions;
