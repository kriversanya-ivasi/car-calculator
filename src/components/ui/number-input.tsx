import { forwardRef, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface NumberInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
  value: number;
  onValueChange: (n: number) => void;
  /** Что отдавать наружу, когда поле пустое. По умолчанию 0. */
  emptyValue?: number;
}

/**
 * Числовой input с дружелюбным вводом:
 * - можно полностью очистить (не подставляется "0");
 * - поддерживает "." и "," как десятичные разделители;
 * - разрешает промежуточные состояния ("2.", "2,", "");
 * - синхронизируется с внешним значением, не затирая ввод.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onValueChange, emptyValue = 0, className, inputMode, onBlur, ...rest }, ref) => {
    const [text, setText] = useState<string>(() =>
      value === emptyValue ? "" : String(value),
    );
    const lastEmittedRef = useRef<number>(value);

    // Внешнее значение поменялось не нами — синхронизируем текст.
    useEffect(() => {
      if (value !== lastEmittedRef.current) {
        setText(value === emptyValue ? "" : String(value));
        lastEmittedRef.current = value;
      }
    }, [value, emptyValue]);


    return (
      <Input
        ref={ref}
        type="text"
        inputMode={inputMode ?? "decimal"}
        autoComplete="off"
        value={text}
        onChange={(e) => {
          const raw = e.target.value;
          // Разрешаем только цифры, один разделитель и опциональный минус
          if (!/^-?\d*[.,]?\d*$/.test(raw)) return;
          setText(raw);

          if (raw === "" || raw === "-" || raw === "." || raw === ",") {
            lastEmittedRef.current = emptyValue;
            onValueChange(emptyValue);
            return;
          }
          const normalized = raw.replace(",", ".");
          // Не эмитим на промежуточном "2." — ждём следующего символа
          if (normalized.endsWith(".")) return;
          const n = Number(normalized);
          if (!isNaN(n)) {
            lastEmittedRef.current = n;
            onValueChange(n);
          }
        }}
        onBlur={(e) => {
          // На блюре нормализуем "2," → "2"
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
        }}
        className={cn(className)}
        {...rest}
      />
    );
  },
);
NumberInput.displayName = "NumberInput";
