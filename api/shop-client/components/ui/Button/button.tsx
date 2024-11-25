'use client'
import cn from 'clsx';
import React, { forwardRef, ButtonHTMLAttributes, JSXElementConstructor, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import s from './button.module.css';
import LoadingDots from '@/components/ui/LoadingDots/loading-dots';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'flat' | 'slim' | 'ghost' | 'naked';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    s.root,
    {
      [s.ghost as string]: variant === 'ghost',
      [s.slim as string]: variant === 'slim',
      [s.naked as string]: variant === 'naked',
      [s.loading as string]: loading,
      [s.disabled as string]: disabled
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="m-0 flex pl-2">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

export default Button;
