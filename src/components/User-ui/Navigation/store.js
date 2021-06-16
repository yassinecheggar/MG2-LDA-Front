import { store } from '@risingstack/react-easy-state';

const appStore = store({
  open: false,
  dialog : false,
  data: [],
  success:false,
  error: false,
  GridData:[],
  
  rows: [],
  Res:[],

  Typerows: [],
  Typeres: [],

  Docrows: [],
  Docres: [],

  edit: false,

  hasResult:false,
  TypehasResult:false,
  DochasReslut:false,

  isActiviteSelected:true,
  isTypeSelected:false,
  isDocSelected:false,

  colFilter :'' ,
  

});

export default appStore;
