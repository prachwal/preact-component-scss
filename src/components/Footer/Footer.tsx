import type { ComponentChildren } from 'preact';

export interface FooterProps {
  children?: ComponentChildren;
}

export function Footer({ children }: FooterProps) {
  return <footer>{children}</footer>;
}
