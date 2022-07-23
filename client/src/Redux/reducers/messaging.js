export const FETCH_CHATS = "FETCH_CHATS";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const RESET_CURRENT_CHAT = "RESET_CURRENT_CHAT";

const initialState = {
  chats: [],
  messages: [],
  notifications: [],
  currentChat: null,
};

export function fetchChats(chats) {
  return {
    type: FETCH_CHATS,
    payload: chats,
  };
}

export function fetchMessages(messages) {
  return {
    type: FETCH_MESSAGES,
    payload: messages,
  };
}
export function fetchNotifications(notifications) {
  return {
    type: FETCH_NOTIFICATIONS,
    payload: notifications,
  };
}

export function currentChatSet(chat) {
  return {
    type: SET_CURRENT_CHAT,
    payload: chat,
  };
}

export function resetCurrentChat(data) {
  return {
    type: RESET_CURRENT_CHAT,
    payload: data,
  };
}

export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_CHATS":
      return { ...state, chats: payload };
    case "FETCH_MESSAGES":
      return { ...state, messages: payload };
    case "FETCH_NOTIFICATIONS":
      return { ...state, notifications: payload };
    case "SET_CURRENT_CHAT":
      return { ...state, currentChat: payload };
    case "RESET_CURRENT_CHAT":
      return { ...state, currentChat: payload };
    default:
      return state;
  }
};
