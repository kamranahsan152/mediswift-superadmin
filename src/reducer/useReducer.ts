export const initialState = null;

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "USER":
      return action.payload;
    default:
      return state;
  }
};