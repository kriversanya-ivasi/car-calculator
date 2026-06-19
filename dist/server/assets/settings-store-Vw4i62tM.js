import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/lib/settings-store.tsx
var DEFAULTS = {
	customs: ["Таможня через РБ"],
	percents1: [
		2.5,
		3,
		3.5,
		4
	],
	parkings: [0, 44e4],
	freights: [1e6],
	percents2: [
		1,
		2,
		3
	],
	paymentFees: [0, 100],
	transitsRub: [9e4, 1e5],
	deliveriesRub: [
		23e4,
		24e4,
		25e4
	],
	utilFee0_3Byn: 624.92,
	utilFee3_5Byn: 1282.02,
	customsFeesByn: [120],
	svhByn: [150, 200],
	declarantByn: [290, 300],
	rates: [
		{
			id: "KRW_USD",
			from: "KRW",
			to: "USD",
			autoRate: 1380,
			manualRate: 1380,
			useManual: false,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "USD_RUB",
			from: "USD",
			to: "RUB",
			autoRate: 90,
			manualRate: 90,
			useManual: false,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "EUR_USD",
			from: "EUR",
			to: "USD",
			autoRate: 1.16,
			manualRate: 1.16,
			useManual: false,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "USD_BYN",
			from: "USD",
			to: "BYN",
			autoRate: 3.25,
			manualRate: 3.25,
			useManual: false,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}
	]
};
var STORAGE_KEY = "car-calc-settings-v1";
function loadSettings() {
	if (typeof window === "undefined") return DEFAULTS;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return DEFAULTS;
		const parsed = JSON.parse(raw);
		const merged = {
			...DEFAULTS,
			...parsed
		};
		const existingIds = new Set((merged.rates ?? []).map((r) => r.id));
		const missing = DEFAULTS.rates.filter((r) => !existingIds.has(r.id));
		if (missing.length) merged.rates = [...merged.rates, ...missing];
		return merged;
	} catch {
		return DEFAULTS;
	}
}
function saveSettings(s) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
	} catch {}
}
var SettingsContext = createContext(null);
function SettingsProvider({ children }) {
	const [settings, setSettings] = useState(DEFAULTS);
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setSettings(loadSettings());
		setHydrated(true);
	}, []);
	useEffect(() => {
		if (hydrated) saveSettings(settings);
	}, [settings, hydrated]);
	const value = useMemo(() => ({
		settings,
		update: (patch) => setSettings((s) => ({
			...s,
			...patch
		})),
		updateRate: (id, patch) => setSettings((s) => ({
			...s,
			rates: s.rates.map((r) => r.id === id ? {
				...r,
				...patch,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : r)
		})),
		reset: () => setSettings(DEFAULTS),
		getRate: (id) => {
			const r = settings.rates.find((x) => x.id === id);
			if (!r) return 0;
			return r.useManual ? r.manualRate : r.autoRate;
		}
	}), [settings]);
	return /* @__PURE__ */ jsx(SettingsContext.Provider, {
		value,
		children
	});
}
function useSettings() {
	const ctx = useContext(SettingsContext);
	if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
	return ctx;
}
//#endregion
export { useSettings as n, SettingsProvider as t };
