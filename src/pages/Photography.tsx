import { motion } from "motion/react";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    title: "Steel & Glass",
    location: "Tokyo, JP"
  },
  {
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800",
    title: "Transit Flow",
    location: "Berlin, DE"
  },
  {
    url: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800",
    title: "Monolithic Shadow",
    location: "London, UK"
  },
  {
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800",
    title: "Circuit Symmetry",
    location: "San Francisco, US"
  },
  {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    title: "Industrial Echo",
    location: "Paris, FR"
  },
  {
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800",
    title: "Urban Grid",
    location: "New York, US"
  }
];

export default function Photography() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4">Photography</h1>
        <p className="text-on-surface-variant max-w-xl">
          Visual studies of structure, light, and the technological landscape.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-container-low"
          >
            <img
              src={photo.url}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt={photo.title}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
              <h3 className="text-xl font-bold">{photo.title}</h3>
              <p className="text-primary text-sm font-mono tracking-wider">{photo.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
