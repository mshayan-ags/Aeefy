import React, { useRef } from "react";
import { Button, Input, InputGroup, Popover, Whisper } from "rsuite";
import User from "./Users";
import data from "./data.json";
import { Cascader } from "rsuite";
import { Icon } from "@rsuite/icons";
import { useState } from "react";
import { useEffect } from "react";

function Chats({ Users }) {
  const checkTreeRef = useRef(null);

//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     Users?.map((a) => {
//       a.label = a.name;
//       setUserData([...userData, a]);
//     });
//   }, [Users]);

//   useEffect(() => console.log(userData), userData);

  return (
    <div>
      {/* <div
        style={{ display: "flex", alignItems: "center", alignContent: "right" }}
      >
        <span
          style={{
            width: 1,
            height: 1,
            overflow: "hidden",
            display: "inline-block",
            opacity: 0,
          }}
        >
          <Cascader ref={checkTreeRef} data={userData} />
        </span>
        <Button
          style={{ background: "#FFF", border: "1px solid #219653" }}
          onClick={() => {
            console.log(checkTreeRef.current?.open());
          }}
        >
          <Icon icon="plus" /> New Message
        </Button>
      </div> */}

      <InputGroup inside style={{ margin: "10px 5px 10px 0px", width: "97%" }}>
        <Input placeholder="Search" />
        <InputGroup.Button>
          <Icon icon="search" />
        </InputGroup.Button>
      </InputGroup>
      <User />
    </div>
  );
}

export default Chats;
