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

export const fetchUser = (userId) => async (dispatch, getState) => {
  try {
    const response = await request.get(`/users/${userId}`);
    dispatch({ type: "FETCH_USER", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
