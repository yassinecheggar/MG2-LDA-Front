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

  handlClick: (event) => {
    appStore.selectOne = event.target.value;
  },
  
};

export default appActions;
