import React, { useEffect, useState } from "react";
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
} from "./styles";
import moment from "moment";
const SingleNoti = ({ notification }) => {
  return (
    <NotWrapper>
      <Single>
        <Avatars>
          <Avatar>
            <Img src={notification.avatar} alt="use" />
          </Avatar>
        </Avatars>
        <Body>
          <Name> {notification.name} : </Name>
          <Text>{notification.text} </Text>
          <Time> {moment(notification.createdAt).fromNow(true)}</Time>
        </Body>
      </Single>
    </NotWrapper>
  );
};

export default SingleNoti;
