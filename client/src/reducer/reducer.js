

export const initialState = null;

export const reducer = (states, actions) => {
  switch (actions.type) {
    case "Tasks":
      return actions.payload;
    default:
      return states;
  }
};
