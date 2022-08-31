import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  Avatar,
  Body,
  NotWrapper,
  Img,
  Single,
  Avatars,
  Name,
  Text,
  Time,
  Heart,
  Comment,
  Icon,
  Follow,
  Linkk,
} from "./styles";
import moment from "moment";

const SingleNoti = ({ notification }) => {
  let [user, setUser] = useState([]);

  useQuery(GET_USER, {
    onCompleted: (data) => {
      setUser(data.getUserById);
    },
    variables: { userId: notification.sender },
    onError(error) {
      console.log(error);
    },
  });

  return (
    user.length !== 0 && (
      <Linkk
        to={
          notification.notiType === "comment" &&
          `/post/${notification.refId}/${notification.receiver}` &&
          notification.notiType === "like" &&
          `/post/${notification.refId}/${notification.receiver}`
        }
      >
        <NotWrapper>
          <Single>
            <Avatars>
              {notification.notiType === "like" && (
                <Icon>
                  <Heart className="fa-solid fa-heart"></Heart>
                </Icon>
              )}

              {notification.notiType === "comment" && (
                <Icon>
                  <Comment className="fa-solid fa-comment"></Comment>
                </Icon>
              )}
              {notification.notiType === "follow" && (
                <Icon>
                  <Follow className="fa-solid fa-user-plus"></Follow>
                </Icon>
              )}

              <Avatar>
                {user.avatars.length !== 0 ? (
                  <Img
                    src={`${process.env.REACT_APP_SERVER_URL}/${user.avatars[0].avatar}`}
                    alt="use"
                  />
                ) : (
                  <Img
                    src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                    alt="use"
                  />
                )}
              </Avatar>
            </Avatars>
            <Body>
              <Name>
                {" "}
                {user.firstName} {user.lastName} :{" "}
              </Name>
              <Text>{notification.content} </Text>
              <Time> {moment(notification.createdAt).fromNow(true)}</Time>
            </Body>
          </Single>
        </NotWrapper>
      </Linkk>
    )
  );
};

const GET_USER = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      id
      firstName
      lastName
      avatars {
        avatar
      }
    }
  }
`;

export default SingleNoti;
