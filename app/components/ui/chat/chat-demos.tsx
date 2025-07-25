"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "../button";
import {
	Chat,
	ChatActions,
	ChatDescription,
	ChatHeader,
	ChatTitle,
	type Message,
	type TypingUser,
} from "./chat";

export const BasicChatDemo: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: "Hello! How can I help you today?",
			sender: "assistant",
			timestamp: new Date(),
			name: "AI Assistant",
		},
	]);

	const handleSendMessage = (message: string) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			content: message,
			sender: "user",
			timestamp: new Date(),
			name: "You",
		};

		setMessages((prev) => [...prev, newMessage]);

		// Simulate assistant response
		setTimeout(() => {
			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: "Thanks for your message! I'm here to help.",
				sender: "assistant",
				timestamp: new Date(),
				name: "AI Assistant",
			};
			setMessages((prev) => [...prev, assistantMessage]);
		}, 1000);
	};

	return (
		<div className="my-6">
			<div className="">
				<Chat
					messages={messages}
					onSendMessage={handleSendMessage}
					placeholder="Type your message here..."
					className="w-xs md:w-lg h-64"
				/>
			</div>
		</div>
	);
};

export const ChatWithHeaderDemo: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: "Welcome to our support chat!",
			sender: "system",
			timestamp: new Date(),
		},
		{
			id: "2",
			content: "Hello! I'm here to help you with any questions.",
			sender: "assistant",
			timestamp: new Date(),
			name: "Support Agent",
			avatar:
				"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
		},
	]);

	const handleSendMessage = (message: string) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			content: message,
			sender: "user",
			timestamp: new Date(),
			name: "You",
		};

		setMessages((prev) => [...prev, newMessage]);

		// Simulate assistant response
		setTimeout(() => {
			const responses = [
				"I understand your concern. Let me help you with that.",
				"That's a great question! Here's what I can tell you...",
				"I'll need to check that for you. Give me a moment.",
				"Thanks for providing that information. Let me assist you further.",
			];

			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: responses[Math.floor(Math.random() * responses.length)],
				sender: "assistant",
				timestamp: new Date(),
				name: "Support Agent",
				avatar:
					"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
			};
			setMessages((prev) => [...prev, assistantMessage]);
		}, 1500);
	};

	return (
		<div className="my-6">
			<div className="">
				<Chat
					messages={messages}
					onSendMessage={handleSendMessage}
					showTimestamps
					showAvatars
					className="w-xs md:w-lg h-96"
				>
					<ChatHeader>
						<ChatTitle>Customer Support</ChatTitle>
						<ChatDescription>
							We're here to help! Chat with our support team.
						</ChatDescription>
					</ChatHeader>
				</Chat>
			</div>
		</div>
	);
};

export const ChatWithAvatarsDemo: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: "Hey everyone! Welcome to the group chat 👋",
			sender: "assistant",
			timestamp: new Date(Date.now() - 3600000),
			name: "Alice",
			avatar:
				"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
		},
		{
			id: "2",
			content:
				"Thanks for setting this up! Looking forward to our collaboration.",
			sender: "user",
			timestamp: new Date(Date.now() - 3500000),
			name: "Bob",
			avatar:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
		{
			id: "3",
			content: "Alice joined the chat",
			sender: "system",
			timestamp: new Date(Date.now() - 3000000),
		},
		{
			id: "4",
			content: "Same here! This is going to be great.",
			sender: "assistant",
			timestamp: new Date(Date.now() - 2000000),
			name: "Charlie",
			avatar:
				"https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	]);

	const handleSendMessage = (message: string) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			content: message,
			sender: "user",
			timestamp: new Date(),
			name: "You",
		};

		setMessages((prev) => [...prev, newMessage]);
	};

	return (
		<div className="my-6">
			<div className="">
				<Chat
					messages={messages}
					onSendMessage={handleSendMessage}
					showTimestamps
					showAvatars
					placeholder="Join the conversation..."
					className="w-xs md:w-lg h-88"
				/>
			</div>
		</div>
	);
};

