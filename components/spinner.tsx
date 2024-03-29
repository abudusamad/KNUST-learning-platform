import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
	variants: {
		size: {
			default: "w-6 h-6",
			sm: "w-4 h-4",
			md: "w-8 h-8",
			lg: "w-12 h-12",
			xl: "w-16 h-16",
			icon: "w-6 h-6",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size }: SpinnerProps) => {
	return <Loader className={cn(spinnerVariants({ size }))} />;
};
