import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import '../App.css'

import Header from './Header'
import DefaultView from './DefaultView/DefaultView'
import CategoryView from './CategoryView'
import PostDetailView from './PostDetailView/PostDetailView'
import CreateEditView from './CreateEditView'
import Footer from './Footer'

class App extends Component {

  // You can always put some components in parallel with Route components to make those components appear in every page.

  render() {
    return (
      <div className='app-container'>
        <Header />
        <Route exact path='/' component={DefaultView} />
        <Route path='/category/:category' component={CategoryView} />
        <Route path='/posts/:id' component={PostDetailView} />
        <Route path='/create' component={CreateEditView} />
        <Route path='/edit/post/:id' component={CreateEditView} />
        <Footer />
      </div>
    )
  }
}

export default App;
