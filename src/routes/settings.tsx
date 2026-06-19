import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Switch } from "@/components/ui/switch";
import { useSettings, type CurrencyRate } from "@/lib/settings-store";
import { formatNumber, parseNumber } from "@/lib/format";


export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Настройки — Калькулятор авто" },
      { name: "description", content: "Настройка справочников и курсов валют." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, update, updateRate } = useSettings();

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center gap-2 px-2 py-3">
          <Link
            to="/"
            aria-label="Назад"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold tracking-tight">Настройки</h1>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-4">
        <Accordion type="multiple" defaultValue={["customs", "rates"]} className="space-y-3">
          <ListSection
            id="customs"
            title="Таможни"
            items={settings.customs}
            kind="text"
            onChange={(items) => update({ customs: items as string[] })}
            placeholder="Название таможни"
          />

          <ListSection
            id="percents1"
            title="Проценты (блок 1)"
            unit="%"
            items={settings.percents1}
            kind="number"
            onChange={(items) => update({ percents1: items as number[] })}
            placeholder="Значение процента"
          />

          <ListSection
            id="parkings"
            title="Стояночные"
            unit="KRW"
            items={settings.parkings}
            kind="number"
            onChange={(items) => update({ parkings: items as number[] })}
            placeholder="Значение стояночных"
          />

          <ListSection
            id="freights"
            title="Фрахт"
            unit="KRW"
            items={settings.freights}
            kind="number"
            onChange={(items) => update({ freights: items as number[] })}
            placeholder="Значение фрахта"
          />

          <ListSection
            id="percents2"
            title="Проценты (блок 2)"
            unit="%"
            items={settings.percents2}
            kind="number"
            onChange={(items) => update({ percents2: items as number[] })}
            placeholder="Значение процента"
          />

          <ListSection
            id="paymentFees"
            title="Платёжки"
            unit="USD"
            items={settings.paymentFees}
            kind="number"
            onChange={(items) => update({ paymentFees: items as number[] })}
            placeholder="Значение платёжки"
          />

          <ListSection
            id="transitsRub"
            title="Оформление транзита до РБ"
            unit="RUB"
            items={settings.transitsRub}
            kind="number"
            onChange={(items) => update({ transitsRub: items as number[] })}
            placeholder="Значение транзита"
          />

          <ListSection
            id="deliveriesRub"
            title="Доставка в Минск"
            unit="RUB"
            items={settings.deliveriesRub}
            kind="number"
            onChange={(items) => update({ deliveriesRub: items as number[] })}
            placeholder="Значение доставки"
          />

          <ListSection
            id="customsFeesByn"
            title="Таможенный сбор"
            unit="BYN"
            items={settings.customsFeesByn}
            kind="number"
            onChange={(items) => update({ customsFeesByn: items as number[] })}
            placeholder="Значение таможенного сбора"
          />

          <ListSection
            id="svhByn"
            title="СВХ"
            unit="BYN"
            items={settings.svhByn}
            kind="number"
            onChange={(items) => update({ svhByn: items as number[] })}
            placeholder="Значение СВХ"
          />

          <ListSection
            id="declarantByn"
            title="Декларант"
            unit="BYN"
            items={settings.declarantByn}
            kind="number"
            onChange={(items) => update({ declarantByn: items as number[] })}
            placeholder="Значение декларанта"
          />

          <AccordionItem
            value="utilFee"
            className="rounded-2xl border border-border bg-card px-4 shadow-sm"
          >
            <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
              <span className="flex items-center gap-2">
                Утильсбор
                <span className="text-xs font-normal text-muted-foreground">BYN</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pb-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Утильсбор 0–3 года (BYN)</label>
                <NumberInput
                  value={settings.utilFee0_3Byn}
                  onValueChange={(n) => update({ utilFee0_3Byn: n })}
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Утильсбор 3–5 лет (BYN)</label>
                <NumberInput
                  value={settings.utilFee3_5Byn}
                  onValueChange={(n) => update({ utilFee3_5Byn: n })}
                  className="h-11 text-base"
                />
              </div>

            </AccordionContent>
          </AccordionItem>


          <AccordionItem
            value="rates"
            className="rounded-2xl border border-border bg-card px-4 shadow-sm"
          >
            <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
              Курсы валют
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-5">
              {settings.rates.map((r) => (
                <RateCard key={r.id} rate={r} onChange={(patch) => updateRate(r.id, patch)} />
              ))}
              <p className="text-xs text-muted-foreground">
                Новые валютные пары можно будет добавлять — структура подготовлена.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}

