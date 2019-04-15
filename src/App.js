import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from './components/notFound/NotFound'
import TasksPage from './components/routes/TaskPage'
import Modal from './components/ui/Modal'
import GlobalError from './components/globalError/GlobalError'
import Layout from './components/layout/Layout'
import 'normalize.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalError />
        <Layout>
          <Modal />
          <Switch>
            <Route path="/" component={TasksPage} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App
