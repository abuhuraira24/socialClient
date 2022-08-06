import React, { createContext, useReducer } from "react";

import jwtDecode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
const AuthContext = createContext({
  user: null,
  comments: null,
  likes: null,
  posts: null,
  login: (userData) => {},
  logout: () => {},
  queryText: (text, navigate, createSearchParams) => {},
  getComments: (data) => {},
  getLikes: (data) => {},
  getPosts: (data) => {},
  getNotification: (data) => {},
  getRealTimeNoti: (data) => {},
  themeMode: () => {},
  deletedPostId: (data) => {},
  UpdatedPost: (data) => {},
  bioUpdate: (data) => {},
});

const init = {
  user: null,
  searchText: null,
  comments: null,
  posts: null,
  notification: null,
  isDark: "",
  bio: "",
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    init.user = decodedToken;
    init.authenticate = true;
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    // Login
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    // Log Out
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    // Search Qery
    case "QUERY":
      return {
        searchText: action.payload.text,
      };

    // Get Comments
    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
        commentLoading: false,
      };

    // Get Likes
    case "GET_LIKES":
      return {
        ...state,
        likes: action.payload,
      };

    // Get Posts
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
      };

    // Get Notifications
    case "GET_NOTI":
      return {
        ...state,
        notification: action.payload,
      };

    // Get Real Time Notifications
    case "GET_REAL_TIME_NOTI":
      return {
        ...state,
        notification: action.payload,
      };

    // Theme Change
    case "THEME":
      const isLight = localStorage.getItem("theme");
      return {
        ...state,
        isDark: isLight,
      };

    // Delete Post
    case "DELETEDPOST":
      let posts = state.posts.filter((post) => post._id !== action.payload);
      return {
        ...state,
        posts: posts,
      };

    // Updated post
    case "UPADATED_POST":
      return {
        ...state,
      };
    case "UPDATED_BIO":
      return {
        ...state,
        bio: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, init);

  // Login
  const login = (userData) => {
    localStorage.setItem("jwtToken", userData);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGIN" });
  };

  // Query User
  const queryText = (text, navigate, createSearchParams) => {
    if (text) {
      const textt = text.toLowerCase();

      init.searchText = textt;
      dispatch({
        type: "QUERY",
        payload: textt,
      });
      if (typeof text !== "undefined") {
        // navigate(`/search/${textt}`)
        navigate({
          pathname: "search",
          search: `?${createSearchParams({
            q: textt,
          })}`,
        });
      }
    }
  };

  // Comments Loading
  const comLoading = () => {
    dispatch({
      type: "COM_LOAD",
    });
  };

  // Get Commnets
  const getComments = (data) => {
    if (data) {
      dispatch({
        type: "GET_COMMENTS",
        payload: data,
      });
    }
  };

  // Get Likes
  const getLikes = (data) => {
    dispatch({
      type: "GET_LIKES",
      payload: data,
    });
  };

  // Get Posts
  const getPosts = (data) => {
    dispatch({
      type: "GET_POSTS",
      payload: {
        posts: data,
      },
    });
  };

  // Get Notifications
  const getNotification = (data) => {
    dispatch({
      type: "GET_NOTI",
      payload: data,
    });
  };

  // Real Time Notification
  const getRealTimeNoti = (data) => {
    dispatch({
      type: "GET_REAL_TIME_NOTI",
      payload: data,
    });
  };

  // Theme Changer
  const themeMode = () => {
    dispatch({
      type: "THEME",
    });
  };

  // Delete post
  const deletedPostId = (postId) => {
    const notify = () => toast("Successfully deleted");
    notify();
    dispatch({
      type: "DELETEDPOST",
      payload: postId,
    });
  };

  // Update post
  const UpdatedPost = (data) => {
    dispatch({
      type: "UPADATED_POST",
      payload: data,
    });
  };

  // Update Bio
  const bioUpdate = (data) => {
    dispatch({
      type: "UPDATED_BIO",
      payload: data,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        getComments,
        comLoading,
        comments: state.comments,
        logout,
        queryText,
        getNotification,
        getRealTimeNoti,
        searchText: state.searchText,
        getLikes,
        likes: state.likes,
        getPosts,
        posts: state.posts,
        notification: state.notification,
        themeMode,
        isDark: state.isDark,
        deletedPostId,
        UpdatedPost,
        bio: state.bio,
        bioUpdate,
        Toaster,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
