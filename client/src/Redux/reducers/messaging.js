export const FETCH_CONVERSATIONS = "FETCH_CONVERSATIONS";
export const FETCH_MESSAGES = "FETCH_MESSAGES";


const initialState = {
  conversations: [],
  messages:[]

};

export function fetchConversations(conversations) {
  return {
    type: FETCH_CONVERSATIONS,
    payload: conversations,
  };
}

export function fetchMessages(messages) {
  return {
    type: FETCH_MESSAGES,
    payload: messages,
  };
}

export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_CONVERSATIONS":
      return { ...state, conversations: payload };
      case "FETCH_MESSAGES":
        return { ...state, messages: payload };
    default:
      return state;
  }
};
