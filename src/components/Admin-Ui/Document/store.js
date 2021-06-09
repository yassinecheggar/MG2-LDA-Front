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
  documentPole: [],
  typeDocument: [],
  docummentauthor: [],
  documentdirection: [],
  documentPerimetre: [],
  documentArea: [],
  selectedAreaId:null,
  validator:[],
  date: null,
  documentActivite: [],
  ActiviteById: null,
  PoleById: null,
});

export default appStore;
