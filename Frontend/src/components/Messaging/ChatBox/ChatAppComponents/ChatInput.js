import React, { Component, Fragment, useState } from "react";
import "./ChatInput.css";
import Dropzone from "react-dropzone";
import Textarea from "react-textarea-autosize";
import {  Whisper, IconButton, Popover } from "rsuite";
import { useMediaQuery } from "react-responsive";
import { Icon } from '@rsuite/icons';

const initialState = {
	inputHasFocus: true,
	isEmojiPopoverOpen: false,
	isGifPopoverOpen: false
};
function ChatInput(props) {
	const [state, setState] = useState({ ...initialState });
	const onEmojiSelect = (emoji) => {
		setState((prev) => ({ ...prev, isEmojiPopoverOpen: false }));
		// console.log({ emoji })
		props.onEmoji(emoji.id);
	};
	const onGifSelect = (gif) => {
		setState((prev) => ({ ...prev, isGifPopoverOpen: false }));
		props.onGif(gif.images.preview_gif.url);
	};

	let { isEmojiPopoverOpen, isGifPopoverOpen } = state;
	const speaker = (
		<Popover
			style={{
				borderRadius: "25px",
				padding: "10px",
				overflow: "hidden",
				overflowY: "hidden"
			}}
		>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						fontSize: "20px",
						fontWeight: "900",
						borderRight: "1px solid #000",
						justifyContent: "center"
					}}
				>
					<p>Via</p>
					<Icon icon="mobile" style={{ fontSize: "30px", margin: "0px 5px" }} />
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						fontSize: "20px",
						fontWeight: "900",
						justifyContent: "center",
						alignContent: "center",
						alignItems: "center",
						margin: "0px 0px 0px 5px"
					}}
				>
					<p>Via</p>
					<Icon icon="envelope" style={{ fontSize: "20px", margin: "0px 5px" }} />
				</div>
			</div>
		</Popover>
	);
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

	const _onKeyDown = (e) => {
		if (e.keyCode === 13) {
			// ENTER
			if (e.shiftKey) {
				// allow new lines with ENTER + SHIFT
				return;
			}
			if (props.message) {
				props.onSend();
				props.onResetText();
			}
			e.preventDefault();
		}
	};
	return (
		<div
			className={`chat-input flex items-center
            ${state.inputHasFocus ? "chat-input-shadow" : "light-background"}`}
			style={{ overflow: "hidden" }}
		>
			<Fragment>
				<Icon icon="plus" className="icon" />
				<Icon icon="smile-o" className="icon" />

				<Dropzone
					className="input-dropzone"
					onDrop={props.onDrop}
					accept="image/*"
					multiple={false}
				>
					{(dropzoneProps) => {
						return (
							<div className="attachment-container h100">
								<Icon className="opacity-3 pointer icon" icon="attachment"  />
							</div>
						);
					}}
				</Dropzone>
			</Fragment>
			<Textarea
				minRows={1}
				maxRows={5}
				className={`InputField ${!state.inputHasFocus && "light-background"}`}
				placeholder={"Send a message..."}
				value={props.message}
				autoFocus={true}
				onChange={(e) => props.onTextInput(e.target.value)}
				onKeyDown={_onKeyDown}
				onFocus={() => {
					setState((prev) => ({ ...prev, inputHasFocus: true }));
				}}
				onBlur={() => {
					setState((prev) => ({ ...prev, inputHasFocus: false }));
				}}
			/>
			<Whisper placement="bottom" trigger="click" controlId="control-id-click" speaker={speaker}>
				<Icon size="2x" icon="microphone" style={{ margin: "0px 15px" }} />
			</Whisper>

			<IconButton
				icon={<Icon icon="caret-down" style={{ background: "green" }} />}
				active
				color="green"
				placement="right"
				onClick={() => {
					props.onSend();
					props.onResetText();
				}}
				style={{ fontSize: isTabletOrMobile ? "14px" : "20px" }}
			>
				<span style={{ paddingRight: isTabletOrMobile ? "30px" : "23px" }}>Send</span>
			</IconButton>
		</div>
	);
}

export default ChatInput;
