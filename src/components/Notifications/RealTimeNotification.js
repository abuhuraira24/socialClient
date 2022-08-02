import React, { useEffect, useState } from "react";

import socket from "../../hooks/socketio";

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
const RealTimeNotification = ({ realtTimeNoti }) => {
  // const [realtTimeNoti, setRealTimeNoti] = useState([]);

  // useEffect(() => {
  //   socket.on("getNotification", (data) => {
  //     console.log(data);
  //     setRealTimeNoti(data);
  //   });
  // });
  console.log(realtTimeNoti);
  return (
    realtTimeNoti && (
      <NotWrapper>
        <Single>
          <Avatars>
            <Avatar>
              {realtTimeNoti.avatar && (
                <Img src={realtTimeNoti.avatar} alt="use" />
              )}
            </Avatar>
          </Avatars>

          <Body>
            <Name> {realtTimeNoti.name} : </Name>
            <Text>{realtTimeNoti.body} </Text>
            <Time> {moment(realtTimeNoti.createdAt).fromNow(true)}</Time>
          </Body>
        </Single>
      </NotWrapper>
    )
  );
};

export default RealTimeNotification;
