import React from "react";
import { FlexboxGrid, List } from "rsuite";
import UserImg from "../../../Images/User.png";
import { useMediaQuery } from "react-responsive";
import { Icon } from "@rsuite/icons";
import { withAuthContext } from "../../../Context";
import axios from "axios";
import { useEffect } from "react";

function ChatAppHeader({ CurrChat, Token }) {
  const styleCenter = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "45px",
  };

  const titleStyle = {
    whiteSpace: "nowrap",
    fontWeight: 900,
    fontSize: "20px",
    marginLeft: "20px",
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

  function GetChatInfo() {
    axios
      .get(
        `${process.env.REACT_APP_PUBLIC_PATH}/GetChatWithPerson/${CurrChat}`,
        {
          headers: { authorization: `${Token}` },
        }
      )
      .then((res) => {
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    GetChatInfo();
  }, CurrChat);
  return (
    <List autoScroll={true}>
      <List.Item
        style={{
          border: "2px solid #B0B0B0",
          borderRadius: "10px",
          margin: "5px 0px",
          padding: "10px 5px",
        }}
      >
        <FlexboxGrid>
          {/*icon*/}
          <FlexboxGrid.Item colspan={18} style={styleCenter}>
            <img
              src={UserImg}
              style={{ width: isTabletOrMobile ? "18%" : "8%" }}
            />
            <div style={titleStyle}>Stella Ngobeni</div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item
            colspan={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "45px",
              alignContent: "center",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <Icon
                icon="bars"
                style={{ fontSize: "20px", marginRight: "20px" }}
              />
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </List.Item>
    </List>
  );
}

export default withAuthContext(ChatAppHeader);
