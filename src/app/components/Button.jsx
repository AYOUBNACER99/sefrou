import React from 'react';
import './Button.css';

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  fullWidth = false
}) {
  const className = `btn btn-${variant} btn-${size}${fullWidth ? ' btn-full' : ''}`;
  
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}