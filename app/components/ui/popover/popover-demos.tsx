"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const BasicPopoverDemo: React.FC = () => {
	return (
		<div className="my-6 flex justify-center">
			<Popover>
				<PopoverTrigger>Open Popover</PopoverTrigger>
				<PopoverContent>
					<div className="space-y-2">
						<h4 className="font-medium text-sm">About this feature</h4>
						<p className="text-sm text-nocta-600 dark:text-nocta-400">
							This is a popover component that can contain any content you want.
						</p>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export const SidesDemo: React.FC = () => {
	return (
		<div className="my-6 flex flex-wrap gap-4 justify-center">
			<Popover>
				<PopoverTrigger>Top</PopoverTrigger>
				<PopoverContent side="top">
					<p className="text-sm">Popover on top</p>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>Right</PopoverTrigger>
				<PopoverContent side="right">
					<p className="text-sm">Popover on right</p>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>Bottom</PopoverTrigger>
				<PopoverContent side="bottom">
					<p className="text-sm">Popover on bottom</p>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>Left</PopoverTrigger>
				<PopoverContent side="left">
					<p className="text-sm">Popover on left</p>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export const AlignmentDemo: React.FC = () => {
	return (
		<div className="my-6 space-y-4">
			<div className="flex gap-4 justify-center">
				<Popover>
					<PopoverTrigger>Start</PopoverTrigger>
					<PopoverContent side="bottom" align="start">
						<p className="text-sm">Aligned to start</p>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger>Center</PopoverTrigger>
					<PopoverContent side="bottom" align="center">
						<p className="text-sm">Aligned to center</p>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger>End</PopoverTrigger>
					<PopoverContent side="bottom" align="end">
						<p className="text-sm">Aligned to end</p>
					</PopoverContent>
				</Popover>
			</div>

			<div className="flex flex-col gap-4 items-center">
				<Popover>
					<PopoverTrigger>Side Start</PopoverTrigger>
					<PopoverContent side="right" align="start">
						<p className="text-sm">Side aligned to start</p>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger>Side Center</PopoverTrigger>
					<PopoverContent side="right" align="center">
						<p className="text-sm">Side aligned to center</p>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger>Side End</PopoverTrigger>
					<PopoverContent side="right" align="end">
						<p className="text-sm">Side aligned to end</p>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export const OffsetsDemo: React.FC = () => {
	return (
		<div className="my-6 flex gap-4 justify-center">
			<Popover>
				<PopoverTrigger>Default Offset</PopoverTrigger>
				<PopoverContent>
					<p className="text-sm">Default offset (8px)</p>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>Large Offset</PopoverTrigger>
				<PopoverContent sideOffset={20}>
					<p className="text-sm">Large side offset (20px)</p>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger>Align Offset</PopoverTrigger>
				<PopoverContent alignOffset={50}>
					<p className="text-sm">Align offset (50px)</p>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export const AsChildDemo: React.FC = () => {
	return (
		<div className="my-6 flex gap-4 justify-center">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="secondary">Custom Button</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className="space-y-2">
						<h4 className="font-medium text-sm">Custom Trigger</h4>
						<p className="text-sm text-nocta-600 dark:text-nocta-400">
							Using asChild prop to render a custom button component.
						</p>
					</div>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<button className="px-3 py-2 bg-blue-500 dark:bg-blue-600/50 text-nocta-50 rounded-md hover:bg-blue-600">
						Custom Element
					</button>
				</PopoverTrigger>
				<PopoverContent>
					<p className="text-sm">Any element can be a trigger!</p>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export const ControlledDemo: React.FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="my-6 space-y-4">
			<div className="flex gap-2 justify-center">
				<button
					onClick={() => setOpen(true)}
					className="px-3 py-1 text-sm bg-green-500 dark:bg-green-600/50 text-nocta-50 rounded hover:bg-green-600"
				>
					Open
				</button>
				<button
					onClick={() => setOpen(false)}
					className="px-3 py-1 text-sm bg-red-500 dark:bg-red-600/50 text-nocta-50 rounded hover:bg-red-600"
				>
					Close
				</button>
				<span className="px-3 py-1 text-sm bg-nocta-100 dark:bg-nocta-900 rounded">
					State: {open ? "Open" : "Closed"}
				</span>
			</div>
			<div className="flex gap-4 justify-center">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger>Controlled Popover</PopoverTrigger>
					<PopoverContent>
						<div className="space-y-2">
							<h4 className="font-medium text-sm">Controlled State</h4>
							<p className="text-sm text-nocta-600 dark:text-nocta-400">
								This popover&apos;s state is controlled externally.
							</p>
							<button
								onClick={() => setOpen(false)}
								className="px-2 py-1 text-xs bg-nocta-100 dark:bg-nocta-900 rounded hover:bg-nocta-200 dark:hover:bg-nocta-800"
							>
								Close from inside
							</button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export const RichContentDemo: React.FC = () => {
	return (
		<div className="my-6 flex justify-center">
			<Popover>
				<PopoverTrigger>Rich Content</PopoverTrigger>
				<PopoverContent className="w-80">
					<div className="space-y-4">
						<div>
							<h3 className="font-semibold text-base mb-2">User Profile</h3>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-nocta-50 font-medium">
									JD
								</div>
								<div>
									<p className="font-medium text-sm">John Doe</p>
									<p className="text-xs text-nocta-600 dark:text-nocta-400">
										john@example.com
									</p>
								</div>
							</div>
						</div>

						<div className="border-t border-nocta-300 dark:border-nocta-700 pt-3">
							<div className="space-y-2">
								<button className="w-full text-left px-2 py-1 text-sm hover:bg-nocta-100 dark:hover:bg-nocta-900 rounded">
									View Profile
								</button>
								<button className="w-full text-left px-2 py-1 text-sm hover:bg-nocta-100 dark:hover:bg-nocta-900 rounded">
									Settings
								</button>
								<button className="w-full text-left px-2 py-1 text-sm hover:bg-nocta-100 dark:hover:bg-nocta-900 rounded text-red-600 dark:text-red-400">
									Sign Out
								</button>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export const FormPopoverDemo: React.FC = () => {
	const [open, setOpen] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setOpen(false);
	};

	return (
		<div className="my-6 flex justify-center">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger>Create New Item</PopoverTrigger>
				<PopoverContent className="w-72">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<h4 className="font-medium text-sm mb-3">Create New Item</h4>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-medium text-nocta-700 dark:text-nocta-300">
								Name
							</label>
							<input
								type="text"
								placeholder="Enter item name"
								className="w-full px-3 py-2 text-sm border border-nocta-300 dark:border-nocta-700 rounded-md bg-nocta-100 dark:bg-nocta-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-nocta-500 dark:focus-visible:ring-nocta-400"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-medium text-nocta-700 dark:text-nocta-300">
								Description
							</label>
							<textarea
								placeholder="Enter description"
								rows={3}
								className="w-full px-3 py-2 text-sm border border-nocta-300 dark:border-nocta-700 rounded-md bg-nocta-100 dark:bg-nocta-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-nocta-500 dark:focus-visible:ring-nocta-400 resize-none"
							/>
						</div>

						<div className="flex gap-2 pt-2">
							<button
								type="submit"
								className="flex-1 px-3 py-2 text-sm bg-linear-to-b from-nocta-900 to-nocta-700 dark:from-white dark:to-nocta-300 text-nocta-50 dark:text-nocta-900 rounded-md hover:bg-nocta-900 dark:hover:bg-nocta-200 font-medium"
							>
								Create
							</button>
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="px-3 py-2 text-sm border border-nocta-300 dark:border-nocta-700 rounded-md hover:bg-nocta-50 dark:hover:bg-nocta-900"
							>
								Cancel
							</button>
						</div>
					</form>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export const CollisionDetectionDemo: React.FC = () => {
	return (
		<div className="my-6 space-y-4">
			<p className="text-sm text-center text-nocta-600 dark:text-nocta-400">
				Try these popovers near the edges of the viewport
			</p>

			<div className="flex justify-between">
				<Popover>
					<PopoverTrigger>Left Edge</PopoverTrigger>
					<PopoverContent side="left" avoidCollisions={true}>
						<p className="text-sm">This will flip to the right if needed</p>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger>Right Edge</PopoverTrigger>
					<PopoverContent side="right" avoidCollisions={true}>
						<p className="text-sm">This will flip to the left if needed</p>
					</PopoverContent>
				</Popover>
			</div>

			<div className="flex flex-col gap-4">
				<Popover>
					<PopoverTrigger>Top Edge</PopoverTrigger>
					<PopoverContent side="top" avoidCollisions={true}>
						<p className="text-sm">This will flip to bottom if needed</p>
					</PopoverContent>
				</Popover>

				<div className="h-20"></div>

				<Popover>
					<PopoverTrigger>Bottom Edge</PopoverTrigger>
					<PopoverContent side="bottom" avoidCollisions={true}>
						<p className="text-sm">This will flip to top if needed</p>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};
