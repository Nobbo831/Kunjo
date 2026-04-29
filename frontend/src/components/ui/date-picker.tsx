"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type DatePickerProps = {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

function formatDisplayDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const displayValue = useMemo(() => formatDisplayDate(value), [value]);

  return (
    <div className={cn("relative w-full", className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-left text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <span className={cn(!displayValue && "text-muted-foreground")}>
          {displayValue || placeholder}
        </span>
        <span className="text-muted-foreground text-xs">{open ? "Hide" : "Date"}</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border border-border bg-background p-3 shadow-lg">
          <input
            autoFocus
            type="date"
            value={value ?? ""}
            onChange={(event) => onValueChange(event.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
          <div className="mt-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onValueChange("");
                setOpen(false);
              }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
