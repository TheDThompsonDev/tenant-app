import Link from "next/link";

export default function CompanyLogo({ isFooter = false }) {
  const textColor = isFooter ? "text-white" : "text-black";

  return (
    <div className="flex items-end">
      <Link href="/" className="flex items-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-primary-black"
        >
          <path d="M3 22V7.5L12 2l9 5.5V22h-7v-6h-4v6H3ZM5 20h4v-4h6v4h4V8.68l-7-4.28-7 4.28V20ZM7 10h2v2H7v-2Zm0 4h2v2H7v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Z" />
        </svg>
        <h1 className="text-2xl text-primary-black mt-2 font-semibold">TENANT</h1>
      </Link>
    </div>
  );
}
