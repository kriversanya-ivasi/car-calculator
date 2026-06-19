import { n as useSettings } from "./settings-store-Vw4i62tM.js";
import { a as Accordion, c as AccordionTrigger, i as Input, l as Button, n as parseNumber, o as AccordionContent, r as NumberInput, s as AccordionItem, t as formatNumber, u as cn } from "./format-Xxx8g0PZ.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Check, ChevronDown, ChevronUp, Circle, Copy, Settings } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/components/calculator/NumberPicker.tsx
var CUSTOM = "__custom__";
function NumberPicker({ label, unit, options, value, onChange, step = "any", allowCustom = true, formatOption }) {
	const [mode, setMode] = useState(options.includes(value) ? String(value) : CUSTOM);
	useEffect(() => {
		if (!options.includes(value) && mode !== CUSTOM) setMode(CUSTOM);
	}, [
		value,
		options,
		mode
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ jsx("label", {
					className: "text-sm font-medium text-foreground",
					children: label
				}), unit ? /* @__PURE__ */ jsx("span", {
					className: "text-xs text-muted-foreground",
					children: unit
				}) : null]
			}),
			/* @__PURE__ */ jsxs(Select, {
				value: mode,
				onValueChange: (v) => {
					setMode(v);
					if (v !== CUSTOM) onChange(Number(v));
				},
				children: [/* @__PURE__ */ jsx(SelectTrigger, {
					className: "h-12 text-base",
					children: /* @__PURE__ */ jsx(SelectValue, {})
				}), /* @__PURE__ */ jsxs(SelectContent, { children: [options.map((o) => /* @__PURE__ */ jsxs(SelectItem, {
					value: String(o),
					className: "text-base",
					children: [formatOption ? formatOption(o) : formatNumber(o), unit ? ` ${unit}` : ""]
				}, o)), allowCustom && /* @__PURE__ */ jsx(SelectItem, {
					value: CUSTOM,
					className: "text-base",
					children: "Своё значение…"
				})] })]
			}),
			mode === CUSTOM && /* @__PURE__ */ jsx(NumberInput, {
				value,
				onValueChange: onChange,
				placeholder: unit ? `Своё значение, ${unit}` : "Своё значение",
				className: "h-12 text-base"
			})
		]
	});
}
//#endregion
//#region src/components/ui/radio-group.tsx
var RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
//#endregion
//#region src/lib/calculator.ts
function calcVladik(inp, rates) {
	const subtotalKrw = inp.invoiceKrw - inp.invoiceKrw * inp.percent1 / 100 + inp.parkingKrw;
	const paymentKrw = subtotalKrw + inp.freightKrw;
	const paymentUsd = rates.krwPerUsd > 0 ? paymentKrw / rates.krwPerUsd : 0;
	const paymentWithFeeUsd = paymentUsd + paymentUsd * inp.percent2 / 100;
	return {
		subtotalKrw,
		paymentKrw,
		paymentUsd,
		paymentWithFeeUsd,
		totalUsd: paymentWithFeeUsd + inp.paymentFeeUsd
	};
}
function calcCustoms(inp, rates) {
	const baseEur = inp.engineCc * inp.rateEurPerCc;
	const customsEur = inp.kind === "benefit" ? baseEur / 2 : baseEur;
	return {
		baseEur,
		customsEur,
		customsUsd: customsEur * rates.usdPerEur
	};
}
function calcRb(inp, rates) {
	const transitUsd = rates.rubPerUsd > 0 ? inp.transitRub / rates.rubPerUsd : 0;
	const deliveryUsd = rates.rubPerUsd > 0 ? inp.deliveryRub / rates.rubPerUsd : 0;
	return {
		transitUsd,
		deliveryUsd,
		svhUsd: inp.totalWithPaymentUsd + transitUsd + deliveryUsd
	};
}
//#endregion
//#region src/lib/use-persistent-state.ts
var STORAGE_PREFIX = "car-calc-form-v1:";
function usePersistentState(key, initial) {
	const storageKey = STORAGE_PREFIX + key;
	const [value, setValue] = useState(() => {
		if (typeof window === "undefined") return initial;
		try {
			const raw = window.localStorage.getItem(storageKey);
			if (raw !== null) return JSON.parse(raw);
		} catch {}
		return initial;
	});
	useEffect(() => {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.setItem(storageKey, JSON.stringify(value));
		} catch {}
	}, [storageKey, value]);
	return [value, setValue];
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function nowLocalISO() {
	const d = /* @__PURE__ */ new Date();
	const off = d.getTimezoneOffset();
	return (/* @__PURE__ */ new Date(d.getTime() - off * 6e4)).toISOString().slice(0, 16);
}
function CalculatorPage() {
	const { settings, getRate } = useSettings();
	const [dateTime, setDateTime] = usePersistentState("dateTime", nowLocalISO());
	const [carName, setCarName] = usePersistentState("carName", "");
	const [year, setYear] = usePersistentState("year", "");
	const [customs, setCustoms] = usePersistentState("customs", settings.customs[0] ?? "");
	const [invoiceStr, setInvoiceStr] = usePersistentState("invoiceStr", "");
	const invoice = parseNumber(invoiceStr);
	const [percent1, setPercent1] = usePersistentState("percent1", settings.percents1[0] ?? 0);
	const [parking, setParking] = usePersistentState("parking", settings.parkings[0] ?? 0);
	const [freight, setFreight] = usePersistentState("freight", settings.freights[0] ?? 0);
	const [percent2, setPercent2] = usePersistentState("percent2", settings.percents2[0] ?? 0);
	const [paymentFee, setPaymentFee] = usePersistentState("paymentFee", settings.paymentFees[0] ?? 0);
	const krwPerUsd = getRate("KRW_USD");
	const rubPerUsd = getRate("USD_RUB");
	const usdPerEur = getRate("EUR_USD");
	const result = useMemo(() => calcVladik({
		invoiceKrw: invoice,
		percent1,
		parkingKrw: parking,
		freightKrw: freight,
		percent2,
		paymentFeeUsd: paymentFee
	}, { krwPerUsd }), [
		invoice,
		percent1,
		parking,
		freight,
		percent2,
		paymentFee,
		krwPerUsd
	]);
	const [transitRub, setTransitRub] = usePersistentState("transitRub", settings.transitsRub[0] ?? 0);
	const [deliveryRub, setDeliveryRub] = usePersistentState("deliveryRub", settings.deliveriesRub[0] ?? 0);
	const rbResult = useMemo(() => calcRb({
		totalWithPaymentUsd: result.totalUsd,
		transitRub,
		deliveryRub
	}, { rubPerUsd }), [
		result.totalUsd,
		transitRub,
		deliveryRub,
		rubPerUsd
	]);
	const [engineCcStr, setEngineCcStr] = usePersistentState("engineCcStr", "");
	const [rateEurStr, setRateEurStr] = usePersistentState("rateEurStr", "");
	const [customsKind, setCustomsKind] = usePersistentState("customsKind", "benefit");
	const engineCc = parseNumber(engineCcStr);
	const rateEurPerCc = parseNumber(rateEurStr);
	const customsResult = useMemo(() => calcCustoms({
		engineCc,
		rateEurPerCc,
		kind: customsKind
	}, { usdPerEur }), [
		engineCc,
		rateEurPerCc,
		customsKind,
		usdPerEur
	]);
	const bynPerUsd = getRate("USD_BYN");
	const [utilAge, setUtilAge] = usePersistentState("utilAge", "0_3");
	const utilByn = utilAge === "0_3" ? settings.utilFee0_3Byn : settings.utilFee3_5Byn;
	const utilUsd = bynPerUsd > 0 ? utilByn / bynPerUsd : 0;
	const [customsFeeByn, setCustomsFeeByn] = usePersistentState("customsFeeByn", settings.customsFeesByn[0] ?? 0);
	const customsFeeUsd = bynPerUsd > 0 ? customsFeeByn / bynPerUsd : 0;
	const [svhByn, setSvhByn] = usePersistentState("svhByn", settings.svhByn[0] ?? 0);
	const svhUsd = bynPerUsd > 0 ? svhByn / bynPerUsd : 0;
	const [declarantByn, setDeclarantByn] = usePersistentState("declarantByn", settings.declarantByn[0] ?? 0);
	const declarantUsd = bynPerUsd > 0 ? declarantByn / bynPerUsd : 0;
	const customsTotalUsd = customsResult.customsUsd + utilUsd + customsFeeUsd + svhUsd + declarantUsd;
	const finalUsd = rbResult.svhUsd + customsTotalUsd;
	const clientText = useMemo(() => {
		const carLine = [carName, year].filter(Boolean).join(" ") || "—";
		return [
			`📅 Расчёт от: ${dateTime}`,
			`✅${carLine}`,
			`🇧🇾${customs || "—"}`,
			`💶 Во Владивостоке с оплатой: ${formatNumber(result.totalUsd)}$`,
			`🚚 Доставка в Минск: ${formatNumber(rbResult.deliveryUsd)}$ ≈ ${formatNumber(deliveryRub)}₽`,
			`🤝 Оформление транзита до РБ: ${formatNumber(rbResult.transitUsd)}$ ≈ ${formatNumber(transitRub)}₽`,
			`🏎 На СВХ в Минске: ${formatNumber(rbResult.svhUsd)}$`,
			"➖➖➖➖➖➖➖➖➖➖➖➖",
			`👔 Таможня в Минске ${customsKind === "benefit" ? "по льготе" : "без льготы"}: ${formatNumber(customsResult.customsUsd)}$ ≈ ${formatNumber(customsResult.customsEur)}€`,
			`♻️ Утильсбор: ${formatNumber(utilUsd)}$ ≈ ${formatNumber(utilByn)} BYN ${formatNumber(bynPerUsd, 4)}`,
			`🛃 Таможенный сбор: ${formatNumber(customsFeeUsd)}$ ≈ ${formatNumber(customsFeeByn)} BYN`,
			`📄 СВХ: ${formatNumber(svhUsd)}$ ≈ ${formatNumber(svhByn)} BYN`,
			`😎 Декларант: ${formatNumber(declarantUsd)}$ ≈ ${formatNumber(declarantByn)} BYN`,
			"------------------------------",
			`🧮 ${formatNumber(customsTotalUsd)}$ - итого: таможня, оформление, СВХ`,
			"➖➖➖➖➖➖➖➖➖➖➖➖",
			`✅ Итого: в Минске: ${formatNumber(finalUsd)}$`
		].join("\n");
	}, [
		carName,
		year,
		customs,
		result.totalUsd,
		rbResult.deliveryUsd,
		rbResult.transitUsd,
		rbResult.svhUsd,
		deliveryRub,
		transitRub,
		customsResult.customsUsd,
		customsResult.customsEur,
		utilUsd,
		utilByn,
		bynPerUsd,
		customsFeeUsd,
		customsFeeByn,
		svhUsd,
		svhByn,
		declarantUsd,
		declarantByn,
		customsTotalUsd,
		finalUsd
	]);
	async function copyClientText() {
		try {
			await navigator.clipboard.writeText(clientText);
			toast.success("Текст скопирован");
		} catch {
			toast.error("Не удалось скопировать");
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background pb-16",
		children: [/* @__PURE__ */ jsx("header", {
			className: "sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-xl items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-lg font-semibold tracking-tight",
					children: "Калькулятор авто"
				}), /* @__PURE__ */ jsx(Link, {
					to: "/settings",
					"aria-label": "Настройки",
					className: "inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent",
					children: /* @__PURE__ */ jsx(Settings, { className: "h-5 w-5" })
				})]
			})
		}), /* @__PURE__ */ jsxs("main", {
			className: "mx-auto max-w-xl px-4 py-4",
			children: [/* @__PURE__ */ jsxs(Accordion, {
				type: "multiple",
				defaultValue: [
					"intro",
					"vladik",
					"rb",
					"customs"
				],
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsxs(AccordionItem, {
						value: "intro",
						className: "rounded-2xl border border-border bg-card px-4 shadow-sm",
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "py-4 text-base font-semibold hover:no-underline",
							children: "Вводные данные"
						}), /* @__PURE__ */ jsxs(AccordionContent, {
							className: "space-y-4 pb-5",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Дата и время расчёта",
									children: /* @__PURE__ */ jsx(Input, {
										type: "datetime-local",
										value: dateTime,
										onChange: (e) => setDateTime(e.target.value),
										className: "h-12 text-base"
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Наименование автомобиля",
									children: /* @__PURE__ */ jsx(Input, {
										value: carName,
										onChange: (e) => setCarName(e.target.value),
										placeholder: "Напр. Kia Sorento",
										className: "h-12 text-base"
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Год выпуска",
									children: /* @__PURE__ */ jsx(Input, {
										type: "number",
										inputMode: "numeric",
										value: year,
										onChange: (e) => setYear(e.target.value),
										placeholder: "Напр. 2022",
										className: "h-12 text-base"
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Таможня",
									children: /* @__PURE__ */ jsxs(Select, {
										value: customs,
										onValueChange: setCustoms,
										children: [/* @__PURE__ */ jsx(SelectTrigger, {
											className: "h-12 text-base",
											children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Выберите таможню" })
										}), /* @__PURE__ */ jsx(SelectContent, { children: settings.customs.map((c) => /* @__PURE__ */ jsx(SelectItem, {
											value: c,
											className: "text-base",
											children: c
										}, c)) })]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs(AccordionItem, {
						value: "vladik",
						className: "rounded-2xl border border-border bg-card px-4 shadow-sm",
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "py-4 text-base font-semibold hover:no-underline",
							children: "Во Владивостоке с оплатой"
						}), /* @__PURE__ */ jsxs(AccordionContent, {
							className: "space-y-4 pb-5",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Инвойс",
									unit: "KRW",
									children: /* @__PURE__ */ jsx(Input, {
										type: "number",
										inputMode: "decimal",
										value: invoiceStr,
										onChange: (e) => setInvoiceStr(e.target.value),
										placeholder: "0",
										required: true,
										className: "h-12 text-base"
									})
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "За выкуп (вычитается)",
									unit: "%",
									options: settings.percents1,
									value: percent1,
									onChange: setPercent1,
									formatOption: (n) => String(n)
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "Стояночные",
									unit: "KRW",
									options: settings.parkings,
									value: parking,
									onChange: setParking
								}),
								/* @__PURE__ */ jsx(ReadOnlyRow, {
									label: "Промежуточное итого",
									value: `${formatNumber(result.subtotalKrw)} KRW`
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "Фрахт",
									unit: "KRW",
									options: settings.freights,
									value: freight,
									onChange: setFreight
								}),
								/* @__PURE__ */ jsx(ReadOnlyRow, {
									label: "Сумма к оплате",
									value: `${formatNumber(result.paymentKrw)} KRW`
								}),
								/* @__PURE__ */ jsx(ReadOnlyRow, {
									label: `Сумма к оплате (курс ${formatNumber(krwPerUsd)} KRW/USD)`,
									value: `${formatNumber(result.paymentUsd)} USD`
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "Оплата (прибавляется)",
									unit: "%",
									options: settings.percents2,
									value: percent2,
									onChange: setPercent2,
									formatOption: (n) => String(n)
								}),
								/* @__PURE__ */ jsx(ReadOnlyRow, {
									label: "Оплата ($)",
									value: `${formatNumber(result.paymentWithFeeUsd)} USD`
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "Платёжка",
									unit: "USD",
									options: settings.paymentFees,
									value: paymentFee,
									onChange: setPaymentFee
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2 rounded-xl border border-border bg-muted/40 p-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium text-foreground",
											children: "ИТОГО с оплатой"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-xl font-bold tabular-nums text-foreground",
											children: [
												formatNumber(result.totalUsd),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-sm font-medium opacity-70",
													children: "USD"
												})
											]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground",
										children: [
											/* @__PURE__ */ jsxs("div", { children: [
												"Инвойс ",
												formatNumber(invoice),
												" KRW − ",
												formatNumber(percent1),
												"% за выкуп",
												parking ? ` + ${formatNumber(parking)} KRW стояночные` : "",
												" =",
												" ",
												formatNumber(result.subtotalKrw),
												" KRW"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												"+ Фрахт ",
												formatNumber(freight),
												" KRW = ",
												formatNumber(result.paymentKrw),
												" KRW"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												"÷ Курс ",
												formatNumber(krwPerUsd),
												" KRW/USD =",
												" ",
												formatNumber(result.paymentUsd),
												" USD"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												"+ Оплата ",
												formatNumber(percent2),
												"% = ",
												formatNumber(result.paymentWithFeeUsd),
												" ",
												"USD"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												"+ Платёжка ",
												formatNumber(paymentFee),
												" USD =",
												" ",
												/* @__PURE__ */ jsxs("span", {
													className: "font-semibold text-foreground",
													children: [formatNumber(result.totalUsd), " USD"]
												})
											] }),
											/* @__PURE__ */ jsxs("div", {
												className: "pt-1 opacity-80",
												children: [
													carName || "—",
													" · ",
													year || "—",
													" г. · ",
													customs || "—"
												]
											})
										]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs(AccordionItem, {
						value: "rb",
						className: "rounded-2xl border border-border bg-card px-4 shadow-sm",
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "py-4 text-base font-semibold hover:no-underline",
							children: "Доставка и транзит до РБ"
						}), /* @__PURE__ */ jsxs(AccordionContent, {
							className: "space-y-4 pb-5",
							children: [
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "Оформление транзита до РБ",
									unit: "RUB",
									options: settings.transitsRub,
									value: transitRub,
									onChange: setTransitRub
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm text-muted-foreground",
											children: "Оформление транзита до РБ"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-base font-semibold tabular-nums",
											children: [
												formatNumber(transitRub),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-sm opacity-70",
													children: "₽"
												})
											]
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-baseline justify-end",
										children: /* @__PURE__ */ jsxs("span", {
											className: "text-xs text-muted-foreground tabular-nums",
											children: [
												"≈ ",
												formatNumber(rbResult.transitUsd),
												" $"
											]
										})
									})]
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "Доставка в Минск",
									unit: "RUB",
									options: settings.deliveriesRub,
									value: deliveryRub,
									onChange: setDeliveryRub
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm text-muted-foreground",
											children: "Доставка в Минск"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-base font-semibold tabular-nums",
											children: [
												formatNumber(deliveryRub),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-sm opacity-70",
													children: "₽"
												})
											]
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-baseline justify-end",
										children: /* @__PURE__ */ jsxs("span", {
											className: "text-xs text-muted-foreground tabular-nums",
											children: [
												"≈ ",
												formatNumber(rbResult.deliveryUsd),
												" $"
											]
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2 rounded-xl border border-primary/30 bg-primary/5 p-3",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "text-sm font-medium text-foreground",
											children: "На СВХ в Минске"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-baseline justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs text-muted-foreground",
												children: "Итого"
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-2xl font-bold tabular-nums",
												children: [
													formatNumber(rbResult.svhUsd),
													" ",
													/* @__PURE__ */ jsx("span", {
														className: "text-base font-medium opacity-70",
														children: "USD"
													})
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground",
											children: [
												/* @__PURE__ */ jsxs("div", { children: [
													"Во Владивостоке с оплатой: ",
													formatNumber(result.totalUsd),
													" $"
												] }),
												/* @__PURE__ */ jsxs("div", { children: [
													"Доставка в Минск: ",
													formatNumber(rbResult.deliveryUsd),
													" $"
												] }),
												/* @__PURE__ */ jsxs("div", { children: [
													"Оформление транзита до РБ: ",
													formatNumber(rbResult.transitUsd),
													" $"
												] })
											]
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs(AccordionItem, {
						value: "customs",
						className: "rounded-2xl border border-border bg-card px-4 shadow-sm",
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "py-4 text-base font-semibold hover:no-underline",
							children: "Таможня"
						}), /* @__PURE__ */ jsxs(AccordionContent, {
							className: "space-y-4 pb-5",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Объём двигателя",
									unit: "см³",
									children: /* @__PURE__ */ jsx(Input, {
										type: "number",
										inputMode: "decimal",
										value: engineCcStr,
										onChange: (e) => setEngineCcStr(e.target.value),
										placeholder: "Напр. 2200",
										required: true,
										className: "h-12 text-base"
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Ставка пошлины",
									unit: "€/см³",
									children: /* @__PURE__ */ jsx(Input, {
										type: "number",
										inputMode: "decimal",
										step: "any",
										value: rateEurStr,
										onChange: (e) => setRateEurStr(e.target.value),
										placeholder: "Напр. 2.7",
										required: true,
										className: "h-12 text-base"
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-sm font-medium text-foreground",
										children: "Тип таможни"
									}), /* @__PURE__ */ jsxs(RadioGroup, {
										value: customsKind,
										onValueChange: (v) => setCustomsKind(v),
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ jsxs("label", {
											htmlFor: "customs-benefit",
											className: "flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-3 text-base has-[:checked]:border-primary has-[:checked]:bg-primary/5",
											children: [/* @__PURE__ */ jsx(RadioGroupItem, {
												id: "customs-benefit",
												value: "benefit"
											}), /* @__PURE__ */ jsx("span", { children: "Льгота" })]
										}), /* @__PURE__ */ jsxs("label", {
											htmlFor: "customs-no",
											className: "flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-3 text-base has-[:checked]:border-primary has-[:checked]:bg-primary/5",
											children: [/* @__PURE__ */ jsx(RadioGroupItem, {
												id: "customs-no",
												value: "noBenefit"
											}), /* @__PURE__ */ jsx("span", { children: "Без льготы" })]
										})]
									})]
								}),
								/* @__PURE__ */ jsx(ReadOnlyRow, {
									label: "Базовая пошлина",
									value: `${formatNumber(customsResult.baseEur)} €`
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2 rounded-xl border border-border bg-muted/40 p-3",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-baseline justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-sm font-medium text-foreground",
												children: "Таможня в Минске"
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-xl font-bold tabular-nums text-foreground",
												children: [
													formatNumber(customsResult.customsEur),
													" ",
													/* @__PURE__ */ jsx("span", {
														className: "text-sm font-medium opacity-70",
														children: "€"
													})
												]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex items-baseline justify-end",
											children: /* @__PURE__ */ jsxs("span", {
												className: "text-sm text-muted-foreground tabular-nums",
												children: [
													"≈ ",
													formatNumber(customsResult.customsUsd),
													" $"
												]
											})
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground",
											children: [
												/* @__PURE__ */ jsxs("div", { children: [
													formatNumber(engineCc),
													" см³ × ",
													formatNumber(rateEurPerCc, 2),
													" €/см³ =",
													" ",
													formatNumber(customsResult.baseEur),
													" €"
												] }),
												/* @__PURE__ */ jsx("div", { children: customsKind === "benefit" ? `Льгота: ÷ 2 = ${formatNumber(customsResult.customsEur)} €` : `Без льготы: = ${formatNumber(customsResult.customsEur)} €` }),
												/* @__PURE__ */ jsxs("div", { children: [
													"× Курс ",
													formatNumber(usdPerEur, 4),
													" USD/EUR =",
													" ",
													/* @__PURE__ */ jsxs("span", {
														className: "font-semibold text-foreground",
														children: [formatNumber(customsResult.customsUsd), " $"]
													})
												] })
											]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-sm font-medium text-foreground",
											children: "Утильсбор"
										}),
										/* @__PURE__ */ jsxs(RadioGroup, {
											value: utilAge,
											onValueChange: (v) => setUtilAge(v),
											className: "grid grid-cols-2 gap-2",
											children: [/* @__PURE__ */ jsxs("label", {
												htmlFor: "util-0-3",
												className: "flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-background p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2 text-base",
													children: [/* @__PURE__ */ jsx(RadioGroupItem, {
														id: "util-0-3",
														value: "0_3"
													}), /* @__PURE__ */ jsx("span", { children: "0–3 года" })]
												}), /* @__PURE__ */ jsxs("div", {
													className: "pl-6 text-xs tabular-nums text-muted-foreground",
													children: [formatNumber(settings.utilFee0_3Byn), " BYN"]
												})]
											}), /* @__PURE__ */ jsxs("label", {
												htmlFor: "util-3-5",
												className: "flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-background p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2 text-base",
													children: [/* @__PURE__ */ jsx(RadioGroupItem, {
														id: "util-3-5",
														value: "3_5"
													}), /* @__PURE__ */ jsx("span", { children: "3–5 лет" })]
												}), /* @__PURE__ */ jsxs("div", {
													className: "pl-6 text-xs tabular-nums text-muted-foreground",
													children: [formatNumber(settings.utilFee3_5Byn), " BYN"]
												})]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-baseline justify-between",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-sm text-muted-foreground",
													children: "Утильсбор"
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-base font-semibold tabular-nums",
													children: [
														formatNumber(utilByn),
														" ",
														/* @__PURE__ */ jsx("span", {
															className: "text-sm opacity-70",
															children: "BYN"
														})
													]
												})]
											}), /* @__PURE__ */ jsx("div", {
												className: "flex items-baseline justify-end",
												children: /* @__PURE__ */ jsxs("span", {
													className: "text-xs text-muted-foreground tabular-nums",
													children: [
														"≈ ",
														formatNumber(utilUsd),
														" $ · курс ",
														formatNumber(bynPerUsd, 4),
														" BYN/USD"
													]
												})
											})]
										})
									]
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "Таможенный сбор",
									unit: "BYN",
									options: settings.customsFeesByn,
									value: customsFeeByn,
									onChange: setCustomsFeeByn
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm text-muted-foreground",
											children: "Таможенный сбор"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-base font-semibold tabular-nums",
											children: [
												formatNumber(customsFeeByn),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-sm opacity-70",
													children: "BYN"
												})
											]
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-baseline justify-end",
										children: /* @__PURE__ */ jsxs("span", {
											className: "text-xs text-muted-foreground tabular-nums",
											children: [
												"≈ ",
												formatNumber(customsFeeUsd),
												" $"
											]
										})
									})]
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "СВХ",
									unit: "BYN",
									options: settings.svhByn,
									value: svhByn,
									onChange: setSvhByn
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm text-muted-foreground",
											children: "СВХ"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-base font-semibold tabular-nums",
											children: [
												formatNumber(svhByn),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-sm opacity-70",
													children: "BYN"
												})
											]
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-baseline justify-end",
										children: /* @__PURE__ */ jsxs("span", {
											className: "text-xs text-muted-foreground tabular-nums",
											children: [
												"≈ ",
												formatNumber(svhUsd),
												" $"
											]
										})
									})]
								}),
								/* @__PURE__ */ jsx(NumberPicker, {
									label: "Декларант",
									unit: "BYN",
									options: settings.declarantByn,
									value: declarantByn,
									onChange: setDeclarantByn
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm text-muted-foreground",
											children: "Декларант"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-base font-semibold tabular-nums",
											children: [
												formatNumber(declarantByn),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-sm opacity-70",
													children: "BYN"
												})
											]
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-baseline justify-end",
										children: /* @__PURE__ */ jsxs("span", {
											className: "text-xs text-muted-foreground tabular-nums",
											children: [
												"≈ ",
												formatNumber(declarantUsd),
												" $"
											]
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2 rounded-xl border border-border bg-muted/40 p-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium text-foreground",
											children: "Итого: таможня, оформление, СВХ"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-xl font-bold tabular-nums text-foreground",
											children: [
												formatNumber(customsTotalUsd),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-sm font-medium opacity-70",
													children: "USD"
												})
											]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground",
										children: [
											/* @__PURE__ */ jsxs("div", { children: [
												"Таможня в Минске: ",
												formatNumber(customsResult.customsUsd),
												" $"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												"Утильсбор: ",
												formatNumber(utilUsd),
												" $"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												"Таможенный сбор: ",
												formatNumber(customsFeeUsd),
												" $"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												"СВХ: ",
												formatNumber(svhUsd),
												" $"
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												"Декларант: ",
												formatNumber(declarantUsd),
												" $"
											] })
										]
									})]
								})
							]
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("section", {
				className: "mt-4 space-y-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border-2 border-primary bg-primary/10 p-5 shadow-md",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "text-xs font-semibold uppercase tracking-wide text-primary",
							children: "Итого"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-1 text-sm font-medium text-foreground",
							children: ["В Минске ", customsKind === "benefit" ? "по льготной таможне" : "без льготы"]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 text-4xl font-bold tabular-nums text-primary",
							children: [
								formatNumber(finalUsd),
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-xl font-semibold opacity-80",
									children: "USD"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 space-y-1 border-t border-primary/30 pt-3 text-xs leading-relaxed text-muted-foreground",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								"На СВХ в Минске: ",
								formatNumber(rbResult.svhUsd),
								" $"
							] }), /* @__PURE__ */ jsxs("div", { children: [
								"Итого: таможня, оформление, СВХ: ",
								formatNumber(customsTotalUsd),
								" $"
							] })]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-border bg-card p-4 shadow-sm",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-base font-semibold",
							children: "Текст для клиента"
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							onClick: copyClientText,
							className: "gap-1.5",
							children: [/* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }), "Скопировать"]
						})]
					}), /* @__PURE__ */ jsx(Textarea, {
						readOnly: true,
						value: clientText,
						className: "min-h-[420px] resize-y whitespace-pre-wrap font-mono text-sm leading-relaxed"
					})]
				})]
			})]
		})]
	});
}
function Field({ label, unit, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ jsx("label", {
				className: "text-sm font-medium text-foreground",
				children: label
			}), unit ? /* @__PURE__ */ jsx("span", {
				className: "text-xs text-muted-foreground",
				children: unit
			}) : null]
		}), children]
	});
}
function ReadOnlyRow({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-baseline justify-between rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: "text-base font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { CalculatorPage as component };
