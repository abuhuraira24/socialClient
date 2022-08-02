import { Link } from "react-router-dom";

import { H6 } from "./Styles";

import {
  Users,
  Avatar,
  Img,
  Name,
  UserIcon,
  Empty,
  Avatars,
} from "../Home/FollowerStyles";

const User = ({ user }) => {
  return (
    <Users>
      <Avatars>
        <Link to={`/profile/${user.id}`}>
          <Avatar>
            <Img src={user.avatars[0].avatar} alt="user" />

            <Empty>
              <UserIcon className="fa-solid fa-user"></UserIcon>
            </Empty>
          </Avatar>
        </Link>
      </Avatars>
      <Name>
        <Link to={`/profile/${user.id}`}>
          <H6>
            {user.firstName} {user.lastName}
          </H6>
        </Link>
      </Name>
    </Users>
  );
};

export default User;