export const ChatWithTimestampsDemo: React.FC = () => {
	const [messages] = useState<Message[]>([
		{
			id: "1",
			content: "Good morning! How can I assist you today?",
			sender: "assistant",
			timestamp: new Date(Date.now() - 300000),
			name: "Assistant",
		},
		{
			id: "2",
			content: "Hi! I have a question about my account.",
			sender: "user",
			timestamp: new Date(Date.now() - 240000),
			name: "User",
		},
		{
			id: "3",
			content:
				"Of course! I'd be happy to help with your account. What specific question do you have?",
			sender: "assistant",
			timestamp: new Date(Date.now() - 180000),
			name: "Assistant",
		},
		{
			id: "4",
			content:
				"I'm trying to update my billing information but can't find the option.",
			sender: "user",
			timestamp: new Date(Date.now() - 120000),
			name: "User",
		},
		{
			id: "5",
			content:
				"I can guide you through that! Go to Settings > Account > Billing Information.",
			sender: "assistant",
			timestamp: new Date(Date.now() - 60000),
			name: "Assistant",
		},
	]);

	const handleSendMessage = (message: string) => {
		console.log("Message sent:", message);
	};

	return (
		<div className="my-6">
			<div className="">
				<Chat
					messages={messages}
					onSendMessage={handleSendMessage}
					showTimestamps
					placeholder="Ask a question..."
					className="w-xs md:w-lg h-88"
				/>
			</div>
		</div>
	);
};

export const ReadOnlyChatDemo: React.FC = () => {
	const [messages] = useState<Message[]>([
		{
			id: "1",
			content: "This is a read-only chat",
			sender: "system",
			timestamp: new Date(Date.now() - 60000),
		},
		{
			id: "2",
			content: "Perfect for displaying conversation history",
			sender: "assistant",
			timestamp: new Date(Date.now() - 30000),
			name: "Assistant",
		},
		{
			id: "3",
			content: "Or showing announcements and updates",
			sender: "user",
			timestamp: new Date(),
			name: "User",
		},
	]);

	return (
		<div className="my-6">
			<div className="">
				<Chat
					messages={messages}
					showTimestamps
					showAvatars
					// No onSendMessage prop = read-only mode
					className="w-xs md:w-lg "
				/>
			</div>
		</div>
	);
};

export const ChatWithActionsDemo: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: "Hello! I'm your AI assistant. How can I help you today?",
			sender: "assistant",
			timestamp: new Date(),
			name: "AI Assistant",
		},
	]);

	const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

	const handleSendMessage = (message: string) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			content: message,
			sender: "user",
			timestamp: new Date(),
			name: "You",
		};

		setMessages((prev) => [...prev, newMessage]);
		setTypingUsers([{ id: "assistant", name: "AI Assistant" }]);

		// Simulate assistant response
		setTimeout(() => {
			setTypingUsers([]);
			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: "Thanks for your message! I'm processing your request.",
				sender: "assistant",
				timestamp: new Date(),
				name: "AI Assistant",
			};
			setMessages((prev) => [...prev, assistantMessage]);
		}, 2000);
	};

	const handleClearChat = () => {
		setMessages([
			{
				id: "1",
				content: "Chat cleared. How can I help you?",
				sender: "assistant",
				timestamp: new Date(),
				name: "AI Assistant",
			},
		]);
		setTypingUsers([]);
	};

	return (
		<div className="my-6">
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h4 className="text-lg font-medium text-nocta-900 dark:text-nocta-100">
						Chat with Actions
					</h4>
					<ChatActions>
						<Button variant="ghost" size="sm" onClick={handleClearChat}>
							Clear Chat
						</Button>
						<Button variant="secondary" size="sm">
							Export
						</Button>
					</ChatActions>
				</div>

				<div className="">
					<Chat
						messages={messages}
						onSendMessage={handleSendMessage}
						typingUsers={typingUsers}
						showTimestamps
						placeholder="Ask me anything..."
						className="w-xs md:w-lg h-73"
					/>
				</div>
			</div>
		</div>
	);
};

export const CustomStyledChatDemo: React.FC = () => {
	const [messages] = useState<Message[]>([
		{
			id: "1",
			content: "This chat has custom styling!",
			sender: "assistant",
			timestamp: new Date(),
			name: "Custom Bot",
		},
		{
			id: "2",
			content: "The colors and spacing can be customized",
			sender: "user",
			timestamp: new Date(),
			name: "User",
		},
	]);

	const handleSendMessage = (message: string) => {
		console.log("Message sent:", message);
	};

	return (
		<div className="my-6">
			<div className="">
				<Chat
					messages={messages}
					onSendMessage={handleSendMessage}
					showAvatars
					className="w-xs md:w-lg border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
					placeholder="Type with style..."
				/>
			</div>
		</div>
	);
};

