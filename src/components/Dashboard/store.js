import { store } from '@risingstack/react-easy-state';

const appStore = store({

  AddedLast: [],
  deleted: [],
  edited: [],
  dash: [],
  count:[],
  downloaded:[],

});

export default appStore;
