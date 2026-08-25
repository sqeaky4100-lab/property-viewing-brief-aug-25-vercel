import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperty, properties, formatPrice } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) return { title: "Property Not Found" };
  return { title: `${property.title} — PropertyView` };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to listings
          </Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-lg font-bold text-blue-700">PropertyView</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            {!property.available && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                Under Offer
              </span>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                  {property.type}
                </p>
                <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
                <p className="text-gray-500 mt-1">{property.address}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-700">{formatPrice(property.price)}</p>
                {property.available ? (
                  <span className="inline-block mt-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    Available
                  </span>
                ) : (
                  <span className="inline-block mt-1 text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    Under Offer
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 border-y border-gray-100 py-5 mb-6 text-gray-700">
              <div className="text-center">
                <p className="text-2xl font-bold">{property.bedrooms}</p>
                <p className="text-xs text-gray-500 mt-0.5">Bedrooms</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{property.bathrooms}</p>
                <p className="text-xs text-gray-500 mt-0.5">Bathrooms</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{property.sqft.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-0.5">Sq Ft</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-700">
                    <span className="text-blue-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {property.available && (
              <Link
                href={`/properties/${property.id}/book`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Book a Viewing
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
