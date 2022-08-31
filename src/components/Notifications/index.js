import React, { useEffect, useState, useContext } from "react";

import SingleNoti from "./SingleNoti";
import { Wrapper } from "./styles";

import SmallNavbar from "../Navbar/SmallNavbar";

import axios from "axios";

import { AuthContext } from "../../context/auth";

import { Header, New, SeeAll, SubHeader, Title, Empty } from "./styles";

import { socket } from "../../hooks/socketio";

const Notification = () => {
  // Get Notification
  const [notifications, setNotifications] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getNotifications/${user.id}`)
      .then((result) => {
        const sortedAsc = result.data.result.sort(
          (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
        );

        setNotifications(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    socket.off("getNotification").on("getNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
  }, []);

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

export default Notification;
