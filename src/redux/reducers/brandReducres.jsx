import { CATEGORY_SET, CATEGORIES_SET } from "./../acction/acctionType";
const initialState = {
  category: {},
  categories: [],
};

const caregoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_SET:
      return { ...state, category: payload };
    case CATEGORIES_SET:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
export default caregoryReducer;
