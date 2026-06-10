import React from 'react';
import { motion } from 'framer-motion';
import { MonitorDot } from 'lucide-react';

export default function OperatingSystemsSection() {
  const osData = [
    {
      name: 'macOS',
      image: 'https://images.unsplash.com/photo-1576071574325-77b9333188b0?w=400&q=80',
      description: 'Primary daily driver for full-stack software development, UI/UX design, and cloud architecture.'
    },
    {
      name: 'Windows',
      image: 'https://images.unsplash.com/photo-1694878982147-e52097b660ec?w=400&q=80',
      description: 'Preferred environment for EDA tools (Altium/KiCad) and specialized industrial hardware drivers.'
    },
    {
      name: 'Linux',
      image: 'https://images.unsplash.com/photo-1687603827201-922149337146?w=400&q=80', // Proxying an abstract tech image for Linux
      description: 'Server management, embedded systems (Raspberry Pi/Yocto), and containerized deployments.'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-card border border-border rounded-full mb-6 shadow-sm">
            <MonitorDot className="w-6 h-6 text-primary" />
          </div>
          <h2 className="heading-secondary mb-4">Cross-Platform Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Works seamlessly across all major operating systems. I adapt my toolchain to the environment that best serves the specific engineering requirements of the project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {osData.map((os, idx) => (
            <motion.div
              key={os.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-base overflow-hidden group flex flex-col"
            >
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={os.image} 
                  alt={`${os.name} environment`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-3">{os.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {os.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}