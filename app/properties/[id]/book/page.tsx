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
  return { title: `Book a Viewing — ${property.title}` };
}

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property || !property.available) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href={`/properties/${property.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to property
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-lg font-bold text-blue-700">PropertyView</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Book a Viewing</h2>
          <p className="text-gray-500 mb-6">
            {property.title} — {property.address} &middot; {formatPrice(property.price)}
          </p>

          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred viewing date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Request Viewing
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
