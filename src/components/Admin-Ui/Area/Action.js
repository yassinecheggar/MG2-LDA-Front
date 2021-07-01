import appStore from "./store";

const appActions = {
  
  handleOpen: () => {
    appStore.data=[]
    appStore.open = true;
  },
  handleClose: () => {
    appStore.open = false;
    appStore.data=[] ;
    appStore.edit=false;
    
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
