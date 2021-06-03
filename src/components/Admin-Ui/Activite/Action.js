import appStore from "./store";

const appActions = {
  incrementCount: () => {
    appStore.count++;
  },

  decrementCount: () => {
    appStore.count--;
  },

  toggleWord: () => {
    const { word } = appStore;

    appStore.word = word === "irasshaimase" ? "youkoso" : "irasshaimasu";
  },

  changeTestWord: () => {
    console.log("change test word");
    appStore.testWord = "irasshaimase";
  },
  handleOpen: () => {
    appStore.open = true;
  },
  handleClose: () => {
    appStore.open = false;
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
