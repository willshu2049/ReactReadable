import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Button, Form, Grid, Statistic, Icon, Segment, Divider } from 'semantic-ui-react'

import { votePost, updateSortMethod, selectCategory } from '../../actions/actions'
import { sortByVote, sortByDate } from '../../utils/sort'

class PostsIndex extends React.Component {

  render () {
    const { posts, votePost, sortMethod, updateSortMethod, selectCategory } = this.props

    // unobjectify posts into an array, and filter out all deleted posts
    const postsFiltered=_.filter(_.map(posts), post=>!post.deleted)

    // sort the postsSorted locally in the component
    postsFiltered && (sortMethod === 'voteScore') ? postsFiltered.sort(sortByVote) : postsFiltered.sort(sortByDate)

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
                onChange={(e)=>updateSortMethod(e.target.value)}
                style={{width: 8 + 'em', height: 2.5 +'em', display: 'inline-block'}}
                >
                <option value='voteScore'>Top Score</option>
                <option value='timestamp'>Most Recent</option>
              </select>
            </Form>
          </Grid.Column>
        </Grid.Row>

        {postsFiltered.map( (post) => (
          <Grid.Row key={post.id}>
            <Segment basic style={{marginBottom: 0 + 'px'}}>
              <Statistic horizontal value={post.voteScore} label='likes' style={{display: 'block'}} />
              <Button basic color='green' name={'upVote'} icon='like outline' value={post.id} onClick={(e, data)=>votePost(data.value, data.name)}/>
              <Button basic color='red' name={'downVote'} icon='dislike outline' value={post.id} onClick={(e, data)=>votePost(data.value, data.name)}/>
            </Segment>

            <Grid.Column verticalAlign='middle' width={12}>
              <p className='authorAndDate'>
                <Icon name='user'/>{post.author}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Icon name='clock'/>{(new Date(Number(post.timestamp))).toString().substr(0, 21)}
              </p>
              <Link className='post-title' to={`/posts/${post.id}`}>{post.title}</Link>
              <p className='authorAndDate'>
                <span>Category: </span>
                <Button as={Link} to={`/category/${post.category}`} id={post.category} onClick={(e)=>selectCategory(e.target.id)} style={{display:'inline-block', width: 5 + 'em'}} compact>
                  {post.category}
                </Button>
              </p>
            </Grid.Column>
            <Divider horizontal>&nbsp;</Divider>
          </Grid.Row>
        ))}

      </Grid>
    )
  }
}

export default connect(
  ({posts, sortMethod})=>({posts, sortMethod}),
  { votePost, updateSortMethod, selectCategory }
)(PostsIndex);
