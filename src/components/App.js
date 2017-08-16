import React, { Component } from 'react'

import '../App.css'

import * as ReadableAPI from '../utils/ReadableAPI'
import ListCategories from './ListCategories'
import ListPosts from './ListPosts'

class App extends Component {
  state = {
    posts: [],
    categories: []
  }

  componentDidMount() {
    ReadableAPI.allPosts().then(posts => {
      this.setState({posts})
      console.log(this.state.posts)
    })
    ReadableAPI.allCategories().then(categories => {
      this.setState({categories})
      console.log(this.state.categories)
    })
  }

  render() {
    return (
      <div className="App">
        <ListCategories categories={this.state.categories}/>
        <ListPosts posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
