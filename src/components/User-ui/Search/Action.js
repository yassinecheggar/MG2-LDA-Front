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
  handleOpenModal: () => {
    appStore.data=[]
    appStore.openModal = true;
  },
  handleCloseModal: () => {
    appStore.openModal = false;
    appStore.data=[] ;
    appStore.linktoImage="";
    
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
  
};

export default appActions;
