import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// ---- Типы ----

export interface CurrencyRate {
  id: string; // e.g. "KRW_USD"
  from: string;
  to: string;
  autoRate: number; // "текущий" курс (заглушка под автоподтяжку)
  manualRate: number;
  useManual: boolean;
  updatedAt: string; // ISO
}

export interface Settings {
  customs: string[]; // Таможни
  percents1: number[]; // Проценты (первый блок)
  parkings: number[]; // Стояночные (KRW)
  freights: number[]; // Фрахт (KRW)
  percents2: number[]; // Проценты (второй блок)
  paymentFees: number[]; // Платёжки (USD)
  transitsRub: number[]; // Оформление транзита до РБ (RUB)
  deliveriesRub: number[]; // Доставка в Минск (RUB)
  utilFee0_3Byn: number; // Утильсбор 0–3 года (BYN)
  utilFee3_5Byn: number; // Утильсбор 3–5 лет (BYN)
  customsFeesByn: number[]; // Таможенный сбор (BYN)
  svhByn: number[]; // СВХ (BYN)
  declarantByn: number[]; // Декларант (BYN)
  rates: CurrencyRate[];
}

const DEFAULTS: Settings = {
  customs: ["Таможня через РБ"],
  percents1: [2.5, 3, 3.5, 4],
  parkings: [0, 440000],
  freights: [1000000],
  percents2: [1, 2, 3],
  paymentFees: [0, 100],
  transitsRub: [90000, 100000],
  deliveriesRub: [230000, 240000, 250000],
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
      updatedAt: new Date().toISOString(),
    },
    {
      id: "USD_RUB",
      from: "USD",
      to: "RUB",
      autoRate: 90,
      manualRate: 90,
      useManual: false,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "EUR_USD",
      from: "EUR",
      to: "USD",
      autoRate: 1.16,
      manualRate: 1.16,
      useManual: false,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "USD_BYN",
      from: "USD",
      to: "BYN",
      autoRate: 3.25,
      manualRate: 3.25,
      useManual: false,
      updatedAt: new Date().toISOString(),
    },
  ],
};

const STORAGE_KEY = "car-calc-settings-v1";

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    const merged: Settings = { ...DEFAULTS, ...parsed };
    // Гарантируем наличие всех валютных пар из DEFAULTS
    const existingIds = new Set((merged.rates ?? []).map((r) => r.id));
    const missing = DEFAULTS.rates.filter((r) => !existingIds.has(r.id));
    if (missing.length) merged.rates = [...merged.rates, ...missing];
    return merged;
  } catch {
    return DEFAULTS;
  }
}

function saveSettings(s: Settings) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

// ---- Context ----

interface Ctx {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  updateRate: (id: string, patch: Partial<CurrencyRate>) => void;
  reset: () => void;
  getRate: (id: string) => number;
}

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveSettings(settings);
  }, [settings, hydrated]);

  const value = useMemo<Ctx>(
    () => ({
      settings,
      update: (patch) => setSettings((s) => ({ ...s, ...patch })),
      updateRate: (id, patch) =>
        setSettings((s) => ({
          ...s,
          rates: s.rates.map((r) =>
            r.id === id ? { ...r, ...patch, updatedAt: new Date().toISOString() } : r,
          ),
        })),
      reset: () => setSettings(DEFAULTS),
      getRate: (id) => {
        const r = settings.rates.find((x) => x.id === id);
        if (!r) return 0;
        return r.useManual ? r.manualRate : r.autoRate;
      },
    }),
    [settings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
