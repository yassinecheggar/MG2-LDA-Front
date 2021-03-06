import appStore from "./store";

const appActions = {

  handleOpen: () => {
    appStore.data=[];
    appStore.open = true;
  },
  handleClose: () => {
    appStore.open = false;
    appStore.data=[] ;
    appStore.documentPerimetre=[];
    
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

  handlPerimetre: () => {
    console.log(`Update`);
  },
  
};

export default appActions;