export const TypingIndicatorDemo: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: "Hey there! Welcome to the team chat 👋",
			sender: "assistant",
			timestamp: new Date(Date.now() - 300000),
			name: "Sarah",
			avatar:
				"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
		},
		{
			id: "2",
			content: "Thanks! Excited to be here and start collaborating.",
			sender: "user",
			timestamp: new Date(Date.now() - 240000),
			name: "You",
		},
	]);

	const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
	const [simulationActive, setSimulationActive] = useState(false);

	const handleSendMessage = (message: string) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			content: message,
			sender: "user",
			timestamp: new Date(),
			name: "You",
		};

		setMessages((prev) => [...prev, newMessage]);

		// Simulate multiple people typing responses
		setTimeout(() => {
			setTypingUsers([
				{
					id: "sarah",
					name: "Sarah",
					avatar:
						"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
				},
			]);
		}, 500);

		setTimeout(() => {
			setTypingUsers([
				{
					id: "sarah",
					name: "Sarah",
					avatar:
						"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
				},
				{
					id: "mike",
					name: "Mike",
					avatar:
						"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
			]);
		}, 1500);

		setTimeout(() => {
			setTypingUsers([]);
			const responses = [
				"That's awesome! Looking forward to working together.",
				"Great to have you on board! 🎉",
				"Welcome to the team! Feel free to ask if you need anything.",
			];

			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: responses[Math.floor(Math.random() * responses.length)],
				sender: "assistant",
				timestamp: new Date(),
				name: "Sarah",
				avatar:
					"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
			};
			setMessages((prev) => [...prev, assistantMessage]);
		}, 3000);
	};

	const startTypingSimulation = () => {
		if (simulationActive) return;

		setSimulationActive(true);

		// Simulate various typing scenarios
		setTimeout(() => {
			setTypingUsers([
				{
					id: "sarah",
					name: "Sarah",
					avatar:
						"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
				},
			]);
		}, 1000);

		setTimeout(() => {
			setTypingUsers([
				{
					id: "sarah",
					name: "Sarah",
					avatar:
						"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
				},
				{
					id: "mike",
					name: "Mike",
					avatar:
						"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
			]);
		}, 3000);

		setTimeout(() => {
			setTypingUsers([
				{
					id: "sarah",
					name: "Sarah",
					avatar:
						"https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png",
				},
				{
					id: "mike",
					name: "Mike",
					avatar:
						"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
				{ id: "alex", name: "Alex" },
			]);
		}, 5000);

		setTimeout(() => {
			setTypingUsers([]);
			setSimulationActive(false);
		}, 7000);
	};

	return (
		<div className="my-6">
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h4 className="text-lg font-medium text-nocta-900 dark:text-nocta-100">
						Typing Indicator Demo
					</h4>
					<Button
						variant="secondary"
						size="sm"
						onClick={startTypingSimulation}
						disabled={simulationActive}
					>
						{simulationActive ? "Simulating..." : "Demo Typing"}
					</Button>
				</div>

				<div className="">
					<Chat
						messages={messages}
						onSendMessage={handleSendMessage}
						typingUsers={typingUsers}
						showTimestamps
						showAvatars
						placeholder="Send a message to see typing indicators..."
						className="w-xs md:w-lg h-96"
					>
						<ChatHeader>
							<ChatTitle>Team Chat</ChatTitle>
							<ChatDescription>
								Real-time typing indicators show when team members are
								responding
							</ChatDescription>
						</ChatHeader>
					</Chat>
				</div>

				<div className="text-sm text-nocta-600 dark:text-nocta-400 space-y-1">
					<p>
						<strong>Features demonstrated:</strong>
					</p>
					<ul className="list-disc list-inside space-y-1">
						<li>Single user typing indicator</li>
						<li>Multiple users typing simultaneously</li>
						<li>Smart text that handles different user counts</li>
						<li>Animated bouncing dots</li>
						<li>Integration with avatars</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
