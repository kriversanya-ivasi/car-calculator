import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NumberInput } from "@/components/ui/number-input";
import { formatNumber } from "@/lib/format";


interface Props {
  label: string;
  unit?: string;
  options: number[];
  value: number;
  onChange: (n: number) => void;
  step?: string;
  allowCustom?: boolean;
  formatOption?: (n: number) => string;
}

const CUSTOM = "__custom__";

export function NumberPicker({
  label,
  unit,
  options,
  value,
  onChange,
  step = "any",
  allowCustom = true,
  formatOption,
}: Props) {
  const isPreset = options.includes(value);
  const [mode, setMode] = useState<string>(isPreset ? String(value) : CUSTOM);

  // Если внешнее значение перестало быть предустановкой — переключаемся в CUSTOM.
  // НЕ переключаем CUSTOM обратно в preset, даже если пользователь ввёл значение,
  // совпадающее с одной из опций — это ломало бы свободный ввод.
  useEffect(() => {
    if (!options.includes(value) && mode !== CUSTOM) {
      setMode(CUSTOM);
    }
  }, [value, options, mode]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {unit ? <span className="text-xs text-muted-foreground">{unit}</span> : null}
      </div>
      <Select
        value={mode}
        onValueChange={(v) => {
          setMode(v);
          if (v !== CUSTOM) {
            onChange(Number(v));
          }
        }}
      >
        <SelectTrigger className="h-12 text-base">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={String(o)} className="text-base">
              {formatOption ? formatOption(o) : formatNumber(o)}
              {unit ? ` ${unit}` : ""}
            </SelectItem>
          ))}
          {allowCustom && (
            <SelectItem value={CUSTOM} className="text-base">
              Своё значение…
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {mode === CUSTOM && (
        <NumberInput
          value={value}
          onValueChange={onChange}
          placeholder={unit ? `Своё значение, ${unit}` : "Своё значение"}
          className="h-12 text-base"
        />
      )}
    </div>
  );
}

