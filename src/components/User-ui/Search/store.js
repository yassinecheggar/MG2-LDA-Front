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
  comment:[],
  update: [],
  selected : null,
  openModal :  false , 
  openModal :  false , 
  linktoImage : '',
});

export default appStore;