function ListSection({
  id,
  title,
  unit,
  items,
  kind,
  onChange,
  placeholder,
}: {
  id: string;
  title: string;
  unit?: string;
  items: (string | number)[];
  kind: "text" | "number";
  onChange: (items: (string | number)[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function sortedInsert(list: (string | number)[], v: string | number) {
    const next = [...list, v];
    if (kind === "number") {
      next.sort((a, b) => Number(a) - Number(b));
    } else {
      next.sort((a, b) => String(a).localeCompare(String(b), "ru"));
    }
    return next;
  }

  function add() {
    const v = kind === "number" ? parseNumber(draft) : draft.trim();
    if (kind === "text" && !v) return;
    onChange(sortedInsert(items, v));
    setDraft("");
  }

  function updateAt(idx: number, raw: string) {
    const v = kind === "number" ? parseNumber(raw) : raw;
    onChange(items.map((it, i) => (i === idx ? v : it)));
  }

  function removeAt(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }

  function moveAt(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  }

  return (
    <AccordionItem
      value={id}
      className="rounded-2xl border border-border bg-card px-4 shadow-sm"
    >
      <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
        <span className="flex items-center gap-2">
          {title}
          {unit ? <span className="text-xs font-normal text-muted-foreground">{unit}</span> : null}
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pb-5">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <div className="flex flex-col">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => moveAt(idx, -1)}
                disabled={idx === 0}
                aria-label="Вверх"
                className="h-5 w-7 text-muted-foreground disabled:opacity-30"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => moveAt(idx, 1)}
                disabled={idx === items.length - 1}
                aria-label="Вниз"
                className="h-5 w-7 text-muted-foreground disabled:opacity-30"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            {kind === "number" ? (
              <NumberInput
                value={Number(it)}
                onValueChange={(n) =>
                  onChange(items.map((x, i) => (i === idx ? n : x)))
                }
                className="h-11 text-base"
              />
            ) : (
              <Input
                type="text"
                value={String(it)}
                onChange={(e) => updateAt(idx, e.target.value)}
                className="h-11 text-base"
              />
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeAt(idx)}
              aria-label="Удалить"
              className="h-11 w-11 shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <Input
            type="text"
            inputMode={kind === "number" ? "decimal" : "text"}
            value={draft}
            onChange={(e) => {
              const v = e.target.value;
              if (kind === "number" && !/^-?\d*[.,]?\d*$/.test(v)) return;
              setDraft(v);
            }}
            placeholder={placeholder}
            className="h-11 text-base"
          />
          <Button
            type="button"
            onClick={add}
            className="h-11 w-11 shrink-0 p-0"
            aria-label="Добавить"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

      </AccordionContent>
    </AccordionItem>
  );
}

function RateCard({
  rate,
  onChange,
}: {
  rate: CurrencyRate;
  onChange: (patch: Partial<CurrencyRate>) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/50 p-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">
          {rate.from}/{rate.to}
        </h3>
        <span className="text-xs text-muted-foreground">
          обновлён {new Date(rate.updatedAt).toLocaleString("ru-RU")}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground">Авто-курс</label>
          <NumberInput
            value={rate.autoRate}
            onValueChange={(n) => onChange({ autoRate: n })}
            className="h-11 text-base"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Ручной курс</label>
          <NumberInput
            value={rate.manualRate}
            onValueChange={(n) => onChange({ manualRate: n })}
            className="h-11 text-base"
          />
        </div>
      </div>


      {(() => {
        const r = rate.useManual ? rate.manualRate : rate.autoRate;
        // По договорённости значение курса хранится как "сколько X за 1 Y".
        // Для KRW/USD это означает: 1 USD = N KRW (1380), поэтому отображение
        // должно быть "1 USD за N KRW", а не "N USD за 1 KRW".
        const baseFirst = rate.id === "KRW_USD"
          ? { base: rate.to, quote: rate.from }
          : { base: rate.from, quote: rate.to };
        return (
          <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
            <div>
              <div className="text-sm font-medium">Использовать ручной курс</div>
              <div className="text-xs text-muted-foreground">
                Действующий: 1 {baseFirst.base} за {formatNumber(r, 4)} {baseFirst.quote}
              </div>
            </div>
            <Switch
              checked={rate.useManual}
              onCheckedChange={(v) => onChange({ useManual: Boolean(v) })}
            />
          </div>
        );
      })()}
    </div>
  );
}
