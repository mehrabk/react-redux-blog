import React from "react";
import { connect } from "react-redux";

class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    return <div className="header">{user.name}</div>;
  }
}

// pre computation
// ownProps => a refrence of props that passed to UserHeader class Component
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
