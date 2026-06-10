import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CircuitBoard, Cpu, Cloud, CheckCircle2, ChevronRight, GraduationCap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import VisitorTrackingModal from '@/components/VisitorTrackingModal.jsx';
import SkillsSection from '@/components/SkillsSection.jsx';
import OperatingSystemsSection from '@/components/OperatingSystemsSection.jsx';
import AIMLSection from '@/components/AIMLSection.jsx';

function HomePage() {
  const technicalExpertise = [
    {
      title: "Hardware & Power Systems",
      icon: CircuitBoard,
      description: "Custom PCB layout, power electronics, and embedded systems architecture. Extensive experience in designing mixed-signal circuits for robust industrial use.",
      skills: ["Altium Designer", "KiCad", "Power Electronics", "Signal Integrity"]
    },
    {
      title: "Embedded & IoT Solutions",
      icon: Cpu,
      description: "Developing highly efficient RTOS and bare-metal firmware for microcontrollers. Architecting scalable IoT mesh networks with secure telemetry.",
      skills: ["C/C++", "ESP32 / STM32", "FreeRTOS", "MQTT / LoRaWAN"]
    },
    {
      title: "Full-Stack & Cloud Systems",
      icon: Cloud,
      description: "Building resilient cloud infrastructures to manage hardware fleets. Crafting responsive React dashboards and fast APIs to visualize sensor data in real-time.",
      skills: ["React / Node.js", "Python / FastAPI", "PostgreSQL", "Docker"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Phytronics - Full-Stack Hardware & Software Engineer</title>
        <meta name="description" content="Zairun's professional portfolio showcasing an M.Eng background, hardware development, embedded firmware, and AI integration." />
      </Helmet>

      <VisitorTrackingModal />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* HERO SECTION */}
          <section className="relative min-h-[90dvh] flex items-center pt-16 pb-32 overflow-hidden border-b border-border">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1687006067259-6de13ca3875e?w=1600&q=80" 
                alt="Intricate circuit board macro photography" 
                className="w-full h-full object-cover opacity-[0.15] dark:opacity-[0.1]" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_70%)]" />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-8 text-sm font-semibold tracking-wide backdrop-blur-sm">
                  <GraduationCap className="w-4 h-4" />
                  M.Eng in Electrical & Electronics Engineering
                </div>

                <h1 className="heading-primary mb-6">
                  Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">hardware</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">intelligent software</span>.
                </h1>
                
                <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mb-10">
                  I'm Zairun, a Full-Stack Hardware & Software Engineer. I take concepts from raw schematics and bare-metal firmware all the way to cloud-integrated AI dashboards.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-14 px-8 text-base shadow-lg transition-all duration-300 hover:shadow-primary/25 hover:-translate-y-0.5">
                    <Link to="/projects">
                      View My Projects
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section className="section-padding bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <h2 className="heading-secondary mb-4 text-foreground">Academic Foundation</h2>
                <p className="text-foreground/70 text-lg">Rigorous training in both physical sciences and advanced electronics.</p>
              </motion.div>

              <div className="relative pl-8 md:pl-0">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
                <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-border ml-3" />

                {/* Master's Degree */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative flex flex-col md:flex-row justify-between items-center mb-16 md:even:flex-row-reverse group"
                >
                  <div className="md:w-5/12 w-full pl-8 md:pl-0 md:text-right mb-4 md:mb-0">
                    <div className="md:hidden absolute left-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center -translate-x-[11px] mt-1 border-2 border-background">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="text-primary font-bold text-lg tracking-wide">Graduated with Honors</span>
                  </div>
                  
                  <div className="hidden md:flex absolute left-1/2 w-8 h-8 bg-background border-4 border-primary rounded-full items-center justify-center -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125 shadow-lg shadow-primary/20">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>

                  <div className="md:w-5/12 w-full pl-8 md:pl-0">
                    <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-foreground">M.Eng in Electrical & Electronics Engineering</h3>
                        <p className="text-foreground/70 mb-4">Kasetsart University</p>
                        <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-md font-bold text-sm">
                          GPA: 3.83 / 4.00
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                {/* Bachelor's Degree */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative flex flex-col md:flex-row justify-between items-center md:flex-row-reverse group"
                >
                  <div className="md:w-5/12 w-full pl-8 md:pl-0 mb-4 md:mb-0">
                    <div className="md:hidden absolute left-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center -translate-x-[11px] mt-1 border-2 border-background">
                      <div className="w-2 h-2 bg-foreground/30 rounded-full" />
                    </div>
                    <span className="text-foreground/50 font-semibold text-lg tracking-wide">Foundation</span>
                  </div>
                  
                  <div className="hidden md:flex absolute left-1/2 w-6 h-6 bg-background border-4 border-muted rounded-full items-center justify-center -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:border-foreground/30">
                  </div>

                  <div className="md:w-5/12 w-full pl-8 md:pl-0 md:text-right">
                    <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow text-left md:text-right">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-foreground">B.Sc in Electronics Physics</h3>
                        <p className="text-foreground/70">Thammasat University</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* EXPERTISE SECTION */}
          <section className="section-padding bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mb-16"
              >
                <h2 className="heading-secondary mb-4 text-foreground">End-to-End Capabilities</h2>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  My workflow eliminates the silos between engineering disciplines. I design the board, write the driver, build the API, and train the model.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {technicalExpertise.map((domain, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors duration-300">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                          <domain.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">{domain.title}</h3>
                        <p className="text-foreground/70 mb-8 flex-1 leading-relaxed">{domain.description}</p>
                        <div className="space-y-2">
                          {domain.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="flex items-center text-sm font-medium text-foreground/80">
                              <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                              {skill}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <SkillsSection />
          <OperatingSystemsSection />
          <AIMLSection />

          {/* HIGHLIGHTS / SUMMARY */}
          <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:w-1/2 space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-bold">Ready for the Next Challenge</h2>
                  <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl">
                    Whether it’s designing hardware architectures or building intelligent IoT dashboards, my approach guarantees a cohesive product where hardware and software explicitly optimize each other.
                  </p>
                  <Button variant="secondary" size="lg" asChild className="mt-4">
                    <Link to="/contact">Discuss a Project <ChevronRight className="ml-1 w-4 h-4"/></Link>
                  </Button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:w-1/2 grid grid-cols-2 gap-4"
                >
                  {[
                    { label: "Hardware Designs", val: "10+" },
                    { label: "AI Models Deployed", val: "4" },
                    { label: "Years Experience", val: "5+" },
                    { label: "IoT Nodes Managed", val: "200+" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-background/10 backdrop-blur-md border border-background/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                      <span className="text-4xl font-extrabold mb-2">{stat.val}</span>
                      <span className="text-sm font-medium text-primary-foreground/80 tracking-wide uppercase">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;