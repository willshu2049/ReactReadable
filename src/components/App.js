import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import '../App.css'

import Header from './Header'
import DefaultView from './DefaultView'
import CreateEditView from './CreateEditView'
import PostDetail from './PostDetail'
import Footer from './Footer'

class App extends Component {

  // You can always put some components in parallel with Route components to make those components appear in every page.

  render() {
    return (
      <div className='container'>
        <Header />
        <Route exact path='/' render={()=>(
          <DefaultView />
        )}/>
        <Route path='post-detail' render={()=>(
          <PostDetail />
        )}/>
        <Route path='/create' render={()=>(
          <CreateEditView />
        )}/>
      <Footer />
      </div>
    )
  }
}

export default App;
