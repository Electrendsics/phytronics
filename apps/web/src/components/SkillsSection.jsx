import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BookOpen } from 'lucide-react';

export default function SkillsSection() {
  const writeSkills = ['C', 'C++', 'Python', 'JSON', 'MicroPython'];
  const readSkills = ['C', 'C++', 'Python', 'MicroPython', 'CSS', 'HTML', 'JavaScript', 'SQL', 'JSON'];

  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 space-y-6"
          >
            <h2 className="heading-secondary text-foreground">Language Proficiency</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Extensive experience in low-level and high-level programming, bridging the gap between embedded hardware and modern web stacks.
            </p>
            <div className="w-full h-48 rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1690683789978-3cf73960d650?w=600&q=80" 
                alt="Code editing environment" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="card-base p-8 border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Can Write</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {writeSkills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-semibold tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-base p-8 border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-accent/10 rounded-lg text-accent">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Can Read / Understand</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {readSkills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-muted text-muted-foreground border border-border rounded-md text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}