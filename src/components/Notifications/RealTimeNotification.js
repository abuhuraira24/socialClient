import React from "react";

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
