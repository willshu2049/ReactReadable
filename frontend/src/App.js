import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import Header from './components/Header'
import DefaultView from './routes/DefaultView'
import CategoryView from './routes/CategoryView'
import PostDetailView from './routes/PostDetailView'
import CreateEditView from './routes/CreateEditView'
import Footer from './components/Footer'

class App extends Component {

  // You can always put some components in parallel with Route components to make those components appear in every page.

  // note there are two PostDetailView routes, one for CategoryView, one for DefaultView

  render() {
    return (
      <div className='app-container'>
        <Header />
        <div className='main'>
          <Switch>
            <Route path='/create' component={CreateEditView} />
            <Route path='/edit/:cat/:id' component={CreateEditView} />
            <Route path='/:category/:postId/:categoryQuery' component={PostDetailView} />
            <Route path='/:category/:postId' component={PostDetailView} />
            <Route path='/:category' component={CategoryView} />
            <Route exact path='/' component={DefaultView} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
