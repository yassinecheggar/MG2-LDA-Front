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
  resources:[],

});

export default appStore;
