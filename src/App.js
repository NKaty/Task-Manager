import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import NotFound from './components/notFound/NotFound'
import TasksPage from './components/routes/TaskPage'
import Modal from './components/ui/Modal'
import Header from './components/header/Header'
import GlobalError from './components/globalError/GlobalError'
import Layout from './components/layout/Layout'
import { adminAccessSelector } from './selectors'
import { isAdminCheck } from './actions'
import 'normalize.css'

class App extends Component {
  componentDidMount() {
    this.props.isAdminCheck()
  }

  render() {
    return (
      <Fragment>
        <GlobalError />
        <Layout>
          <Modal />
          <Header isAdmin={this.props.isAdmin} />
          <Switch>
            <Route path="/" component={TasksPage} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: adminAccessSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { isAdminCheck }
)(App)
