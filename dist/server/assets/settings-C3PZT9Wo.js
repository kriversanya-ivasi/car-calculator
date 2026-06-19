import { n as useSettings } from "./settings-store-Vw4i62tM.js";
import { a as Accordion, c as AccordionTrigger, i as Input, l as Button, n as parseNumber, o as AccordionContent, r as NumberInput, s as AccordionItem, t as formatNumber, u as cn } from "./format-Xxx8g0PZ.js";
import * as React from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronLeft, ChevronUp, Plus, Trash2 } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
//#region src/components/ui/switch.tsx
var Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/routes/settings.tsx?tsr-split=component
function SettingsPage() {
	const { settings, update, updateRate } = useSettings();
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background pb-16",
		children: [/* @__PURE__ */ jsx("header", {
			className: "sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-xl items-center gap-2 px-2 py-3",
				children: [/* @__PURE__ */ jsx(Link, {
					to: "/",
					"aria-label": "Назад",
					className: "inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent",
					children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ jsx("h1", {
					className: "text-lg font-semibold tracking-tight",
					children: "Настройки"
				})]
			})
		}), /* @__PURE__ */ jsx("main", {
			className: "mx-auto max-w-xl px-4 py-4",
			children: /* @__PURE__ */ jsxs(Accordion, {
				type: "multiple",
				defaultValue: ["customs", "rates"],
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsx(ListSection, {
						id: "customs",
						title: "Таможни",
						items: settings.customs,
						kind: "text",
						onChange: (items) => update({ customs: items }),
						placeholder: "Название таможни"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "percents1",
						title: "Проценты (блок 1)",
						unit: "%",
						items: settings.percents1,
						kind: "number",
						onChange: (items) => update({ percents1: items }),
						placeholder: "Значение процента"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "parkings",
						title: "Стояночные",
						unit: "KRW",
						items: settings.parkings,
						kind: "number",
						onChange: (items) => update({ parkings: items }),
						placeholder: "Значение стояночных"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "freights",
						title: "Фрахт",
						unit: "KRW",
						items: settings.freights,
						kind: "number",
						onChange: (items) => update({ freights: items }),
						placeholder: "Значение фрахта"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "percents2",
						title: "Проценты (блок 2)",
						unit: "%",
						items: settings.percents2,
						kind: "number",
						onChange: (items) => update({ percents2: items }),
						placeholder: "Значение процента"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "paymentFees",
						title: "Платёжки",
						unit: "USD",
						items: settings.paymentFees,
						kind: "number",
						onChange: (items) => update({ paymentFees: items }),
						placeholder: "Значение платёжки"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "transitsRub",
						title: "Оформление транзита до РБ",
						unit: "RUB",
						items: settings.transitsRub,
						kind: "number",
						onChange: (items) => update({ transitsRub: items }),
						placeholder: "Значение транзита"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "deliveriesRub",
						title: "Доставка в Минск",
						unit: "RUB",
						items: settings.deliveriesRub,
						kind: "number",
						onChange: (items) => update({ deliveriesRub: items }),
						placeholder: "Значение доставки"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "customsFeesByn",
						title: "Таможенный сбор",
						unit: "BYN",
						items: settings.customsFeesByn,
						kind: "number",
						onChange: (items) => update({ customsFeesByn: items }),
						placeholder: "Значение таможенного сбора"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "svhByn",
						title: "СВХ",
						unit: "BYN",
						items: settings.svhByn,
						kind: "number",
						onChange: (items) => update({ svhByn: items }),
						placeholder: "Значение СВХ"
					}),
					/* @__PURE__ */ jsx(ListSection, {
						id: "declarantByn",
						title: "Декларант",
						unit: "BYN",
						items: settings.declarantByn,
						kind: "number",
						onChange: (items) => update({ declarantByn: items }),
						placeholder: "Значение декларанта"
					}),
					/* @__PURE__ */ jsxs(AccordionItem, {
						value: "utilFee",
						className: "rounded-2xl border border-border bg-card px-4 shadow-sm",
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "py-4 text-base font-semibold hover:no-underline",
							children: /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2",
								children: ["Утильсбор", /* @__PURE__ */ jsx("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: "BYN"
								})]
							})
						}), /* @__PURE__ */ jsxs(AccordionContent, {
							className: "space-y-3 pb-5",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "Утильсбор 0–3 года (BYN)"
								}), /* @__PURE__ */ jsx(NumberInput, {
									value: settings.utilFee0_3Byn,
									onValueChange: (n) => update({ utilFee0_3Byn: n }),
									className: "h-11 text-base"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "Утильсбор 3–5 лет (BYN)"
								}), /* @__PURE__ */ jsx(NumberInput, {
									value: settings.utilFee3_5Byn,
									onValueChange: (n) => update({ utilFee3_5Byn: n }),
									className: "h-11 text-base"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(AccordionItem, {
						value: "rates",
						className: "rounded-2xl border border-border bg-card px-4 shadow-sm",
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "py-4 text-base font-semibold hover:no-underline",
							children: "Курсы валют"
						}), /* @__PURE__ */ jsxs(AccordionContent, {
							className: "space-y-4 pb-5",
							children: [settings.rates.map((r) => /* @__PURE__ */ jsx(RateCard, {
								rate: r,
								onChange: (patch) => updateRate(r.id, patch)
							}, r.id)), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: "Новые валютные пары можно будет добавлять — структура подготовлена."
							})]
						})]
					})
				]
			})
		})]
	});
}
function ListSection({ id, title, unit, items, kind, onChange, placeholder }) {
	const [draft, setDraft] = useState("");
	function sortedInsert(list, v) {
		const next = [...list, v];
		if (kind === "number") next.sort((a, b) => Number(a) - Number(b));
		else next.sort((a, b) => String(a).localeCompare(String(b), "ru"));
		return next;
	}
	function add() {
		const v = kind === "number" ? parseNumber(draft) : draft.trim();
		if (kind === "text" && !v) return;
		onChange(sortedInsert(items, v));
		setDraft("");
	}
	function updateAt(idx, raw) {
		const v = kind === "number" ? parseNumber(raw) : raw;
		onChange(items.map((it, i) => i === idx ? v : it));
	}
	function removeAt(idx) {
		onChange(items.filter((_, i) => i !== idx));
	}
	function moveAt(idx, dir) {
		const j = idx + dir;
		if (j < 0 || j >= items.length) return;
		const next = [...items];
		[next[idx], next[j]] = [next[j], next[idx]];
		onChange(next);
	}
	return /* @__PURE__ */ jsxs(AccordionItem, {
		value: id,
		className: "rounded-2xl border border-border bg-card px-4 shadow-sm",
		children: [/* @__PURE__ */ jsx(AccordionTrigger, {
			className: "py-4 text-base font-semibold hover:no-underline",
			children: /* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-2",
				children: [title, unit ? /* @__PURE__ */ jsx("span", {
					className: "text-xs font-normal text-muted-foreground",
					children: unit
				}) : null]
			})
		}), /* @__PURE__ */ jsxs(AccordionContent, {
			className: "space-y-2 pb-5",
			children: [items.map((it, idx) => /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							onClick: () => moveAt(idx, -1),
							disabled: idx === 0,
							"aria-label": "Вверх",
							className: "h-5 w-7 text-muted-foreground disabled:opacity-30",
							children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							onClick: () => moveAt(idx, 1),
							disabled: idx === items.length - 1,
							"aria-label": "Вниз",
							className: "h-5 w-7 text-muted-foreground disabled:opacity-30",
							children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
						})]
					}),
					kind === "number" ? /* @__PURE__ */ jsx(NumberInput, {
						value: Number(it),
						onValueChange: (n) => onChange(items.map((x, i) => i === idx ? n : x)),
						className: "h-11 text-base"
					}) : /* @__PURE__ */ jsx(Input, {
						type: "text",
						value: String(it),
						onChange: (e) => updateAt(idx, e.target.value),
						className: "h-11 text-base"
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						onClick: () => removeAt(idx),
						"aria-label": "Удалить",
						className: "h-11 w-11 shrink-0 text-muted-foreground hover:text-destructive",
						children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
					})
				]
			}, idx)), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 pt-1",
				children: [/* @__PURE__ */ jsx(Input, {
					type: "text",
					inputMode: kind === "number" ? "decimal" : "text",
					value: draft,
					onChange: (e) => {
						const v = e.target.value;
						if (kind === "number" && !/^-?\d*[.,]?\d*$/.test(v)) return;
						setDraft(v);
					},
					placeholder,
					className: "h-11 text-base"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					onClick: add,
					className: "h-11 w-11 shrink-0 p-0",
					"aria-label": "Добавить",
					children: /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" })
				})]
			})]
		})]
	});
}
function RateCard({ rate, onChange }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border border-border bg-background/50 p-3",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ jsxs("h3", {
					className: "text-sm font-semibold",
					children: [
						rate.from,
						"/",
						rate.to
					]
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-xs text-muted-foreground",
					children: ["обновлён ", new Date(rate.updatedAt).toLocaleString("ru-RU")]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "text-xs text-muted-foreground",
					children: "Авто-курс"
				}), /* @__PURE__ */ jsx(NumberInput, {
					value: rate.autoRate,
					onValueChange: (n) => onChange({ autoRate: n }),
					className: "h-11 text-base"
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "text-xs text-muted-foreground",
					children: "Ручной курс"
				}), /* @__PURE__ */ jsx(NumberInput, {
					value: rate.manualRate,
					onValueChange: (n) => onChange({ manualRate: n }),
					className: "h-11 text-base"
				})] })]
			}),
			(() => {
				const r = rate.useManual ? rate.manualRate : rate.autoRate;
				const baseFirst = rate.id === "KRW_USD" ? {
					base: rate.to,
					quote: rate.from
				} : {
					base: rate.from,
					quote: rate.to
				};
				return /* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-sm font-medium",
						children: "Использовать ручной курс"
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-xs text-muted-foreground",
						children: [
							"Действующий: 1 ",
							baseFirst.base,
							" за ",
							formatNumber(r, 4),
							" ",
							baseFirst.quote
						]
					})] }), /* @__PURE__ */ jsx(Switch, {
						checked: rate.useManual,
						onCheckedChange: (v) => onChange({ useManual: Boolean(v) })
					})]
				});
			})()
		]
	});
}
//#endregion
export { SettingsPage as component };
