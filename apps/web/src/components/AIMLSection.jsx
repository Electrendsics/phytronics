import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Network, Bot, Database, Sparkles, Binary } from 'lucide-react';

export default function AIMLSection() {
  const aiCapabilities = [
    {
      title: 'Machine Learning (ML)',
      icon: Brain,
      description: 'Predictive modeling, anomaly detection for IoT sensor data, and traditional regression algorithms.'
    },
    {
      title: 'Deep Learning (DL)',
      icon: Network,
      description: 'Designing multi-layer neural networks for complex pattern recognition in noisy hardware environments.'
    },
    {
      title: 'Large Language Models (LLM)',
      icon: Bot,
      description: 'Fine-tuning, prompt engineering, and utilizing Mixture of Agents (MoA) architectures for intelligent routing.'
    },
    {
      title: 'AI Systems Integration',
      icon: Sparkles,
      description: 'Deploying inference models directly to edge devices (TinyML) or scalable cloud APIs.'
    },
    {
      title: 'Neural Networks',
      icon: Binary,
      description: 'Convolutional and recurrent networks tailored for time-series power measurement analysis.'
    },
    {
      title: 'Data Science',
      icon: Database,
      description: 'ETL pipelines, data cleaning, and feature engineering from raw physical sensor outputs.'
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-card text-card-foreground border-t border-border">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&q=80')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.05] mix-blend-luminosity pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="heading-secondary mb-4 text-foreground">Artificial Intelligence & ML</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Moving beyond basic data collection. Implementing intelligent architectures that analyze, predict, and automate based on complex environmental inputs.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center px-6 py-3 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors active:scale-95 shadow-sm"
            >
              See AI Projects
              <Sparkles className="w-4 h-4 ml-2 text-primary" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiCapabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-background/50 hover:bg-background transition-colors hover:shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:scale-110 transition-transform">
                <cap.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}