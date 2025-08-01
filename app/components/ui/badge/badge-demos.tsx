"use client";

import type React from "react";
import { Badge } from "./badge";

export const DefaultBadgeDemo: React.FC = () => {
	return (
		<div className="my-6">
			<Badge>Default</Badge>
		</div>
	);
};

export const SecondaryBadgeDemo: React.FC = () => {
	return (
		<div className="my-6">
			<Badge variant="secondary">Secondary</Badge>
		</div>
	);
};

export const VariantsDemo: React.FC = () => {
	return (
		<div className="my-6 flex flex-wrap gap-3">
			<Badge variant="default">Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="outline">Outline</Badge>
		</div>
	);
};

export const SizesDemo: React.FC = () => {
	return (
		<div className="my-6 flex flex-wrap items-center gap-3">
			<Badge size="sm">Small</Badge>
			<Badge size="md">Medium</Badge>
			<Badge size="lg">Large</Badge>
		</div>
	);
};

export const CustomStylingDemo: React.FC = () => {
	return (
		<div className="my-6 flex flex-wrap gap-3">
			<Badge className="bg-linear-to-r dark:from-purple-500 dark:to-pink-500 from-purple-500 to-pink-500 text-nocta-50 dark:text-nocta-50">
				Gradient
			</Badge>
			<Badge
				variant="secondary"
				className="bg-blue-500 dark:bg-blue-500/50 text-nocta-50 dark:text-nocta-50 shadow-lg"
			>
				Custom Color
			</Badge>
			<Badge className="rounded-sm">Square</Badge>
		</div>
	);
};
