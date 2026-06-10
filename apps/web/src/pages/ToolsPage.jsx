import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Terminal, Package } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CopyButton from '@/components/CopyButton.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToolDownload } from '@/hooks/useToolDownload.js';

function ToolsPage() {
  const { logDownload } = useToolDownload();

  const tools = [
    {
      name: 'phytronics-cli',
      description: 'Command-line interface for managing IoT sensor networks and data pipelines.',
      installCommand: 'npm install -g phytronics-cli',
    },
    {
      name: 'sensor-config',
      description: 'Configuration generator for ESP32 and Arduino-based sensor nodes.',
      installCommand: 'pip install sensor-config',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Tools - Phytronics</title>
        <meta name="description" content="CLI tools and downloadable resources for agricultural IoT development." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <main className="flex-1">
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-4">
                  Tools & Resources
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Open-source CLI tools and utilities for agricultural IoT development.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-card border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Terminal className="h-5 w-5 text-primary" />
                          {tool.name}
                        </CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div 
                          className="bg-muted rounded-lg p-4 font-mono text-sm flex items-center justify-between"
                          onClickCapture={() => logDownload(tool.name)}
                        >
                          <code className="text-foreground">{tool.installCommand}</code>
                          <CopyButton text={tool.installCommand} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-accent" />
                      Coming Soon
                    </CardTitle>
                    <CardDescription>
                      Additional tools and libraries are currently in development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Data visualization toolkit for sensor networks</li>
                      <li>• PCB design templates for common sensor configurations</li>
                      <li>• Machine learning model deployment scripts</li>
                      <li>• Firmware update utilities for remote devices</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ToolsPage;