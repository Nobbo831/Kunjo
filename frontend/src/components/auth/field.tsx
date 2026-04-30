import React from "react";
import { Input } from "@/components/ui/input";

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
    <div className="lsf-field">
      <label htmlFor={id} className="lsf-label">
        {label}
      </label>
      <div className="lsf-input-wrap">
        {icon && <span className="lsf-icon">{icon}</span>}
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
          className={`lsf-input${icon ? " lsf-pl" : ""}${trail ? " lsf-pr" : ""}`}
        />
        {trail && <span className="lsf-trail">{trail}</span>}
      </div>
    </div>
  );
}
