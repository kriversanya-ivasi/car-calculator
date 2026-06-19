import * as React from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/ui/accordion.tsx
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
	className: "flex",
	children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/number-input.tsx
/**
* Числовой input с дружелюбным вводом:
* - можно полностью очистить (не подставляется "0");
* - поддерживает "." и "," как десятичные разделители;
* - разрешает промежуточные состояния ("2.", "2,", "");
* - синхронизируется с внешним значением, не затирая ввод.
*/
var NumberInput = forwardRef(({ value, onValueChange, emptyValue = 0, className, inputMode, onBlur, ...rest }, ref) => {
	const [text, setText] = useState(() => value === emptyValue ? "" : String(value));
	const lastEmittedRef = useRef(value);
	useEffect(() => {
		if (value !== lastEmittedRef.current) {
			setText(value === emptyValue ? "" : String(value));
			lastEmittedRef.current = value;
		}
	}, [value, emptyValue]);
	return /* @__PURE__ */ jsx(Input, {
		ref,
		type: "text",
		inputMode: inputMode ?? "decimal",
		autoComplete: "off",
		value: text,
		onChange: (e) => {
			const raw = e.target.value;
			if (!/^-?\d*[.,]?\d*$/.test(raw)) return;
			setText(raw);
			if (raw === "" || raw === "-" || raw === "." || raw === ",") {
				lastEmittedRef.current = emptyValue;
				onValueChange(emptyValue);
				return;
			}
			const normalized = raw.replace(",", ".");
			if (normalized.endsWith(".")) return;
			const n = Number(normalized);
			if (!isNaN(n)) {
				lastEmittedRef.current = n;
				onValueChange(n);
			}
		},
		onBlur: (e) => {
			const raw = text.replace(",", ".");
			if (raw.endsWith(".")) {
				const trimmed = raw.slice(0, -1);
				setText(trimmed);
				const n = Number(trimmed);
				if (!isNaN(n)) {
					lastEmittedRef.current = n;
					onValueChange(n);
				}
			}
			onBlur?.(e);
		},
		className: cn(className),
		...rest
	});
});
NumberInput.displayName = "NumberInput";
//#endregion
//#region src/lib/format.ts
function formatNumber(value, fractionDigits = 0) {
	if (!isFinite(value) || isNaN(value)) return "—";
	return new Intl.NumberFormat("ru-RU", {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits
	}).format(value);
}
function parseNumber(value) {
	if (!value) return 0;
	const cleaned = value.replace(/\s/g, "").replace(",", ".");
	const n = Number(cleaned);
	return isNaN(n) ? 0 : n;
}
//#endregion
export { Accordion as a, AccordionTrigger as c, Input as i, Button as l, parseNumber as n, AccordionContent as o, NumberInput as r, AccordionItem as s, formatNumber as t, cn as u };
