import Image from 'next/image';

export default function PortfolioHeader() {
  return (
    <header className="flex justify-between items-start gap-8 mb-16">
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
          hi, dev here
        </h1>
        <p className="text-neutral-400 text-lg">21 · full-stack engineer</p>
      </div>
      <div className="flex-shrink-0">
        <Image
          src="/image.jpg"
          alt="Dev Italiya"
          width={80}
          height={80}
          className="rounded-full object-cover w-16 h-16 md:w-20 md:h-20"
        />
      </div>
    </header>
  );
}
