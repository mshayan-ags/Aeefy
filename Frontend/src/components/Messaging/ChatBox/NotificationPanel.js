import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { Col, Grid, Panel, Row } from "rsuite";
import { FlexboxGrid,  List } from "rsuite";
import UserImg from "../../../Images/User.png";
import { useMediaQuery } from "react-responsive";
import { Icon } from '@rsuite/icons';

function NotificationPanel(props) {
	const styleCenter = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		height: "45px"
	};

	const titleStyle = {
		whiteSpace: "nowrap",
		color: "#000",
		fontSize: "15px",
		marginLeft: "10px"
	};

	const repliesStyle = {
		whiteSpace: "nowrap",
		fontWeight: 900,
		fontSize: "20px",
		color: "#000",
		marginLeft: "20px"
	};
	const descriptionStyles = {
		fontSize: "0.8em",
		color: "#97969B",
		fontWeight: "lighter",
		paddingBottom: 5,
		textAlign: "justify",
		overflow: "hidden"
	};
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

	return (
		<Scrollbars
			renderThumbHorizontal={() => <span />}
			className="chat-messages-container"
			style={props.style}
		>
			<List.Item
				style={{ margin: "5px 0px", border: "none !important" }}
				onClick={() => props.onReplySelected(false)}
			>
				<Grid fluid>
					<Row className="show-grid">
						{/*icon*/}
						<Col lg={2} md={3} sm={4} xs={5} style={styleCenter}>
							<img src={UserImg} style={{ width: "80%" }} />
						</Col>
						{/*base info*/}
						<Col
							lg={14}
							md={10}
							sm={10}
							style={{
								...styleCenter,
								flexDirection: "column",
								alignItems: "flex-start",
								overflow: "hidden"
							}}
						>
							<div style={{ ...titleStyle, fontSize: "15px" }}>Stella Negotebia</div>
							<div style={descriptionStyles}>
								Lorem ipsum dollar sit Lorem ipsum dollar sit Lorem ipsum dollar sit Lorem ipsum
								dollar sit{" "}
							</div>
						</Col>
						{/*peak data*/}
						<Col lg={8} md={9} xsHidden style={styleCenter} lgPush>
							<div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
								<div
									style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
								>
									<div style={descriptionStyles}>12 March 2021 , 11:02</div>
									<Icon
										icon="ellipsis-v"
										style={{ fontSize: "20px", alignSelf: "flex-end", color: "grey" }}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</Grid>
			</List.Item>

			<Panel shaded>
				<div>
					<FlexboxGrid>
						{/*icon*/}
						<FlexboxGrid.Item colspan={18} style={styleCenter}>
							<div style={repliesStyle}>Replies</div>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item
							colspan={6}
							style={{
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "center",
								height: "45px",
								alignContent: "center"
							}}
						>
							<div style={{ textAlign: "right" }}>
								<Icon icon="help-o" />
							</div>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</div>

				<List autoScroll={true} bordered={false}>
					{[0, 1, 2, 3].map((m) => (
						<List.Item key={m}>
							<FlexboxGrid>
								{/*icon*/}
								<FlexboxGrid.Item colspan={18} style={styleCenter}>
									<img src={UserImg} style={{ width: isTabletOrMobile ? "10%" : "5%" }} />
									<div style={titleStyle}>Stella Ngobeni</div>
								</FlexboxGrid.Item>
								<FlexboxGrid.Item
									colspan={6}
									style={{
										display: "flex",
										justifyContent: "flex-end",
										alignItems: "center",
										height: "45px",
										alignContent: "center"
									}}
								>
									<div style={{ textAlign: "right" }}>
										<p>Parent</p>
									</div>
								</FlexboxGrid.Item>
							</FlexboxGrid>
						</List.Item>
					))}
				</List>
			</Panel>
		</Scrollbars>
	);
}

export default NotificationPanel;
