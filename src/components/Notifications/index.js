import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SingleNoti from "./SingleNoti";
import { Empty, Wrapper } from "./styles";

import SmallNavbar from "../Navbar/SmallNavbar";

import { Header, New, SeeAll, SubHeader, Title } from "./styles";
const Notification = () => {
  // Get Notification
  const [notifications, setNotifications] = useState([]);

  useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      if (data) {
        setNotifications(...notifications, data.notifications);
      }
    },
  });

  return (
    <>
      <SmallNavbar />
      <Wrapper>
        <Header>
          <Title>Notifications</Title>
          <SubHeader>
            <New>New</New>
            <SeeAll>See All</SeeAll>
          </SubHeader>

          <Empty>
            {notifications &&
              typeof notifications !== "notifications" &&
              notifications.length === 0 &&
              "There is no Notification"}
          </Empty>
        </Header>

        {notifications &&
          notifications.map((x, index) => (
            <SingleNoti key={index} notification={x} />
          ))}
      </Wrapper>
    </>
  );
};

const GET_NOTIFICATIONS = gql`
  query {
    notifications {
      name
      text
      avatar
      createdAt
    }
  }
`;
export default Notification;
