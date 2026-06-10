import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function DonatePage() {
  return (
    <>
      <Helmet>
        <title>Donate - Phytronics</title>
        <meta name="description" content="Support Zairun's work in agricultural technology and open-source development." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <main className="flex-1">
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-4" style={{ letterSpacing: '-0.02em' }}>
                    Support my work
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Your support helps me continue developing open-source tools and advancing agricultural technology.
                  </p>
                </div>

                <Card className="bg-card border-border">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Make a contribution</CardTitle>
                    <CardDescription className="text-base">
                      Every contribution, no matter the size, makes a difference
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted rounded-xl p-6 space-y-4">
                      <p className="text-sm leading-relaxed">
                        Your donations support:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Development of open-source agricultural IoT tools</li>
                        <li>• Research into sustainable farming technologies</li>
                        <li>• Educational content and documentation</li>
                        <li>• Hardware prototyping and testing</li>
                      </ul>
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="w-full transition-all duration-200 active:scale-95"
                    >
                      <a
                        href="https://www.paypal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Donate via PayPal
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Donations are processed securely through PayPal
                    </p>
                  </CardContent>
                </Card>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Thank you for considering supporting my work. Your generosity enables me to dedicate more time to building tools that benefit the agricultural community.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default DonatePage;