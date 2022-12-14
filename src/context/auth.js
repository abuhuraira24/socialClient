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
  getComment: (data) => {},
  getLikes: (data) => {},
  getPosts: (data) => {},
  getNotification: (data) => {},
  getRealTimeNoti: (data) => {},
  themeMode: () => {},
  deletedPostId: (data) => {},
  UpdatedPost: (data) => {},
  bioUpdate: (data) => {},
  setInbox: (creator, receiver, isOpen) => {},
  getMessages: (data) => {},
  getUserInfo: (data) => {},
});

const init = {
  user: null,
  searchText: null,
  comments: null,
  posts: null,
  notification: null,
  isDark: "",
  bio: "",
  openInbox: {},
  messages: [],
  userInfo: [],
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
      let token = jwtDecode(action.payload);
      return {
        ...state,
        user: token,
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

    // Open Inbox
    case "OPEN_INBOX":
      return {
        ...state,
        openInbox: action.payload,
      };
    case "GET_MESSAGE":
      return {
        ...state,
        messages: action.payload,
      };
    case "USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
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
    // localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
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
  const getComment = (data) => {
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

  // Open Inbox
  const setInbox = (creator, receiver, isOpen) => {
    dispatch({
      type: "OPEN_INBOX",
      payload: {
        creator,
        receiver,
        isOpen,
      },
    });
  };

  // get Messages
  const getMessages = (data) => {
    dispatch({
      type: "GET_MESSAGE",
      payload: data,
    });
  };
  const getUserInfo = (data) => {
    dispatch({
      type: "USER_INFO",
      payload: data,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        getComment,
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
        openInbox: state.openInbox,
        setInbox,
        getMessages,
        messages: state.messages,
        userInfo: state.userInfo,
        getUserInfo,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
