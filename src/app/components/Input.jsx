import React from 'react';
import './Input.css';

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4
}) {
  const id = label ? label.toLowerCase().replace(/\s/g, '-') : undefined;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id} className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          className="input-field input-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
        />
      ) : (
        <input
          id={id}
          type={type}
          className="input-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}