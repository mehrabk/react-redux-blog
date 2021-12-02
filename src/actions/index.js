import _ from "lodash";
import { request } from "../shared/APIUtils";

export const fetchPostsAndUsers = () => {
  // getState get access to state store
  return async (dispatch, getState) => {
    await dispatch(fetchPosts());

    // ===> remove identical id and get a list of posts id <===

    // ===> chain version
    _.chain(getState().posts)
      .map("userId")
      .uniq()
      .forEach((userId) => dispatch(fetchUser(userId)))
      .value();

    // ===> regular version
    // const userIds = _.uniq(_.map(getState().posts, "userId"));
    // userIds.forEach((userId) => dispatch(fetchUser(userId)));

    // ===> Promise.all version
    // if we want use await and iterate all request we use paralell request with Promise.all
    // await Promise.all(userIds.map((userId) => dispatch(fetchUser(userId))));
  };
};

// in there we can pass a function or object to middleware and if we pass a function the redux-thunk invoke that function
// with two argument dispatch and getState
// redux-thunk like a pause a action dispatch and do process then resume and pass new object(wa can manually dispatch action)
export const fetchPosts = () => async (dispatch, getState) => {
  try {
    const response = await request.get("/posts");
    dispatch({ type: "FETCH_POSTS", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const fetchUser = (userId) => async (dispatch, getState) => {
  try {
    const response = await request.get(`/users/${userId}`);
    dispatch({ type: "FETCH_USER", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
