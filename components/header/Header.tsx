import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Cloud", href: "/#cloud" },
  { label: "Software", href: "/#software" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/95 px-5 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-xl sm:px-7">
        {/* DOBIG Brand Logo */}
        <Link
          href="/"
          aria-label="DOBIG home"
          className="relative flex h-[50px] w-[130px] shrink-0 items-center sm:w-[150px]"
        >
          <Image
            src="/dobig-logo.png"
            alt="DOBIG Logo"
            width={180}
            height={60}
            priority
            unoptimized
            className="block h-full w-full object-contain object-left"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex lg:gap-9"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contact Button */}
        <Link
          href="/#contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 sm:px-5"
        >
          Let&apos;s Talk
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
