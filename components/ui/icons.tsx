type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function MenuIcon({ className }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none"><path d="M5 9.5c5.7-1.8 15.8-1.8 22 0M8 16c4.7-1.2 11.3-1.2 16 0M5 22.5c5.7 1.8 15.8 1.8 22 0" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /><path d="M4.5 5.5c-3 5.7-3 15.3 0 21M27.5 5.5c3 5.7 3 15.3 0 21" stroke="currentColor" strokeWidth=".65" strokeLinecap="round" opacity=".5" /></svg>;
}

export function CloseIcon({ className }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
