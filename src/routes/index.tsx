import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings as SettingsIcon, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberPicker } from "@/components/calculator/NumberPicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/lib/settings-store";
import { calcVladik, calcRb, calcCustoms, type CustomsKind } from "@/lib/calculator";
import { formatNumber, parseNumber } from "@/lib/format";
import { usePersistentState } from "@/lib/use-persistent-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Калькулятор стоимости авто" },
      { name: "description", content: "Быстрый мобильный калькулятор расчёта стоимости автомобилей." },
    ],
  }),
  component: CalculatorPage,
});

function nowLocalISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
}

function CalculatorPage() {
  const { settings, getRate } = useSettings();

  // Блок 1
  const [dateTime, setDateTime] = usePersistentState<string>("dateTime", nowLocalISO());
  const [carName, setCarName] = usePersistentState<string>("carName", "");
  const [year, setYear] = usePersistentState<string>("year", "");
  const [customs, setCustoms] = usePersistentState<string>("customs", settings.customs[0] ?? "");

  // Блок 2
  const [invoiceStr, setInvoiceStr] = usePersistentState<string>("invoiceStr", "");
  const invoice = parseNumber(invoiceStr);

  const [percent1, setPercent1] = usePersistentState<number>("percent1", settings.percents1[0] ?? 0);
  const [parking, setParking] = usePersistentState<number>("parking", settings.parkings[0] ?? 0);
  const [freight, setFreight] = usePersistentState<number>("freight", settings.freights[0] ?? 0);
  const [percent2, setPercent2] = usePersistentState<number>("percent2", settings.percents2[0] ?? 0);
  const [paymentFee, setPaymentFee] = usePersistentState<number>("paymentFee", settings.paymentFees[0] ?? 0);

  const krwPerUsd = getRate("KRW_USD");
  const rubPerUsd = getRate("USD_RUB");
  const usdPerEur = getRate("EUR_USD");

  const result = useMemo(
    () =>
      calcVladik(
        {
          invoiceKrw: invoice,
          percent1,
          parkingKrw: parking,
          freightKrw: freight,
          percent2,
          paymentFeeUsd: paymentFee,
        },
        { krwPerUsd },
      ),
    [invoice, percent1, parking, freight, percent2, paymentFee, krwPerUsd],
  );

  // Блок 3: Доставка и транзит до РБ
  const [transitRub, setTransitRub] = usePersistentState<number>("transitRub", settings.transitsRub[0] ?? 0);
  const [deliveryRub, setDeliveryRub] = usePersistentState<number>("deliveryRub", settings.deliveriesRub[0] ?? 0);

  const rbResult = useMemo(
    () =>
      calcRb(
        {
          totalWithPaymentUsd: result.totalUsd,
          transitRub,
          deliveryRub,
        },
        { rubPerUsd },
      ),
    [result.totalUsd, transitRub, deliveryRub, rubPerUsd],
  );

  // Блок 4: Таможня
  const [engineCcStr, setEngineCcStr] = usePersistentState<string>("engineCcStr", "");
  const [rateEurStr, setRateEurStr] = usePersistentState<string>("rateEurStr", "");
  const [customsKind, setCustomsKind] = usePersistentState<CustomsKind>("customsKind", "benefit");
  const engineCc = parseNumber(engineCcStr);
  const rateEurPerCc = parseNumber(rateEurStr);

  const customsResult = useMemo(
    () =>
      calcCustoms(
        { engineCc, rateEurPerCc, kind: customsKind },
        { usdPerEur },
      ),
    [engineCc, rateEurPerCc, customsKind, usdPerEur],
  );

  // Доп. поля блока «Таможня»
  const bynPerUsd = getRate("USD_BYN");
  const [utilAge, setUtilAge] = usePersistentState<"0_3" | "3_5">("utilAge", "0_3");
  const utilByn = utilAge === "0_3" ? settings.utilFee0_3Byn : settings.utilFee3_5Byn;
  const utilUsd = bynPerUsd > 0 ? utilByn / bynPerUsd : 0;

  const [customsFeeByn, setCustomsFeeByn] = usePersistentState<number>("customsFeeByn", settings.customsFeesByn[0] ?? 0);
  const customsFeeUsd = bynPerUsd > 0 ? customsFeeByn / bynPerUsd : 0;

  const [svhByn, setSvhByn] = usePersistentState<number>("svhByn", settings.svhByn[0] ?? 0);
  const svhUsd = bynPerUsd > 0 ? svhByn / bynPerUsd : 0;

  const [declarantByn, setDeclarantByn] = usePersistentState<number>("declarantByn", settings.declarantByn[0] ?? 0);
  const declarantUsd = bynPerUsd > 0 ? declarantByn / bynPerUsd : 0;

  const customsTotalUsd =
    customsResult.customsUsd + utilUsd + customsFeeUsd + svhUsd + declarantUsd;

  // Финальный итог
  const finalUsd = rbResult.svhUsd + customsTotalUsd;

  // Текст для клиента
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
      `👔 Таможня в Минске ${ customsKind === "benefit" ? "по льготе" : "без льготы"}: ${formatNumber(customsResult.customsUsd)}$ ≈ ${formatNumber(customsResult.customsEur)}€`,
      `♻️ Утильсбор: ${formatNumber(utilUsd)}$ ≈ ${formatNumber(utilByn)} BYN ${formatNumber(bynPerUsd, 4)}`,
      `🛃 Таможенный сбор: ${formatNumber(customsFeeUsd)}$ ≈ ${formatNumber(customsFeeByn)} BYN`,
      `📄 СВХ: ${formatNumber(svhUsd)}$ ≈ ${formatNumber(svhByn)} BYN`,
      `😎 Декларант: ${formatNumber(declarantUsd)}$ ≈ ${formatNumber(declarantByn)} BYN`,
      "------------------------------",
      `🧮 ${formatNumber(customsTotalUsd)}$ - итого: таможня, оформление, СВХ`,
      "➖➖➖➖➖➖➖➖➖➖➖➖",
      `✅ Итого: в Минске: ${formatNumber(finalUsd)}$`,
    ].join("\n");
  }, [
    carName, year, customs,
    result.totalUsd,
    rbResult.deliveryUsd, rbResult.transitUsd, rbResult.svhUsd,
    deliveryRub, transitRub,
    customsResult.customsUsd, customsResult.customsEur,
    utilUsd, utilByn, bynPerUsd,
    customsFeeUsd, customsFeeByn,
    svhUsd, svhByn,
    declarantUsd, declarantByn,
    customsTotalUsd, finalUsd,
  ]);

  async function copyClientText() {
    try {
      await navigator.clipboard.writeText(clientText);
      toast.success("Текст скопирован");
    } catch {
      toast.error("Не удалось скопировать");
    }
  }


  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold tracking-tight">Калькулятор авто</h1>
          <Link
            to="/settings"
            aria-label="Настройки"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
          >
            <SettingsIcon className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-4">
        <Accordion type="multiple" defaultValue={["intro", "vladik", "rb", "customs"]} className="space-y-3">
          {/* Блок 1: вводные */}
          <AccordionItem
            value="intro"
            className="rounded-2xl border border-border bg-card px-4 shadow-sm"
          >
            <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
              Вводные данные
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-5">
              <Field label="Дата и время расчёта">
                <Input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="h-12 text-base"
                />
              </Field>

              <Field label="Наименование автомобиля">
                <Input
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  placeholder="Напр. Kia Sorento"
                  className="h-12 text-base"
                />
              </Field>

              <Field label="Год выпуска">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Напр. 2022"
                  className="h-12 text-base"
                />
              </Field>

              <Field label="Таможня">
                <Select value={customs} onValueChange={setCustoms}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Выберите таможню" />
                  </SelectTrigger>
                  <SelectContent>
                    {settings.customs.map((c) => (
                      <SelectItem key={c} value={c} className="text-base">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </AccordionContent>
          </AccordionItem>

          {/* Блок 2: Во Владивостоке с оплатой */}
          <AccordionItem
            value="vladik"
            className="rounded-2xl border border-border bg-card px-4 shadow-sm"
          >
            <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
              Во Владивостоке с оплатой
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-5">
              <Field label="Инвойс" unit="KRW">
                <Input
                  type="number"
                  inputMode="decimal"
                  value={invoiceStr}
                  onChange={(e) => setInvoiceStr(e.target.value)}
                  placeholder="0"
                  required
                  className="h-12 text-base"
                />
              </Field>

              <NumberPicker
                label="За выкуп (вычитается)"
                unit="%"
                options={settings.percents1}
                value={percent1}
                onChange={setPercent1}
                formatOption={(n) => String(n)}
              />

              <NumberPicker
                label="Стояночные"
                unit="KRW"
                options={settings.parkings}
                value={parking}
                onChange={setParking}
              />

              <ReadOnlyRow
                label="Промежуточное итого"
                value={`${formatNumber(result.subtotalKrw)} KRW`}
              />

              <NumberPicker
                label="Фрахт"
                unit="KRW"
                options={settings.freights}
                value={freight}
                onChange={setFreight}
              />

              <ReadOnlyRow
                label="Сумма к оплате"
                value={`${formatNumber(result.paymentKrw)} KRW`}
              />
              <ReadOnlyRow
                label={`Сумма к оплате (курс ${formatNumber(krwPerUsd)} KRW/USD)`}
                value={`${formatNumber(result.paymentUsd)} USD`}
              />

              <NumberPicker
                label="Оплата (прибавляется)"
                unit="%"
                options={settings.percents2}
                value={percent2}
                onChange={setPercent2}
                formatOption={(n) => String(n)}
              />

              <ReadOnlyRow
                label="Оплата ($)"
                value={`${formatNumber(result.paymentWithFeeUsd)} USD`}
              />

              <NumberPicker
                label="Платёжка"
                unit="USD"
                options={settings.paymentFees}
                value={paymentFee}
                onChange={setPaymentFee}
              />

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">ИТОГО с оплатой</span>
                  <span className="text-xl font-bold tabular-nums text-foreground">
                    {formatNumber(result.totalUsd)}{" "}
                    <span className="text-sm font-medium opacity-70">USD</span>
                  </span>
                </div>
                <div className="space-y-1 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground">
                  <div>
                    Инвойс {formatNumber(invoice)} KRW − {formatNumber(percent1)}% за выкуп
                    {parking ? ` + ${formatNumber(parking)} KRW стояночные` : ""} ={" "}
                    {formatNumber(result.subtotalKrw)} KRW
                  </div>
                  <div>
                    + Фрахт {formatNumber(freight)} KRW = {formatNumber(result.paymentKrw)} KRW
                  </div>
                  <div>
                    ÷ Курс {formatNumber(krwPerUsd)} KRW/USD ={" "}
                    {formatNumber(result.paymentUsd)} USD
                  </div>
                  <div>
                    + Оплата {formatNumber(percent2)}% = {formatNumber(result.paymentWithFeeUsd)}{" "}
                    USD
                  </div>
                  <div>
                    + Платёжка {formatNumber(paymentFee)} USD ={" "}
                    <span className="font-semibold text-foreground">{formatNumber(result.totalUsd)} USD</span>
                  </div>
                  <div className="pt-1 opacity-80">
                    {carName || "—"} · {year || "—"} г. · {customs || "—"}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Блок 3: Доставка и транзит до РБ */}
          <AccordionItem
            value="rb"
            className="rounded-2xl border border-border bg-card px-4 shadow-sm"
          >
            <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
              Доставка и транзит до РБ
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-5">
              <NumberPicker
                label="Оформление транзита до РБ"
                unit="RUB"
                options={settings.transitsRub}
                value={transitRub}
                onChange={setTransitRub}
              />
              <div className="rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Оформление транзита до РБ</span>
                  <span className="text-base font-semibold tabular-nums">
                    {formatNumber(transitRub)} <span className="text-sm opacity-70">₽</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-end">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    ≈ {formatNumber(rbResult.transitUsd)} $
                  </span>
                </div>
              </div>

              <NumberPicker
                label="Доставка в Минск"
                unit="RUB"
                options={settings.deliveriesRub}
                value={deliveryRub}
                onChange={setDeliveryRub}
              />
              <div className="rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Доставка в Минск</span>
                  <span className="text-base font-semibold tabular-nums">
                    {formatNumber(deliveryRub)} <span className="text-sm opacity-70">₽</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-end">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    ≈ {formatNumber(rbResult.deliveryUsd)} $
                  </span>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-primary/30 bg-primary/5 p-3">
                <div className="text-sm font-medium text-foreground">На СВХ в Минске</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">Итого</span>
                  <span className="text-2xl font-bold tabular-nums">
                    {formatNumber(rbResult.svhUsd)}{" "}
                    <span className="text-base font-medium opacity-70">USD</span>
                  </span>
                </div>
                <div className="space-y-1 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground">
                  <div>
                    Во Владивостоке с оплатой: {formatNumber(result.totalUsd)} $
                  </div>
                  <div>
                    Доставка в Минск: {formatNumber(rbResult.deliveryUsd)} $
                  </div>
                  <div>
                    Оформление транзита до РБ: {formatNumber(rbResult.transitUsd)} $
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Блок 4: Таможня */}
          <AccordionItem
            value="customs"
            className="rounded-2xl border border-border bg-card px-4 shadow-sm"
          >
            <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
              Таможня
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-5">
              <Field label="Объём двигателя" unit="см³">
                <Input
                  type="number"
                  inputMode="decimal"
                  value={engineCcStr}
                  onChange={(e) => setEngineCcStr(e.target.value)}
                  placeholder="Напр. 2200"
                  required
                  className="h-12 text-base"
                />
              </Field>

              <Field label="Ставка пошлины" unit="€/см³">
                <Input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={rateEurStr}
                  onChange={(e) => setRateEurStr(e.target.value)}
                  placeholder="Напр. 2.7"
                  required
                  className="h-12 text-base"
                />
              </Field>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Тип таможни</label>
                <RadioGroup
                  value={customsKind}
                  onValueChange={(v) => setCustomsKind(v as CustomsKind)}
                  className="grid grid-cols-2 gap-2"
                >
                  <label
                    htmlFor="customs-benefit"
                    className="flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-3 text-base has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem id="customs-benefit" value="benefit" />
                    <span>Льгота</span>
                  </label>
                  <label
                    htmlFor="customs-no"
                    className="flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-3 text-base has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem id="customs-no" value="noBenefit" />
                    <span>Без льготы</span>
                  </label>
                </RadioGroup>
              </div>

              <ReadOnlyRow
                label="Базовая пошлина"
                value={`${formatNumber(customsResult.baseEur)} €`}
              />

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">Таможня в Минске</span>
                  <span className="text-xl font-bold tabular-nums text-foreground">
                    {formatNumber(customsResult.customsEur)}{" "}
                    <span className="text-sm font-medium opacity-70">€</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-end">
                  <span className="text-sm text-muted-foreground tabular-nums">
                    ≈ {formatNumber(customsResult.customsUsd)} $
                  </span>
                </div>
                <div className="space-y-1 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground">
                  <div>
                    {formatNumber(engineCc)} см³ × {formatNumber(rateEurPerCc, 2)} €/см³ ={" "}
                    {formatNumber(customsResult.baseEur)} €
                  </div>
                  <div>
                    {customsKind === "benefit"
                      ? `Льгота: ÷ 2 = ${formatNumber(customsResult.customsEur)} €`
                      : `Без льготы: = ${formatNumber(customsResult.customsEur)} €`}
                  </div>
                  <div>
                    × Курс {formatNumber(usdPerEur, 4)} USD/EUR ={" "}
                    <span className="font-semibold text-foreground">
                      {formatNumber(customsResult.customsUsd)} $
                    </span>
                  </div>
                </div>
              </div>

              {/* Утильсбор */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Утильсбор</label>
                <RadioGroup
                  value={utilAge}
                  onValueChange={(v) => setUtilAge(v as "0_3" | "3_5")}
                  className="grid grid-cols-2 gap-2"
                >
                  <label
                    htmlFor="util-0-3"
                    className="flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-background p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <div className="flex items-center gap-2 text-base">
                      <RadioGroupItem id="util-0-3" value="0_3" />
                      <span>0–3 года</span>
                    </div>
                    <div className="pl-6 text-xs tabular-nums text-muted-foreground">
                      {formatNumber(settings.utilFee0_3Byn)} BYN
                    </div>
                  </label>
                  <label
                    htmlFor="util-3-5"
                    className="flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-background p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <div className="flex items-center gap-2 text-base">
                      <RadioGroupItem id="util-3-5" value="3_5" />
                      <span>3–5 лет</span>
                    </div>
                    <div className="pl-6 text-xs tabular-nums text-muted-foreground">
                      {formatNumber(settings.utilFee3_5Byn)} BYN
                    </div>
                  </label>
                </RadioGroup>
                <div className="rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Утильсбор</span>
                    <span className="text-base font-semibold tabular-nums">
                      {formatNumber(utilByn)} <span className="text-sm opacity-70">BYN</span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-end">
                    <span className="text-xs text-muted-foreground tabular-nums">
                      ≈ {formatNumber(utilUsd)} $ · курс {formatNumber(bynPerUsd, 4)} BYN/USD
                    </span>
                  </div>
                </div>
              </div>

              <NumberPicker
                label="Таможенный сбор"
                unit="BYN"
                options={settings.customsFeesByn}
                value={customsFeeByn}
                onChange={setCustomsFeeByn}
              />
              <div className="rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Таможенный сбор</span>
                  <span className="text-base font-semibold tabular-nums">
                    {formatNumber(customsFeeByn)} <span className="text-sm opacity-70">BYN</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-end">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    ≈ {formatNumber(customsFeeUsd)} $
                  </span>
                </div>
              </div>

              <NumberPicker
                label="СВХ"
                unit="BYN"
                options={settings.svhByn}
                value={svhByn}
                onChange={setSvhByn}
              />
              <div className="rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">СВХ</span>
                  <span className="text-base font-semibold tabular-nums">
                    {formatNumber(svhByn)} <span className="text-sm opacity-70">BYN</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-end">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    ≈ {formatNumber(svhUsd)} $
                  </span>
                </div>
              </div>

              <NumberPicker
                label="Декларант"
                unit="BYN"
                options={settings.declarantByn}
                value={declarantByn}
                onChange={setDeclarantByn}
              />
              <div className="rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Декларант</span>
                  <span className="text-base font-semibold tabular-nums">
                    {formatNumber(declarantByn)} <span className="text-sm opacity-70">BYN</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-end">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    ≈ {formatNumber(declarantUsd)} $
                  </span>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Итого: таможня, оформление, СВХ
                  </span>
                  <span className="text-xl font-bold tabular-nums text-foreground">
                    {formatNumber(customsTotalUsd)}{" "}
                    <span className="text-sm font-medium opacity-70">USD</span>
                  </span>
                </div>
                <div className="space-y-1 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground">
                  <div>Таможня в Минске: {formatNumber(customsResult.customsUsd)} $</div>
                  <div>Утильсбор: {formatNumber(utilUsd)} $</div>
                  <div>Таможенный сбор: {formatNumber(customsFeeUsd)} $</div>
                  <div>СВХ: {formatNumber(svhUsd)} $</div>
                  <div>Декларант: {formatNumber(declarantUsd)} $</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        {/* Финальный итог */}
        <section className="mt-4 space-y-3">
          <div className="rounded-2xl border-2 border-primary bg-primary/10 p-5 shadow-md">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">
              Итого
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">
              В Минске {customsKind === "benefit" ? "по льготной таможне" : "без льготы"}
            </div>
            <div className="mt-3 text-4xl font-bold tabular-nums text-primary">
              {formatNumber(finalUsd)}{" "}
              <span className="text-xl font-semibold opacity-80">USD</span>
            </div>
            <div className="mt-3 space-y-1 border-t border-primary/30 pt-3 text-xs leading-relaxed text-muted-foreground">
              <div>На СВХ в Минске: {formatNumber(rbResult.svhUsd)} $</div>
              <div>
                Итого: таможня, оформление, СВХ: {formatNumber(customsTotalUsd)} $
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-base font-semibold">Текст для клиента</h2>
              <Button
                type="button"
                size="sm"
                onClick={copyClientText}
                className="gap-1.5"
              >
                <Copy className="h-4 w-4" />
                Скопировать
              </Button>
            </div>
            <Textarea
              readOnly
              value={clientText}
              className="min-h-[420px] resize-y whitespace-pre-wrap font-mono text-sm leading-relaxed"
            />
          </div>
        </section>

      </main>
    </div>
  );
}

function Field({
  label,
  unit,
  children,
}: {
  label: string;
  unit?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {unit ? <span className="text-xs text-muted-foreground">{unit}</span> : null}
      </div>
      {children}
    </div>
  );
}

function ReadOnlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-base font-semibold tabular-nums">{value}</span>
    </div>
  );
}
