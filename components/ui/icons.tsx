type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function MenuIcon({ className }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

export function CloseIcon({ className }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
