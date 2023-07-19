import React, { Component, Fragment } from "react";
import "./ChatMessages.css";
import ChatMessage from "./ChatMessage";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";
import "./App.css";
import "./Chat.css";

class ChatMessages extends Component {
	componentDidMount() {
		this._scrollToBottom();
		this.clearWatcher = this._watchMessagesForScrollToBottom(this._scrollToBottom);
	}

	componentWillUnmount() {
		this.clearWatcher();
	}

	messagesLength = 0;
	_watchMessagesForScrollToBottom = (cb) => {
		this.messagesLength = this.props.messages.length;
		let interval = setInterval(() => {
			let messagesLength = this.props.messages.length;
			if (this.messagesLength !== messagesLength) cb();
			this.messagesLength = messagesLength;
		}, 1000);
		return () => clearInterval(interval);
	};

	_lastMessageFinder = (m1) => {
		let m1Date = new Date(m1).toDateString();
		return ({ createdAt: m2 }) => {
			let m2Date = new Date(m2).toDateString();
			return m1Date === m2Date;
		};
	};

	_getDisplayableDate(date) {
		return moment(new Date(date)).format("ll");
	}

	_renderDateIfNeedid = (message, index, messages) => {
		let lastIndex = messages.findIndex(this._lastMessageFinder(message.createdAt));
		// console.log({ lastIndex, index })
		let renderNeeded = lastIndex === index;
		return renderNeeded ? (
			<div className="text-center text-light" style={{ fontSize: 14 }}>
				{this._getDisplayableDate(message.createdAt)}
			</div>
		) : null;
	};
	scrollBarRef = React.createRef();
	scrollTop = 0;
	_handleScrollFrame = ({ top, scrollHeight, ...rest }) => {
		top = Math.round(top * 10);
		// console.log({ top, scrollHeight, ...rest })
		if (
			!top &&
			this.scrollTop &&
			// && this.scrollTop != top
			scrollHeight > 300
		) {
			this.props.adjustHeader && this.props.adjustHeader(true);
		}
		if (!this.scrollTop && top && scrollHeight > 350) {
			this.props.adjustHeader && this.props.adjustHeader(false);
		}
		this.scrollTop = top;
	};
	render() {
		const { minHeight } = this.props;
		return (
			<Scrollbars
				onScrollFrame={this._handleScrollFrame}
				renderThumbHorizontal={() => <span />}
				ref={this.scrollBarRef}
				className="chat-messages-container"
				style={this.props.style}
			>
				<div style={{ minHeight, paddingBottom: 20 }}>
					{this.props.messages.map((message, i) => {
						const isLatestMessage = i === this.props.messages.length - 1;
						return (
							<Fragment key={i}>
								{this._renderDateIfNeedid(message, i, this.props.messages)}
								<ChatMessage
									index={i}
									message={message}
									shouldRenderTimestamp={isLatestMessage}
									profileImageURL={this.props.opponentImageURL}
									userProfileImageUrl={this.props.userProfileImageUrl}
									userSpeechBubbleColor={this.props.userSpeechBubbleColor}
									getLanguageString={this.props.translate}
									onReplySelect={() => this.props.onReplySelect(message.id || "messege")}
								/>
							</Fragment>
						);
					})}
					{(this.props.typings && this.props.typings.length && (
						<div style={{ marginLeft: 20 }} className="opacity-4 padding-top-2">
							{this.parseTyping(this.props.typings)}
						</div>
					)) ||
						""}
					{/* invisible element required for automatic scrolling to bottom */}
					<div
						style={{ float: "left", clear: "both" }}
						ref={(el) => {
							this._messagesEnd = el;
						}}
					></div>
				</div>
			</Scrollbars>
		);
	}

	parseTyping = (typings) => {
		let length = typings.length;
		let lastIndex = length - 1;
		if (length > 1) {
			return `${typings.slice(0, lastIndex - 1).join(", ")} and ${
				typings[lastIndex]
			} ${this.props.translate("are typing")}`;
		} else {
			return `${typings[0]} ${this.props.translate("is typing")}`;
		}
	};

	_scrollToBottom = () => {
		this.scrollBarRef.current && this.scrollBarRef.current.scrollToBottom();
		// const node = ReactDOM.findDOMNode(this._messagesEnd)
		// node.scrollIntoView({behavior: 'smooth'})
	};
}

export default ChatMessages;
