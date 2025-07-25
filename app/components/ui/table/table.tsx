"use client";

import { cva, type VariantProps } from "class-variance-authority";
import React, { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "../spinner";

const hasBackgroundColor = (className: string = "") => {
	return /bg-(?!linear|gradient|none)\w+/.test(className);
};

const tableContainerVariants = cva(
	"rounded-xl shadow-md dark:shadow-lg backdrop-blur-sm overflow-hidden",
	{
		variants: {
			variant: {
				default: "",
				striped: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const tableVariants = cva("w-full border-collapse", {
	variants: {
		size: {
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const tableRowVariants = cva("", {
	variants: {
		variant: {
			default: "",
			striped: "",
		},
		isOdd: {
			true: "",
			false: "",
		},
		clickable: {
			true: "cursor-pointer hover:bg-nocta-50 dark:hover:bg-nocta-900/50 transition-colors duration-200 ease-in-out",
			false: "",
		},
	},
	compoundVariants: [
		{
			variant: "striped",
			isOdd: true,
			class: "bg-nocta-200/50 dark:bg-nocta-800/30",
		},
	],
	defaultVariants: {
		variant: "default",
		isOdd: false,
		clickable: false,
	},
});

export type SortDirection = "asc" | "desc" | null;
export type TableVariant = "default" | "striped";
export type TableSize = "sm" | "md" | "lg";

export interface TableColumn<T = Record<string, unknown>> {
	key: string;
	title: string;
	sortable?: boolean;
	filterable?: boolean;
	render?: (value: unknown, record: T, index: number) => React.ReactNode;
	width?: string | number;
	align?: "left" | "center" | "right";
	className?: string;
}

export interface TableProps<T = Record<string, unknown>>
	extends Omit<React.TableHTMLAttributes<HTMLTableElement>, "size">,
		VariantProps<typeof tableContainerVariants>,
		VariantProps<typeof tableVariants> {
	columns: TableColumn<T>[];
	data: T[];
	loading?: boolean;
	emptyText?: string;
	sortable?: boolean;
	filterable?: boolean;
	pagination?: {
		current: number;
		pageSize: number;
		total: number;
		onChange: (page: number, pageSize: number) => void;
	};
	onSort?: (key: string, direction: SortDirection) => void;
	onFilter?: (filters: Record<string, string>) => void;
	className?: string;
	rowKey?: string | ((record: T) => string);
	onRowClick?: (record: T, index: number) => void;
	rowClassName?: string | ((record: T, index: number) => string);
}

export interface TableHeaderProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
	className?: string;
}

export interface TableBodyProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
	className?: string;
}

export interface TableRowProps
	extends React.HTMLAttributes<HTMLTableRowElement>,
		VariantProps<typeof tableRowVariants> {
	children: React.ReactNode;
	className?: string;
}

export interface TableCellProps
	extends React.HTMLAttributes<HTMLTableCellElement> {
	children: React.ReactNode;
	className?: string;
	align?: "left" | "center" | "right";
	header?: boolean;
	sortable?: boolean;
	sortDirection?: SortDirection;
	onSort?: () => void;
	colSpan?: number;
	rowSpan?: number;
}

export interface TableFooterProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
	className?: string;
}

export interface TableCaptionProps
	extends React.HTMLAttributes<HTMLTableCaptionElement> {
	children: React.ReactNode;
	className?: string;
}

export const Table = <T extends Record<string, unknown>>({
	columns,
	data,
	variant = "default",
	size = "md",
	loading = false,
	emptyText = "No data available",
	sortable = false,
	filterable = false,
	pagination,
	onSort,
	onFilter,
	className = "",
	rowKey = "id",
	onRowClick,
	rowClassName,
	...props
}: TableProps<T>) => {
	const [sortState, setSortState] = useState<{
		key: string;
		direction: SortDirection;
	}>({
		key: "",
		direction: null,
	});
	const [filters, setFilters] = useState<Record<string, string>>({});
	const shouldOverrrideBackground = hasBackgroundColor(className);

	const getRowKey = useCallback(
		(record: T, index: number): string => {
			if (typeof rowKey === "function") {
				return rowKey(record);
			}
			return String(record[rowKey] || index);
		},
		[rowKey],
	);

	const handleSort = useCallback(
		(key: string) => {
			if (!sortable) return;

			let newDirection: SortDirection = "asc";

			if (sortState.key === key) {
				if (sortState.direction === "asc") {
					newDirection = "desc";
				} else if (sortState.direction === "desc") {
					newDirection = null;
				}
			}

			setSortState({ key, direction: newDirection });
			onSort?.(key, newDirection);
		},
		[sortable, sortState, onSort],
	);

	const handleFilter = useCallback(
		(key: string, value: string) => {
			const newFilters = { ...filters, [key]: value };
			if (!value) {
				delete newFilters[key];
			}
			setFilters(newFilters);
			onFilter?.(newFilters);
		},
		[filters, onFilter],
	);

	const sortedAndFilteredData = useMemo(() => {
		let result = [...data];

		if (filterable && Object.keys(filters).length > 0) {
			result = result.filter((record) => {
				return Object.entries(filters).every(([key, filterValue]) => {
					const cellValue = record[key]?.toString().toLowerCase() || "";
					return cellValue.includes(filterValue.toLowerCase());
				});
			});
		}

		if (sortable && sortState.key && sortState.direction) {
			result.sort((a, b) => {
				const aVal = a[sortState.key];
				const bVal = b[sortState.key];

				const aStr = String(aVal ?? "");
				const bStr = String(bVal ?? "");

				return sortState.direction === "asc"
					? aStr.localeCompare(bStr)
					: bStr.localeCompare(aStr);
			});
		}

		return result;
	}, [data, filters, sortState, sortable, filterable]);

	const getRowClassName = useCallback(
		(record: T, index: number): string => {
			let baseClassName = "";

			if (typeof rowClassName === "function") {
				baseClassName += rowClassName(record, index);
			} else if (rowClassName) {
				baseClassName += rowClassName;
			}

			return baseClassName.trim();
		},
		[rowClassName],
	);

	return (
		<div className="not-prose relative p-[1px] bg-linear-to-b from-nocta-200 dark:from-nocta-600/50 to-transparent rounded-xl">
			<div
				className={cn(
					tableContainerVariants({ variant }),
					shouldOverrrideBackground ? "" : "bg-nocta-100 dark:bg-nocta-900",
					className,
				)}
			>
				<div className="overflow-x-auto">
					<table className={cn(tableVariants({ size }))} {...props}>
						<TableHeader>
							<TableRow variant={variant}>
								{columns.map((column) => (
									<TableCell
										key={column.key}
										header
										align={column.align}
										sortable={sortable && column.sortable !== false}
										sortDirection={
											sortState.key === column.key ? sortState.direction : null
										}
										onSort={() => handleSort(column.key)}
										className={column.className}
										style={{ width: column.width }}
									>
										<div className="flex flex-col gap-1">
											<span>{column.title}</span>
											{filterable && column.filterable !== false && (
												<input
													type="text"
													placeholder="Filter..."
													value={filters[column.key] || ""}
													onChange={(e) =>
														handleFilter(column.key, e.target.value)
													}
													className="px-2 py-1 text-xs rounded border border-nocta-200/60 dark:border-nocta-600/60 bg-nocta-50/80 dark:bg-nocta-900/80 text-nocta-900 dark:text-nocta-100 placeholder:text-nocta-400 dark:placeholder:text-nocta-500 focus:outline-none focus:border-nocta-400 dark:focus:border-nocta-500 focus:bg-white dark:focus:bg-nocta-800 transition-all duration-200 backdrop-blur-sm"
													onClick={(e) => e.stopPropagation()}
												/>
											)}
										</div>
									</TableCell>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow variant={variant}>
									<TableCell
										colSpan={columns.length}
										align="center"
										className="py-12"
									>
										<div className="flex items-center justify-center">
											<Spinner size="lg" variant="primary" />
										</div>
									</TableCell>
								</TableRow>
							) : sortedAndFilteredData.length === 0 ? (
								<TableRow variant={variant}>
									<TableCell
										colSpan={columns.length}
										align="center"
										className="py-12 text-nocta-500 dark:text-nocta-400"
									>
										{emptyText}
									</TableCell>
								</TableRow>
							) : (
								sortedAndFilteredData.map((record, index) => (
									<TableRow
										key={getRowKey(record, index)}
										variant={variant}
										isOdd={index % 2 === 1}
										clickable={!!onRowClick}
										className={getRowClassName(record, index)}
										onClick={() => onRowClick?.(record, index)}
									>
										{columns.map((column) => {
											const value = record[column.key];
											const content = column.render
												? column.render(value, record, index)
												: value?.toString() || "";

											return (
												<TableCell
													key={column.key}
													align={column.align}
													className={column.className}
												>
													{content}
												</TableCell>
											);
										})}
									</TableRow>
								))
							)}
						</TableBody>
					</table>
				</div>

				{pagination && (
					<div className="px-6 py-4 bg-nocta-200/50 dark:bg-nocta-800/50 border-t border-nocta-200 dark:border-nocta-800/50 flex items-center justify-between">
						<div className="text-sm text-nocta-600 dark:text-nocta-400">
							Showing{" "}
							{Math.min(
								(pagination.current - 1) * pagination.pageSize + 1,
								pagination.total,
							)}{" "}
							to{" "}
							{Math.min(
								pagination.current * pagination.pageSize,
								pagination.total,
							)}{" "}
							of {pagination.total} entries
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() =>
									pagination.onChange(
										pagination.current - 1,
										pagination.pageSize,
									)
								}
								disabled={pagination.current <= 1}
								className="px-3 py-1.5 text-sm rounded-lg border border-nocta-300 dark:border-nocta-600 bg-white dark:bg-nocta-900 text-nocta-700 dark:text-nocta-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-nocta-100 dark:hover:bg-nocta-800 transition-colors duration-200 ease-in-out cursor-pointer"
							>
								Previous
							</button>
							<span className="px-3 py-1.5 text-sm text-nocta-600 dark:text-nocta-400">
								Page {pagination.current} of{" "}
								{Math.ceil(pagination.total / pagination.pageSize)}
							</span>
							<button
								onClick={() =>
									pagination.onChange(
										pagination.current + 1,
										pagination.pageSize,
									)
								}
								disabled={
									pagination.current >=
									Math.ceil(pagination.total / pagination.pageSize)
								}
								className="px-3 py-1.5 text-sm rounded-lg border border-nocta-300 dark:border-nocta-600 bg-white dark:bg-nocta-900 text-nocta-700 dark:text-nocta-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-nocta-100 dark:hover:bg-nocta-800 transition-colors duration-200 ease-in-out cursor-pointer"
							>
								Next
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export const TableHeader: React.FC<TableHeaderProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<thead
			className={cn(
				"bg-nocta-200/50 dark:bg-nocta-800/50 border-b border-nocta-200 dark:border-nocta-800/50",
				className,
			)}
			{...props}
		>
			{children}
		</thead>
	);
};

export const TableBody: React.FC<TableBodyProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<tbody
			className={cn(
				"divide-y divide-nocta-200 dark:divide-nocta-700/50",
				className,
			)}
			{...props}
		>
			{children}
		</tbody>
	);
};

export const TableRow: React.FC<TableRowProps> = ({
	children,
	className = "",
	variant = "default",
	isOdd = false,
	clickable = false,
	...props
}) => {
	return (
		<tr
			className={cn(tableRowVariants({ variant, isOdd, clickable }), className)}
			{...props}
		>
			{children}
		</tr>
	);
};

export const TableCell: React.FC<TableCellProps> = ({
	children,
	className = "",
	align = "left",
	header = false,
	sortable = false,
	sortDirection = null,
	onSort,
	colSpan,
	rowSpan,
	...props
}) => {
	const Component = header ? "th" : "td";

	const getAlignmentClass = () => {
		const alignments = {
			left: "text-left",
			center: "text-center",
			right: "text-right",
		};
		return alignments[align];
	};

	const getSortIcon = () => {
		if (!sortable) return null;

		return (
			<span className="ml-2 inline-flex flex-col">
				<svg
					className={cn(
						"w-3 h-3",
						sortDirection === "asc"
							? "text-nocta-900 dark:text-nocta-100"
							: "text-nocta-400 dark:text-nocta-500",
					)}
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
						clipRule="evenodd"
					/>
				</svg>
				<svg
					className={cn(
						"w-3 h-3",
						sortDirection === "desc"
							? "text-nocta-900 dark:text-nocta-100"
							: "text-nocta-400 dark:text-nocta-500",
					)}
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</span>
		);
	};

	return React.createElement(
		Component,
		{
			className: cn(
				"px-6 py-4",
				getAlignmentClass(),
				header
					? "font-semibold text-nocta-900 dark:text-nocta-100 tracking-tight"
					: "text-nocta-700 dark:text-nocta-300",
				sortable
					? "cursor-pointer hover:bg-nocta-100 dark:hover:bg-nocta-800/50 select-none transition-colors duration-200 ease-in-out"
					: "",
				className,
			),
			onClick: sortable ? onSort : undefined,
			colSpan,
			rowSpan,
			...props,
		},
		sortable || header ? (
			<div
				className={`flex items-center ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}
			>
				{children}
				{getSortIcon()}
			</div>
		) : (
			children
		),
	);
};

export const TableFooter: React.FC<TableFooterProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<tfoot
			className={cn(
				"bg-nocta-200/50 dark:bg-nocta-800/50 border-t border-nocta-200 dark:border-nocta-800/50 font-semibold",
				className,
			)}
			{...props}
		>
			{children}
		</tfoot>
	);
};

export const TableCaption: React.FC<TableCaptionProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<caption
			className={cn(
				"py-3 text-sm text-nocta-600 dark:text-nocta-400",
				className,
			)}
			{...props}
		>
			{children}
		</caption>
	);
};
