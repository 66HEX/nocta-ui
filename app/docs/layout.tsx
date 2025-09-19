import type { ReactNode } from "react";
import { Toaster } from "@/app/components/ui/toast";
import { baseOptions } from "@/app/layout.config";
import { DocsLayout } from "@/components/layout/docs";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout tree={source.pageTree} {...baseOptions}>
			{children}
			<Toaster />
		</DocsLayout>
	);
}
