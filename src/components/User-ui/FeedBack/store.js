import { store } from '@risingstack/react-easy-state';

const appStore = store({
  open: false,
  dialog : false,
  data: [],
  success:false,
  error: false,
  GridData:[],
  rows: [],
  edit: false,
  openM : false ,
  linktoImage:'',
  Reponse:[],
  repoonsetext:"",
  StepperOne:true,
  activeStep: 0,
  completed: false,
  ResId: null,

});

export default appStore;
