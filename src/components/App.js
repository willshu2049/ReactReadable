import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import '../App.css'

import DefaultView from './DefaultView'
import CreateEditView from './CreateEditView'

class App extends Component {

  render() {
    return (
      <div className='container'>
        <Route exact path='/' render={()=>(
          <DefaultView />
        )}/>
        <Route path='/create' render={()=>(
          <CreateEditView />
        )}/>
      </div>
    )
  }
}

export default App;
