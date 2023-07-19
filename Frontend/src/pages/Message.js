import React from "react";
import { Grid, Row, Col } from "rsuite";
import Chat from "../components/Messaging/Chat";
import ChatBox from "../components/Messaging/ChatBox/index";
import { useMediaQuery } from "react-responsive";

function Message() {
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

	return (
		<div>
			<Grid style={{ background: "#F2F2F2", height: "90vh" }} fluid>
				<Row className="show-grid" gutter>
					<Col
						lg={8}
						md={8}
						sm={11}
						xs={24}
						style={{ margin: isTabletOrMobile ? "20px 10px" : "20px 30px" }}
					>
						{" "}
						<Chat />
					</Col>
					<Col lg={14} md={14} sm={12} xs={24} style={{ margin: "40px 0px 0px" }}>
						<ChatBox />
					</Col>
				</Row>
			</Grid>
		</div>
	);
}

export default Message;
