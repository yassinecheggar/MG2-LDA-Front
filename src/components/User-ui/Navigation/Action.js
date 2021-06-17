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

  NextStepT: () => {
    appStore.isActiviteSelected = false;
    appStore.isTypeSelected = true;
    appStore.isDocSelected=false;
  },

  previousStepA: () => {
    appStore.isTypeSelected = false;
    appStore.isActiviteSelected = true;
    appStore.isDocSelected=false;
  },
  previousStepD: () => {
    appStore.isTypeSelected = false;
    appStore.isActiviteSelected = false;
    appStore.isDocSelected=true;
  },

  handlchnageSelect: (event) => {
    appStore.colFilter = event.target.value;
  },
  
};

export default appActions;
