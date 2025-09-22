"use client";

import React from "react";
import {
	FileIcon,
	ArchiveIcon,
	GearIcon,
	MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

import { Button } from "../button";
import { toast } from "../toast";
import { CommandK, type CommandKItem } from "./command-k";

export const BasicCommandKDemo: React.FC = () => {
	const [open, setOpen] = React.useState(false);

	const items: CommandKItem[] = [
		{
			label: "Search docs",
			group: "Navigation",
			description: "Go to documentation",
			icon: <MagnifyingGlassIcon aria-hidden="true" className="h-4 w-4" />,
			shortcut: ["S"],
		},
		{
			label: "Open settings",
			group: "Navigation",
			description: "Application preferences",
			icon: <GearIcon aria-hidden="true" className="h-4 w-4" />,
			shortcut: ["O"],
		},
		{
			label: "New file",
			group: "Actions",
			description: "Create an untitled file",
			icon: <FileIcon aria-hidden="true" className="h-4 w-4" />,
			shortcut: ["Shift", "F"],
		},
		{
			label: "New folder",
			group: "Actions",
			description: "Create a folder",
			icon: <ArchiveIcon aria-hidden="true" className="h-4 w-4" />,
			shortcut: ["Shift", "G"],
		},
	];

	return (
		<div className="my-6 flex items-center gap-3">
			<Button onClick={() => setOpen(true)}>Open Command Palette</Button>
			<span className="text-sm text-primary-muted">Or press ⌘K / Ctrl+K</span>

			<CommandK
				items={items}
				open={open}
				onOpenChange={setOpen}
				size="lg"
				onSelect={(it) => {
					toast.success({
						title: "Command executed",
						description: `Selected: ${it.label}`,
					});
				}}
			/>
		</div>
	);
};
