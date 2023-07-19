import React, { useState } from "react";
import Chatmessages from "./ChatAppComponents/ChatMessages";
import ChatInput from "./ChatAppComponents/ChatInput";
import Header from "./ChatAppHeader";
import UserImg from "../../../Images/User.png";
import MeImg from "../../../Images/Mask Group 28.png";
import ReplyNotification from "./ChatAppReplyNotification";
import { Animation } from "rsuite";
import NotificationPanel from "./NotificationPanel";
function Chat() {
	const { Fade } = Animation;

	const [input, setInput] = useState("");
	const [replying, setReplying] = useState(null);
	const [messages, setMessages] = useState([
		{
			loading: false,
			image: null,
			createdAt: new Date(),
			opponent: {
				name: "Test",
				imageUrl: null
			},
			gif: null,
			emoji: null,
			text: "Me"
		},
		{
			loading: false,
			image: null,
			createdAt: new Date(),
			gif: null,
			emoji: null,
			text: "You",
			hasNotification: true
		},

		{
			loading: false,
			image: null,
			createdAt: new Date(),
			gif: null,
			emoji: null,
			text: "You",
			files: [
				{
					name: "abc",
					link: "abc"
				}
			]
		}
	]);
	return (
		<div>
			{replying ? (
				<Fade in={replying} timeout={700}>
					<ReplyNotification onReplySelected={(commentId) => setReplying(commentId)} />
				</Fade>
			) : (
				<Header />
			)}
			<div className="chat-app" style={{ position: "relative", background: "#FFF" }}>
				<div style={{ height: "calc(100vh - 200px)", overflow: "hidden" }}>
					{replying ? (
						<Fade in={replying} timeout={700}>
							<NotificationPanel
								onReplySelected={(commentId) => setReplying(commentId)}
								style={{ height: "calc(100vh - 280px)" }}
							/>
						</Fade>
					) : (
						<Chatmessages
							style={{ height: "calc(100vh - 280px)" }}
							messages={messages}
							onReplySelect={(commentId) => setReplying(commentId)}
							opponentImageURL={UserImg}
							userSpeechBubbleColor="linear-gradient(0deg, rgba(148,188,88,1) 0%, rgba(131,175,87,1) 38%, rgba(86,140,85,1) 76%, rgba(62,121,84,1) 99%)"
							translate={(k) => k}
							userProfileImageUrl={MeImg}
						/>
					)}
					<ChatInput
						onEmoji={() => {}}
						onGif={() => {}}
						onTextInput={setInput}
						onDrop={() => {}}
						message={input}
						onSend={() => {
							setMessages(
								messages.concat({
									loading: false,
									image: null,
									createdAt: new Date(),
									gif: null,
									emoji: null,
									text: input
								})
							);
							setInput("");
						}}
						onResetText={() => setInput("")}
					/>
				</div>
			</div>
		</div>
	);
}

export default Chat;
