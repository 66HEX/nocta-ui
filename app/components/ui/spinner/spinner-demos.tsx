"use client";

import React from "react";
import { Button } from "../button";
import { Spinner } from "./spinner";

export const BasicSpinnerDemo: React.FC = () => {
	return (
		<div className="my-6">
			<Spinner />
		</div>
	);
};

export const SizesDemo: React.FC = () => {
	return (
		<div className="my-6 flex flex-wrap items-center gap-6">
			<div className="flex flex-col items-center gap-2">
				<Spinner size="sm" />
				<span className="text-xs text-primary-muted">Small</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Spinner size="md" />
				<span className="text-xs text-primary-muted">Medium</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Spinner size="lg" />
				<span className="text-xs text-primary-muted">Large</span>
			</div>
		</div>
	);
};

export const LoadingButtonDemo: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	const handleClick = () => {
		setIsLoading(true);
		setTimeout(() => setIsLoading(false), 2000);
	};

	return (
		<div className="my-6">
			<Button
				onClick={handleClick}
				disabled={isLoading}
				className="min-w-[120px]"
			>
				{isLoading ? (
					<div className="flex items-center gap-2">
						<Spinner size="sm" className="text-primary-foreground" />
						<span>Loading...</span>
					</div>
				) : (
					"Click me"
				)}
			</Button>
		</div>
	);
};

export const InlineSpinnerDemo: React.FC = () => {
	return (
		<div className="my-6">
			<div className="flex items-center gap-2 text-sm text-primary-muted">
				<Spinner size="sm" />
				<span>Processing your request...</span>
			</div>
		</div>
	);
};

export const CustomColorDemo: React.FC = () => {
	return (
		<div className="my-6 flex flex-wrap items-center gap-4">
			<Spinner className="text-blue-500 dark:text-blue-500/50" />
			<Spinner className="text-green-500 dark:text-green-500/50" />
			<Spinner className="text-red-500 dark:text-red-500/50" />
			<Spinner className="text-purple-500 dark:text-purple-500/50" />
			<Spinner className="text-orange-500 dark:text-orange-500/50" />
		</div>
	);
};
