export default function CompanyLogo() {
  return (
    <div className="flex items-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-white lg:text-black"
      >
        <path d="M3 22V7.5L12 2l9 5.5V22h-7v-6h-4v6H3ZM5 20h4v-4h6v4h4V8.68l-7-4.28-7 4.28V20ZM7 10h2v2H7v-2Zm0 4h2v2H7v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Z" />
      </svg>
      <h1 className="text-2xl lg:text-black text-white">TENANT</h1>
    </div>
  );
}
