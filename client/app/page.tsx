import Image from "../public/img/susi home.png";

export default function Home() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Luxury Sushi"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-24">
        <div className="space-y-8">
          <h1 className="text-7xl leading-tight tracking-wide">
            Authentic <br /> Sushi Experience
          </h1>

          <p className="max-w-md text-neutral-300">
            A premium dining journey crafted with precision, tradition, and
            elegance.
          </p>

          <button className="bg-[#d4c4a8] text-black px-8 py-3 uppercase tracking-widest text-sm hover:opacity-80 transition">
            Reserve a Table
          </button>
        </div>
      </div>
    </section>
  );
}
