import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const initialState = {
  dataBank: [],
  periode: '',
  filterPeriode: [],
  log: [],
  error: null,
  loading: true
}

function reducer(state = initialState, action){
  switch(action.type) {
    case "loading/setLoading":
      return { ...state, loading: action.loading }
    case "error/setError":
      return { ...state, error: action.error }
    case "dataBank/setDataBank":
      return { ...state, dataBank: action.dataBank }
    case "periode/setPeriode":
      return { ...state, periode: action.periode}
    case "filterPeriode/setFilterPeriode":
      return { ...state, filterPeriode: action.filterPeriode}
    case "log/setLog":
      return { ...state, log: action.log}
    case "addLog/setAddLog":
      return { ...state, log: [...state.log, action.addLog]}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store