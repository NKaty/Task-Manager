import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from './components/notFound/NotFound'
import TasksPage from './components/routes/TaskPage'
import 'normalize.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={TasksPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
