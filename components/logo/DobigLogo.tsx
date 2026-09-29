import Image from "next/image";
import Link from "next/link";

export default function DobigLogo() {
  return (
    <Link
      href="/"
      aria-label="DOBIG home"
      className="relative flex h-12 w-36 shrink-0 items-center"
    >
      <Image
        src="/dobig-logo.png"
        alt="DOBIG"
        fill
        priority
        sizes="144px"
        className="object-contain object-left"
      />
    </Link>
  );
}
