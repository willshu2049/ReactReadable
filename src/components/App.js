import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import '../App.css'

import Header from './Header'
import DefaultView from './DefaultView'
import PostForm from './PostForm'
import PostDetail from './PostDetail'
import Footer from './Footer'

class App extends Component {

  // You can always put some components in parallel with Route components to make those components appear in every page.

  render() {
    return (
      <div className='container'>
        <Header />
          <Route path='/create' component={PostForm}/>
          <Route path='/posts/:id' component={PostDetail}/>
          <Route exact path='/' component={DefaultView}/>
        <Footer />
      </div>
    )
  }
}

export default App;
