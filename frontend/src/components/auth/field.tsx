import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  id: string;
  icon?: React.ReactNode;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  trail?: React.ReactNode;
}

export function Field({
  label,
  id,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  minLength,
  inputMode,
  maxLength,
  trail,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && <span className="pointer-events-none absolute left-3 z-10 flex items-center text-slate-400">{icon}</span>}
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          inputMode={inputMode}
          maxLength={maxLength}
          className={cn(
            "h-11 rounded-xl border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
            icon && "pl-10",
            trail && "pr-10"
          )}
        />
        {trail && <span className="absolute right-3 z-10 flex items-center">{trail}</span>}
      </div>
    </div>
  );
}
