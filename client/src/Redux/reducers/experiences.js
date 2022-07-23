export const FETCH_EXPERIENCES = "FETCH_EXPERIENCES";
export const FETCH_SELLER_EXPERIENCES = "FETCH_SELLER_EXPERIENCES";
export const SET_VIEW_STATE = "SET_VIEW_STATE";
export const FETCH_USER_BOOKINGS = "FETCH_USER_BOOKINGS";
export const FETCH_SINGLE_BOOKING = "FETCH_SINGLE_BOOKING";
export const FETCH_SINGLE_EXPERIENCE = "FETCH_SINGLE_EXPERIENCE";
export const FETCH_FAVORITES = "FETCH_FAVORITES";


const initialState = {
  experiences: [],
  sellerExperiences: [],
  bookings: [],
  singleBooking: {},
  singleExperience: {},
  favorites: [],
};
const defaultMapState = {
  mapStyle: "mapbox://styles/akanyijuka/cl293p89t007t15tcmc2cbex3",
  viewState: {
    latitude: null,
    longitude: null,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  },
};

export function fetchExperiences(experiences) {
  return {
    type: FETCH_EXPERIENCES,
    payload: experiences,
  };
}

export function fetchSellerExperiences(sellerExperiences) {
  return {
    type: FETCH_SELLER_EXPERIENCES,
    payload: sellerExperiences,
  };
}


export function fetchUserBookings(bookings) {
  return {
    type: FETCH_USER_BOOKINGS,
    payload: bookings,
  };
}
export function fetchSingleBooking(booking) {
  return {
    type: FETCH_SINGLE_BOOKING,
    payload: booking,
  };
}

export function fetchSingleExperience(experience) {
  return {
    type: FETCH_SINGLE_EXPERIENCE,
    payload: experience,
  };
}

export function fetchFavorites(favorites) {
  return {
    type: FETCH_FAVORITES,
    payload: favorites,
  };
}


export const experiencesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_EXPERIENCES":
      return { ...state, experiences: payload };
    case "FETCH_SELLER_EXPERIENCES":
      return { ...state, sellerExperiences: payload };
    case "CREATE_EXPERIENCES":
      return { ...state, experiences: payload };
    case "FETCH_SINGLE_EXPERIENCE":
      return { ...state, singleExperience: payload };
    case "FETCH_FAVORITES":
      return { ...state, favorites: payload };
    case "FETCH_USER_BOOKINGS":
      return { ...state, bookings: payload };
    case "FETCH_SINGLE_BOOKING":
      return { ...state, singleBooking: payload };
    default:
      return state;
  }
};

export const mapStateReducer = (state = defaultMapState, { type, payload }) => {
  switch (type) {
    case "SET_VIEW_STATE":
      return { ...state, viewState: payload };
    default:
      return state;
  }
};

export function setMapState(mapState) {
  return {
    type: SET_VIEW_STATE,
    payload: mapState,
  };
}
