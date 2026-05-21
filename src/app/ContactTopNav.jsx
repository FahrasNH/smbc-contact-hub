export function ContactTopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-ds-border-subtle bg-ds-surface shadow-ds-card">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <span className="text-xl font-bold tracking-tight text-ds-primary">Contact Hub</span>
        <div
          className="h-10 w-10 rounded-full border border-ds-border-subtle bg-linear-to-br from-blue-100 to-indigo-100 shadow-ds-card"
          aria-hidden
        />
      </div>
    </header>
  );
}
