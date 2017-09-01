import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Button, Form, Grid, Statistic, Icon, Segment, Header, Divider } from 'semantic-ui-react'

import { votePost, updateSortMethod, selectCategory } from '../../actions/actions'
import { sortByVote, sortByDate } from '../../utils/sort'

class PostsIndex extends React.Component {

  onClickCategory = (e) => {
    this.props.selectCategory(e.target.id)
  }

  render () {
    const { votePost, sortMethod, updateSortMethod } = this.props
    let { posts } = this.props

    // unobjectify posts into an array
    posts=_.map(posts)

    // filter out all deleted posts
    posts=_.filter(posts, post=>!post.deleted)

    // sort the posts locally in the component
    posts && (sortMethod === 'voteScore') ? posts.sort(sortByVote) : posts.sort(sortByDate)

    return (
      <Grid>

        <Grid.Row>
          <Grid.Column width={12}>
            <Button color='blue' icon='add' content='New Post' as={Link} to='/create'></Button>
          </Grid.Column>
          <Grid.Column style={{display: 'inline-block'}} width={4}>
            <Form
              style={{display: 'inline-block'}}
              >
              <select
                value={sortMethod}
                onChange={updateSortMethod}
                style={{width: 8 + 'em', height: 2.5 +'em', display: 'inline-block'}}
                >
                <option value='voteScore'>Top Score</option>
                <option value='timestamp'>Most Recent</option>
              </select>
            </Form>
          </Grid.Column>
        </Grid.Row>

        {posts.map( (post) => (
          <Grid.Row key={post.id}>
            <Segment basic style={{marginBottom: 0 + 'px'}}>
              <Statistic horizontal value={post.voteScore} label='likes' style={{display: 'block'}} />
              <Button basic color='green' name={'upVote'} icon='like outline' value={post.id} onClick={(e, data)=>votePost(e, data)}/>
              <Button basic color='red' name={'downVote'} icon='dislike outline' value={post.id} onClick={(e, data)=>votePost(e, data)}/>
            </Segment>

            <Grid.Column verticalAlign='middle' width={12}>
              <p className='authorAndDate'>
                <Icon name='user'/>{post.author}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Icon name='clock'/>{(new Date(Number(post.timestamp))).toString().substr(0, 21)}
              </p>
              <Link className='post-title' to={`/posts/${post.id}`}>{post.title}</Link>
              <Button
                as={Link}
                to={`/category/${post.category}`}
                id={post.category}
                onClick={(e)=>this.onClickCategory(e)}
                style={{display:'block', width: 5 + 'em'}}
                compact>
                {post.category}
              </Button>
            </Grid.Column>
            <Divider horizontal>&nbsp;</Divider>
          </Grid.Row>
        ))}

      </Grid>
    )
  }
}

function mapStateToProps({posts, sortMethod}){
  return {
    posts,
    sortMethod
  }
}

function mapDispatchToProps(dispatch){
  return {
    // the first parameter must be event, data must be the second
    votePost: (e, data) => dispatch(votePost(data.value, data.name)),
    updateSortMethod: (e) => dispatch(updateSortMethod(e.target.value)),
    selectCategory: (category) => dispatch(selectCategory(category)),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(PostsIndex);
