// Все формулы вынесены сюда, чтобы их можно было менять без правок UI.

export interface VladikInputs {
  invoiceKrw: number;
  percent1: number; // "За выкуп", % — ВСЕГДА уменьшает сумму
  parkingKrw: number;
  freightKrw: number;
  percent2: number; // "Оплата", % — ВСЕГДА увеличивает сумму (после перевода в USD)
  paymentFeeUsd: number; // Платёжка, USD
}

export interface VladikRates {
  krwPerUsd: number; // сколько KRW в 1 USD
}

export interface VladikResult {
  subtotalKrw: number; // Промежуточное итого, KRW
  paymentKrw: number; // Сумма к оплате, KRW
  paymentUsd: number; // Сумма к оплате, USD
  paymentWithFeeUsd: number; // Оплата ($) — с учётом процента "Оплата"
  totalUsd: number; // ИТОГО с оплатой, USD
}

export function calcVladik(inp: VladikInputs, rates: VladikRates): VladikResult {
  // Промежуточное итого = Инвойс − (Инвойс × За выкуп / 100) + Стояночные
  const subtotalKrw = inp.invoiceKrw - (inp.invoiceKrw * inp.percent1) / 100 + inp.parkingKrw;
  // Сумма к оплате (KRW) = Промежуточное итого + Фрахт
  const paymentKrw = subtotalKrw + inp.freightKrw;
  // Сумма к оплате (USD) = Сумма к оплате (KRW) / Курс KRW/USD
  const paymentUsd = rates.krwPerUsd > 0 ? paymentKrw / rates.krwPerUsd : 0;
  // Оплата ($) = Сумма к оплате (USD) + (Сумма к оплате (USD) × Оплата / 100)
  const paymentWithFeeUsd = paymentUsd + (paymentUsd * inp.percent2) / 100;
  // ИТОГО с оплатой = Оплата ($) + Платёжка
  const totalUsd = paymentWithFeeUsd + inp.paymentFeeUsd;
  return { subtotalKrw, paymentKrw, paymentUsd, paymentWithFeeUsd, totalUsd };
}


// ---- Блок: Доставка и транзит до РБ ----

export interface RbInputs {
  totalWithPaymentUsd: number; // ИТОГО с оплатой (USD) из предыдущего блока
  transitRub: number;
  deliveryRub: number;
}

export interface RbRates {
  rubPerUsd: number; // сколько RUB в 1 USD
}

export interface RbResult {
  transitUsd: number;
  deliveryUsd: number;
  svhUsd: number; // На СВХ в Минске (USD)
}


// ---- Блок: Таможня ----

export type CustomsKind = "benefit" | "noBenefit";

export interface CustomsInputs {
  engineCc: number;
  rateEurPerCc: number;
  kind: CustomsKind;
}

export interface CustomsRates {
  usdPerEur: number; // сколько USD за 1 EUR
}

export interface CustomsResult {
  baseEur: number;
  customsEur: number;
  customsUsd: number;
}

export function calcCustoms(inp: CustomsInputs, rates: CustomsRates): CustomsResult {
  const baseEur = inp.engineCc * inp.rateEurPerCc;
  const customsEur = inp.kind === "benefit" ? baseEur / 2 : baseEur;
  const customsUsd = customsEur * rates.usdPerEur;
  return { baseEur, customsEur, customsUsd };
}

export function calcRb(inp: RbInputs, rates: RbRates): RbResult {
  const transitUsd = rates.rubPerUsd > 0 ? inp.transitRub / rates.rubPerUsd : 0;
  const deliveryUsd = rates.rubPerUsd > 0 ? inp.deliveryRub / rates.rubPerUsd : 0;
  const svhUsd = inp.totalWithPaymentUsd + transitUsd + deliveryUsd;
  return { transitUsd, deliveryUsd, svhUsd };
}

