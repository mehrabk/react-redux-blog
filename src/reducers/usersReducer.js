export default (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_USER":
      return [...state, payload];
    default:
      return state;
  }
};
