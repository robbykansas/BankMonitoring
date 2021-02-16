import axios from '../config/axios'

export function fetchDataBank() {
  return (dispatch) => {
    dispatch({
      type: 'loading/setLoading',
      loading: true
    })
    axios.get('/')
      .then(result => {
        dispatch({
          type: 'dataBank/setDataBank',
          dataBank: result.data
        })
        let filtering = []
        result.data.forEach(singleData => {
          let periode = singleData.ProcessedDatum.BankDatum.periode
          if (filtering.indexOf(periode) < 0) {
            filtering.push(periode)
          }
        })
        dispatch({
          type: 'filterPeriode/setFilterPeriode',
          filterPeriode: filtering
        })
        dispatch({
          type: 'periode/setPeriode',
          periode: filtering[0]
        })
        dispatch({
          type: 'loading/setLoading',
          loading: false
        })
      })
      .catch(e => {
        dispatch({
          type: 'error/setError',
          error: e
        })
      })
  }
}

export function setPeriode(payload){
  return (dispatch) => {
    dispatch({
      type: 'periode/setPeriode',
      periode: payload
    })
  }
}

export function fetchLog(){
  return (dispatch) => {
    dispatch({
      type: 'loading/setLoading',
      loading: true
    })
    axios.get('/log')
      .then(result => {
        dispatch({
          type: 'log/setLog',
          log: result.data
        })
        dispatch({
          type: 'loading/setLoading',
          loading: false
        })
      })
      .catch(e => {
        dispatch({
          type: 'error/setError',
          error: e
        })
      })
  }
}

export function postLog(payload){
  return (dispatch) => {
    axios.post('/log', payload)
      .then(result => {
        dispatch({
          type: 'addLog/setAddLog',
          addLog: result.data
        })
      })
  }
}
