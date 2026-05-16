export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-neutral-400 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} SUNFURNS</p>
      </div>
    </footer>
  );
}
