import React from "react";
import { Col, FlexboxGrid, Grid,  List, Row } from "rsuite";
import UserImg from "../../../Images/User.png";
import { Icon } from '@rsuite/icons';

const styleCenter = {
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	height: "45px"
};

const titleStyle = {
	whiteSpace: "nowrap",
	fontWeight: 900,
	fontSize: "20px"
};

class ListDemo extends React.Component {
	render() {
		return (
			<List autoScroll={true}>
				<List.Item
					style={{
						border: "2px solid #B0B0B0",
						borderRadius: "10px",
						margin: "5px 0px",
						padding: "10px 5px"
					}}
				>
					<FlexboxGrid>
						{/*icon*/}
						<FlexboxGrid.Item
							colspan={18}
							style={{ ...styleCenter, color: "#219653", paddingLeft: "30px", fontWeight: "900" }}
						>
							<Icon icon="bell-o" size="3x" />
							<div style={{ ...titleStyle, marginLeft: "20px" }}>Reply Notification</div>
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
								<Icon icon="bars" style={{ fontSize: "20px", marginRight: "20px" }} />
							</div>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</List.Item>
			</List>
		);
	}
}

export default ListDemo;
