import { store } from '@risingstack/react-easy-state';

const appStore = store({
  count: 0,
  word: 'irasshaimase',
  testWord: 'hello there',
  open: false,
  dialog : false,
  data: [],
  success:false,
  error: false,
  GridData:[],
  rows: [],
  edit: false

});

export default appStore;
