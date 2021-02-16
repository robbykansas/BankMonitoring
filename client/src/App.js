import React from 'react'
import { BrowserRouter as Router ,Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Upload from './pages/Upload'
import DataBank from './pages/DataBank'
import Log from './pages/Log'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/data'>
            <DataBank />
          </Route>
          <Route path='/log'>
            <Log />
          </Route>
          <Route path='/'>
            <Upload />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
