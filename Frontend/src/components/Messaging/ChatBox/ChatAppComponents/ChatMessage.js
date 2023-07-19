import React, { Component } from "react";
import "./ChatMessage.css";
import { Emoji } from "emoji-mart";
import moment from "moment";
import { Icon } from '@rsuite/icons';

class ChatMessage extends Component {
	render() {
		const { opponent } = this._generateChatMessageInfo();
		return (
			<div className="fadeInLeft">
				{(window.__VUE_DASHBOARD || opponent) && !(window.__VUE_DASHBOARD && opponent)
					? this._renderAgentMessage()
					: this._renderOwnMessage()}
			</div>
		);
	}

	_renderOwnMessage = () => {
		const {
			time,
			ago,
			textWithLineBreaks,
			showBackground,
			showPadding,
			userProfileImageUrl
		} = this._generateChatMessageInfo();
		return (
			<div className="message-padding">
				<div className="flex flex-bottom">
					<div
						className="message-container message-container-padding-right flex-right"
						onClick={() => {
							this.props.onReplySelect();
						}}
					>
						<div
							style={{
								background: showBackground ? `${this.props.userSpeechBubbleColor}` : null,
								cursor: "pointer"
							}}
							className={`white-1${showPadding ? " padding-all" : ""} radius time-trigger`}
						>
							<p className="margin-0">{textWithLineBreaks}</p>
						</div>

						<div
							className="right"
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								alignContent: "center"
							}}
						>
							{this.props.message.hasNotification && (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										alignContent: "center",
										color: "#407B54",
										marginRight: "25px",
										cursor: "pointer"
									}}
									onClick={() => {
										this.props.onReplySelect();
									}}
								>
									<Icon
										icon="bell"
										style={{
											marginRight: "5px"
										}}
									/>
									<p>Reply Notification</p>
								</div>
							)}
							<Icon icon="check" />
							{/* {!this.props.shouldRenderTimestamp && ( */}
							<p className="opacity-4 padding-top-2 chat-mine-margin">{time}</p>
							{/* )} */}
							{/* {this.props.shouldRenderTimestamp && <p className="timeago">{ago}</p>} */}
							{
								<img
									src={userProfileImageUrl}
									alt=""
									// style={{ width: "2%" }}
									className="avatarme"
								/>
							}
						</div>
					</div>
				</div>
			</div>
		);
	};

	_renderAgentMessage = () => {
		const { time, ago, profileImageUrl, textWithLineBreaks } = this._generateChatMessageInfo();
		// console.log(time, ago, profileImageUrl, textWithLineBreaks)
		return (
			<div className="message-padding">
				<div className="flex flex-bottom">
					{<img src={profileImageUrl} alt="" className="avatar message-avatar" />}
					<div
						className="message-container message-container-padding-left"
						style={{ alignItems: "flex-start" }}
					>
						<div
							className="opaque padding-20 radius time-trigger"
							style={{ background: "#EAECF2" }}
						>
							<p className="margin-0">{textWithLineBreaks}</p>
						</div>
						{!this.props.shouldRenderTimestamp && (
							<p className="right opacity-4 padding-top-2 time-on-hover">{time}</p>
						)}
						{this.props.shouldRenderTimestamp && (
							<p className="right opacity-4 padding-top-2">{ago}</p>
						)}
					</div>
				</div>
			</div>
		);
	};

	_generateChatMessageInfo = () => {
		const ago = this.props.message.loading
			? (this.props.message.image
					? this.props.getLanguageString("uploading")
					: this.props.getLanguageString("sending")) + "..."
			: moment(this.props.message.createdAt).fromNow();
		const time = new Date(this.props.message.createdAt).toLocaleTimeString();
		const opponent = this.props.message.opponent;
		const profileImageUrl = (opponent && opponent.imageUrl) || this.props.profileImageURL;
		const userProfileImageUrl = this.props.userProfileImageUrl;
		// console.log(profileImageUrl)
		const textWithLineBreaks =
			this.props.message.gif || this.props.message.image ? (
				<img style={{ width: 128 }} src={this.props.message.gif || this.props.message.image} />
			) : // this.props.message.image ?
			//   <FilePreview file={this.props.message.image}>
			//     {(preview) => <img style={{width: 128}} src={preview} />}
			//   </FilePreview> :
			this.props.message.emoji ? (
				<Emoji emoji={this.props.message.emoji} size={64} />
			) : (
				this.props.message.text.split("\n").map((line, index) => (
					<span key={index}>
						{line}
						<br />
					</span>
				))
			);
		// console.log(time)
		return {
			time,
			ago,
			opponent,
			profileImageUrl,
			userProfileImageUrl,
			textWithLineBreaks,
			showBackground: !(
				this.props.message.image ||
				this.props.message.emoji ||
				this.props.message.gif
			),
			showPadding: !(this.props.message.image || this.props.message.gif)
		};
	};
}

export default ChatMessage;
