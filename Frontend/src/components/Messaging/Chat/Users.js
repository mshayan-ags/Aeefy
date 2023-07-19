import React from "react";
import { Button, Col, Grid, List, Row } from "rsuite";
import UserImg from "../../../Images/User.png";
import { Icon } from "@rsuite/icons";
import { withAuthContext } from "../../../Context";
import axios from "axios";
const data = [
  {
    id: 1,
    title: "Mike Lyne",
    description:
      "Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text. ",
  },
  {
    id: 2,
    title: "Mike Lyne",
    description:
      "Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text. ",
  },
  {
    id: 3,
    title: "Mike Lyne",
    description:
      "Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text. ",
    error: 3,
  },
  {
    id: 4,
    title: "Mike Lyne",
    description:
      "Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text. ",
  },
  {
    id: 5,
    title: "Mike Lyne",
    description:
      "Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text.Lorem ipsum dollar sit is simpply a dummy text. ",
  },
];
const styleCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
};

const descriptionStyles = {
  fontSize: "0.8em",
  color: "#97969B",
  fontWeight: "lighter",
  paddingBottom: 5,
  textAlign: "justify",
  overflow: "hidden",
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: "nowrap",
  fontWeight: "bolder",
};

class ListDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: 0 };
  }

  addChat(id) {
    axios
      .post(
        `${process.env.REACT_APP_PUBLIC_PATH}/AddChat`,
        {
          Person: id,
        },
        { headers: { authorization: `${this.props.Token}` } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    this.props.GetAllUsers();
    return (
      <List hover autoScroll={true}>
        {this.props && this.props?.Users && this.props?.Users?.length ? (
          this.props?.Users?.map((item, index) => (
            <List.Item
              key={item._id}
              index={index}
              style={
                this.state.isActive === item._id
                  ? {
                      margin: "10px",
                      border: "1px solid #84C857",
                      borderLeftWidth: "8px",
                    }
                  : { margin: "10px", border: "none !important" }
              }
              onClick={() => {
                this.addChat(item._id);
                this.props.setChat(item._id);
                this.setState(() => {
                  return { isActive: item._id };
                });
              }}
            >
              <Grid fluid>
                <Row className="show-grid">
                  {/*icon*/}
                  <Col lg={3} md={4} sm={5} xs={6} style={styleCenter}>
                    <img src={UserImg} style={{ width: "80%" }} />
                  </Col>
                  {/*base info*/}
                  <Col
                    lg={14}
                    md={10}
                    sm={8}
                    style={{
                      ...styleCenter,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      overflow: "hidden",
                      marginLeft: "10px",
                    }}
                  >
                    <div style={titleStyle}>{item.name}</div>
                    <div style={descriptionStyles}>{item.email}</div>
                  </Col>
                  {/*peak data*/}
                  <Col lg={6} md={9} sm={10} style={styleCenter}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div
                          style={{
                            marginRight: 20,
                            color: "green",
                          }}
                        >
                          Parent
                        </div>
                        <div
                          style={{
                            marginRight: 10,
                          }}
                        >
                          7:12
                        </div>
                        <Icon icon="ellipsis-v" style={{ fontSize: "20px" }} />
                      </div>
                      {item.error && (
                        <div>
                          <Button color="red" style={{ padding: "0px 8px" }}>
                            {item.error}
                          </Button>
                        </div>
                      )}
                      <Icon
                        icon="check"
                        style={
                          item.error
                            ? { marginTop: "5px" }
                            : { marginTop: "20px" }
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </Grid>
            </List.Item>
          ))
        ) : (
          <p>No User Found</p>
        )}
      </List>
    );
  }
}

export default withAuthContext(ListDemo);
