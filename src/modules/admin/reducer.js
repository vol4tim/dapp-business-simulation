import { ADD } from './actionTypes'

const initialState = {
  items: []
}

export default function dao(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { ...state, items: [...state.items, action.payload] }

    default:
      return state;
  }
}
