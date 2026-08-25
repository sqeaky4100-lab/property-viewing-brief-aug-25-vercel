export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: "House" | "Apartment" | "Condo" | "Townhouse";
  description: string;
  features: string[];
  imageUrl: string;
  available: boolean;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Family Home",
    address: "14 Oakwood Drive, Springfield",
    price: 485000,
    bedrooms: 4,
    bathrooms: 2,
    sqft: 1850,
    type: "House",
    description:
      "A stunning modern family home nestled in a quiet suburban street. Recently renovated with an open-plan kitchen and living area, perfect for entertaining. Enjoy the spacious rear garden with a new deck.",
    features: [
      "Open-plan kitchen/living",
      "South-facing garden",
      "Double garage",
      "New kitchen 2023",
      "Underfloor heating",
    ],
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    available: true,
  },
  {
    id: "2",
    title: "City Centre Apartment",
    address: "Flat 5, 22 High Street, Cityville",
    price: 275000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 780,
    type: "Apartment",
    description:
      "Stylish two-bedroom apartment in the heart of the city. Stunning views over the city skyline from the large south-facing balcony. Walking distance to shops, restaurants, and public transport.",
    features: [
      "City skyline views",
      "Private balcony",
      "Concierge service",
      "Secure parking",
      "Gym access included",
    ],
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    available: true,
  },
  {
    id: "3",
    title: "Charming Victorian Terrace",
    address: "7 Elm Street, Northbrook",
    price: 320000,
    bedrooms: 3,
    bathrooms: 1,
    sqft: 1200,
    type: "House",
    description:
      "A beautifully preserved Victorian terraced house retaining many original features including ornate fireplaces and ceiling roses. Updated for modern living with a contemporary kitchen extension.",
    features: [
      "Period features throughout",
      "Kitchen extension",
      "Private rear courtyard",
      "Original fireplaces",
      "Off-street parking",
    ],
    imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80",
    available: true,
  },
  {
    id: "4",
    title: "Luxury Waterfront Condo",
    address: "Unit 12, Marina View, Portside",
    price: 595000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    type: "Condo",
    description:
      "Exceptional waterfront condo offering breathtaking marina views from every room. Premium fixtures and finishes throughout, with a chef's kitchen and spa-style bathrooms.",
    features: [
      "Marina views",
      "Chef's kitchen",
      "Spa bathroom",
      "Roof terrace",
      "24-hour security",
    ],
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    available: false,
  },
  {
    id: "5",
    title: "New-Build Townhouse",
    address: "3 Blossom Lane, Greenfield",
    price: 415000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1350,
    type: "Townhouse",
    description:
      "Brand new townhouse on a popular modern development. Excellent energy efficiency rating, with air-source heat pump and solar panels included. 10-year NHBC warranty.",
    features: [
      "A-rated energy efficiency",
      "Air-source heat pump",
      "Solar panels",
      "10-year NHBC warranty",
      "EV charging point",
    ],
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    available: true,
  },
  {
    id: "6",
    title: "Countryside Cottage",
    address: "Rose Cottage, Mill Lane, Ashford",
    price: 360000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    type: "House",
    description:
      "Idyllic thatched cottage in a picturesque village setting. Beamed ceilings, inglenook fireplace, and a beautiful mature garden. A rare opportunity to own a piece of English countryside heritage.",
    features: [
      "Thatched roof",
      "Inglenook fireplace",
      "Mature cottage garden",
      "Exposed beams",
      "Rural views",
    ],
    imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
    available: true,
  },
];

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}
