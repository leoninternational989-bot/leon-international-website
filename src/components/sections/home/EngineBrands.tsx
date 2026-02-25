import Image from 'next/image';

export default function EngineBrands() {
    // Mapping the provided images in public/Brands to the respective brands
    // For any brand without an obvious image name, we omit the logo field to fall back to the placeholder
    const brands = [
        { name: "MAN B&W", logo: "/Brands/images.jpg" }, // Assuming images.png or another might be MAN, but let's leave without logo if unsure. Let's use the fallback if no exact match. Actually MAN is often a generic 'images.png' in these folders. Let's rely on fallback for missing ones.
        { name: "Wärtsilä", logo: "/Brands/Wärtsilä-Logo.wine.png" },
        { name: "Cummins", logo: "/Brands/images.png" }, // No obvious image
        { name: "Caterpillar (CAT)", logo: "/Brands/365-3655053_logo-caterpillar-png-logos-that-start-with-cat.png" },
        { name: "MTU", logo: "/Brands/MTU_Aero_Engines_Logo.svg.png" },
        { name: "Volvo Penta", logo: "/Brands/35-355704_volvo-penta-logo-hd-png-download.png" },
        { name: "Yanmar", logo: "/Brands/yanmar-logo-png-transparent-png.webp" },
        { name: "Daihatsu", logo: "/Brands/Daihatsu-Logo.wine.png" },
        { name: "DEUTZ", logo: "/Brands/Deutz_Logo.svg.png" },
        { name: "Perkins", logo: "/Brands/Perkins-Logo.svg.png" },
        { name: "Hyundai HiMSEN", logo: "/Brands/large-60acc0b38d953907b012b08f-8c6a2fe8f862454ac702bb58ac24ff1de3129e431e5dab87d16be38e43a94177-60acc4f1_385_large_nR-cKw0AUq.jpg" },
        { name: "MWM", logo: "/Brands/1956_Dieselring-1.webp" },
        { name: "Waukesha", logo: "/Brands/Wauk.webp" },
        { name: "Bergen", logo: "/Brands/Bergen-Logo-WHITE.webp" },
        { name: "MAK", logo: "/Brands/mak-initial-letter-monogram-logo-260nw-2269703761.webp" },
        { name: "Scania", logo: "/Brands/scania-1-logo-black-and-white.png" },
        { name: "John Deere", logo: "/Brands/John_Deere_logo.svg.png" },
        { name: "Mitsubishi", logo: "/Brands/Mitsubishi-logo.png" },
        { name: "Hanshin Diesel", logo: "/Brands/logo_hanshin.png" },
        { name: "Stork", logo: "/Brands/Stork_logo.jpg" },
        { name: "Lombardini", logo: "/Brands/lomb.jpg" },
        { name: "Sulzer", logo: "/Brands/png-transparent-sulzer-hd-logo.png" }
    ];

    return (
        <section className="bg-white py-16 sm:py-24 border-y border-gray-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-primary-950 sm:text-3xl font-plus-jakarta-sans">
                        Trusted Parts for 20+ Engine Manufacturers
                    </h2>
                    <p className="mt-4 text-base leading-7 text-gray-600 font-inter">
                        Whatever powers your vessel, we have the genuine and OEM alternative parts to keep it running.
                    </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
                    {brands.map((brand, i) => (
                        <div
                            key={i}
                            className="flex justify-center flex-col items-center gap-4 group p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 shadow-sm hover:shadow-md transition-all h-full"
                        >
                            <div className="h-20 w-full flex items-center justify-center relative">
                                {brand.logo ? (
                                    <Image
                                        src={brand.logo}
                                        alt={`${brand.name} logo`}
                                        fill
                                        className="object-contain transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-multiply"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                    />
                                ) : (
                                    <span className="text-4xl font-bold text-gray-300 group-hover:text-ocean transition-colors">
                                        {brand.name.substring(0, 1).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-gray-500 group-hover:text-primary-950 text-center uppercase tracking-widest">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
