import React from 'react'
import { connect } from 'react-redux'
import { Grid, Segment, Header, Icon, Loader } from 'semantic-ui-react'

import Controls from '../components/PostDetailView/Controls'
import PostContent from '../components/PostDetailView/PostContent'
import CommentsContent from '../components/PostDetailView/CommentsContent'

import { allPosts } from '../actions'

class PostDetailView extends React.Component {

  componentDidMount(){
    // check to see if there is any state. If it's undefined(not yet mounted) or default state {}, fetch all posts.
    // The reason not using fetchPost() is, fetching a single deleted post return undefined which will conflict with the case that a post is not deleted but just unloaded.
    // But fetching all posts return all posts, including deleted posts.
    if ((this.props.posts) === undefined || {} ){
      this.props.allPosts()
    }
  }

  render() {
    const { match, history, posts } = this.props
    const post = posts[this.props.match.params.postId]

    if (!post) {
      return (
        <Grid.Row key='loading'>
          <Segment padded='very' basic textAlign='center'>
            <Loader active size='massive'/>
          </Segment>
        </Grid.Row>
      )
    } else if (post.deleted===true) {
      return (
        <Grid.Row key='deletedMessage'>
            <Segment padded='very' color='red' textAlign='center'>
              <Header color='red'>
                <Icon name='warning circle' color='red'/>This post has been deleted!
              </Header>
              <Header>
                Please go back to the main page.
              </Header>
              <Header>
                Thank you!
              </Header>
            </Segment>
        </Grid.Row>
      )
    }

    return (
      <Grid stackable>
        <Controls match={match} history={history} />
        <PostContent match={match} history={history} />
        <CommentsContent match={match} />
      </Grid>
    )
  }
}

export default connect(
  ({posts})=>({posts}),
  { allPosts }
)(PostDetailView);
