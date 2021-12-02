import _ from "lodash";
import { request } from "../shared/APIUtils";

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

export const fetchUser = (userId) => (dispatch, getState) => _fetchUser(userId, dispatch);

// lodash memoize lead to remove identical request after first request
// solve the identical request solution-1
const _fetchUser = _.memoize(async (userId, dispatch) => {
  try {
    const response = await request.get(`/users/${userId}`);
    dispatch({ type: "FETCH_USER", payload: response.data });
  } catch (err) {
    console.log(err);
  }
});
