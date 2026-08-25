import Link from "next/link";
import Image from "next/image";
import { properties, formatPrice } from "@/lib/properties";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">PropertyView</h1>
          <p className="text-sm text-gray-500">{properties.length} properties listed</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="bg-white rounded-2xl shadow hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {!property.available && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Under Offer
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                  {property.type}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{property.address}</p>
                <p className="text-xl font-bold text-blue-700 mb-3">{formatPrice(property.price)}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>🛏 {property.bedrooms} bed</span>
                  <span>🚿 {property.bathrooms} bath</span>
                  <span>📐 {property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
