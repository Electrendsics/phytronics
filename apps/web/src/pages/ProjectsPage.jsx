import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';
import { useProjectActivity } from '@/hooks/useProjectActivity.js';

function ProjectsPage() {
  const { logActivity } = useProjectActivity();

  const projects = [
    {
      title: 'MoA-Based AI Assistant Chatbot',
      year: '2026',
      description: 'Developed an advanced AI assistant using a Mixture of Agents (MoA) architecture to intelligently route queries and handle complex technical workflows, improving context retention and specific domain accuracy.',
      technologies: ['LLM', 'Mixture of Agents', 'Python', 'API Integration', 'React'],
      code: true
    },
    {
      title: 'Secure Private Cloud Storage System with AI File Management',
      year: '2026',
      description: 'Deployed a robust private cloud infrastructure incorporating AI-based file tagging, automated organization, and deep search capabilities, ensuring high security and intelligent data management across multiple nodes.',
      technologies: ['Cloud Architecture', 'Python', 'AI Integration', 'Encryption', 'PostgreSQL'],
      code: true
    },
    {
      title: 'Custom ESP32 Microcontroller Development Board',
      year: '2025',
      description: 'Completed full hardware lifecycle design from schematics to PCB layout for a custom ESP32 development board tailored for rapid prototyping, robust industrial deployment, and low-power IoT applications.',
      technologies: ['Schematic Design', 'PCB Layout', 'ESP32', 'Hardware Prototyping', 'Altium'],
    },
    {
      title: 'Tuya Smart Home API Integration & Custom Control System',
      year: '2025',
      description: 'Built a customized smart home control system by integrating complex Tuya APIs with a bespoke Node.js backend and React frontend, allowing unified, latency-free control of multiple disparate smart devices.',
      technologies: ['Node.js', 'Tuya API', 'React', 'Smart Home', 'Express'],
      code: true
    },
    {
      title: 'Three-Phase Power Measurement & Data Logging System',
      year: '2024',
      description: 'Engineered a robust three-phase power measurement system featuring custom PCB design, precision ADCs, and RS485 communication for reliable industrial data logging in electrically noisy environments.',
      technologies: ['Three-Phase Systems', 'PCB Design', 'RS485', 'Embedded C', 'Signal Integrity'],
    },
    {
      title: 'IoT-Based Single-Phase Power Measurement for Hydro Turbines',
      year: '2022-2024',
      description: 'Developed an IoT monitoring system using ESP32 to measure single-phase power metrics for hydro turbine applications, enabling remote data logging, performance tracking, and anomaly detection via cloud dashboard.',
      technologies: ['ESP32', 'Current/Voltage Sensors', 'IoT', 'Data Logging', 'MQTT'],
      code: true
    },
    {
      title: 'Raspberry Pi-Controlled Low-Cost Lock-In Amplifier',
      year: '2020-2021',
      description: 'Designed and built a cost-effective lock-in amplifier utilizing a Raspberry Pi for advanced signal processing and precision measurement, capable of extracting known signals from extremely noisy environments.',
      technologies: ['Hardware Design', 'Signal Processing', 'Raspberry Pi', 'Python'],
      code: true
    }
  ];

  const handleProjectView = (projectName) => {
    logActivity(projectName, 'view');
    toast.success('Project details loaded', { description: `Viewing details for ${projectName}` });
  };

  const handleProjectCopy = (projectName) => {
    logActivity(projectName, 'copy');
    toast.success('Code copied to clipboard', { description: `Copied snippets for ${projectName}` });
  };

  return (
    <>
      <Helmet>
        <title>Projects - Phytronics</title>
        <meta name="description" content="Explore Zairun's portfolio of hardware, software, and AI projects." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <main className="flex-1">
          <section className="section-padding">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h1 className="heading-primary mb-6">Project Archive</h1>
                <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl">
                  A chronological showcase of end-to-end engineering projects, spanning from precision hardware instrumentation to cloud-native AI infrastructures.
                </p>
              </motion.div>

              <div className="flex flex-col gap-10">
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={index} 
                    project={project} 
                    index={index} 
                    onView={handleProjectView}
                    onCopy={handleProjectCopy}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ProjectsPage;