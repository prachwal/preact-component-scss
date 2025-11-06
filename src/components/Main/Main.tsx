import type { ComponentChildren } from 'preact';

export interface MainProps {
  children?: ComponentChildren;
}

export function Main({ children }: MainProps) {
  return <main>{children}</main>;
}
