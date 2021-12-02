import React from "react";
import { connect } from "react-redux";

import { fetchPosts } from "../actions";
import UserHeader from "./UserHeader";

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("did mount");
    this.props.fetchPosts();
  }

  renderList() {
    return this.props.posts.map((post) => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  // run =>  1-render() method   2-action of initialization of redux (inital of redux state like PostList = [])
  // 3-componentDidMount lifecycle method   4-dispatch action of fetchData   5-run render() method
  // when dispatch an action all reducers get iterate and pass them action type...
  // if state of redux store get changed the react side component will rendered and mapStatetoProps run
  return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPosts })(PostList);
