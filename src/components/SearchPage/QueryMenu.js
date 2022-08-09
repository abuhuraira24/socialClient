import { useState } from "react";
import { Icon, Li, MenuWrapper, Ul } from "./Styles";

const QueryMenu = () => {
  const [active, setActive] = useState(true);

  return (
    <MenuWrapper>
      <Ul>
        <Li active={active.toString()}>
          <Icon className="fa-solid fa-people-group"></Icon>
          People
        </Li>
        <Li>
          <Icon className="fa-solid fa-address-card"></Icon>
          Posts
        </Li>
      </Ul>
    </MenuWrapper>
  );
};

export default QueryMenu;
