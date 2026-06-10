import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import PhytronicsLogo from './PhytronicsLogo.jsx';

function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="md:col-span-2">
            <PhytronicsLogo size={36} showText={true} />
            <p className="mt-6 text-sm text-card-foreground/80 leading-relaxed max-w-sm">
              Bridging the gap between the physical and digital. Expertise in circuit design, firmware engineering, and AI integrations for agricultural and industrial applications.
            </p>
          </div>

          <div>
            <span className="text-sm font-bold tracking-wider uppercase text-card-foreground/60 mb-4 block">Quick Links</span>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-sm text-card-foreground/80 hover:text-primary transition-colors duration-200 w-fit">
                Home
              </Link>
              <Link to="/projects" className="text-sm text-card-foreground/80 hover:text-primary transition-colors duration-200 w-fit">
                Projects
              </Link>
              <Link to="/tools" className="text-sm text-card-foreground/80 hover:text-primary transition-colors duration-200 w-fit">
                Tools
              </Link>
              <Link to="/contact" className="text-sm text-card-foreground/80 hover:text-primary transition-colors duration-200 w-fit">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <span className="text-sm font-bold tracking-wider uppercase text-card-foreground/60 mb-4 block">Contact</span>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:Poramat.Sang@gmail.com"
                className="flex items-center text-sm text-card-foreground/80 hover:text-primary transition-colors duration-200 w-fit"
              >
                <Mail className="h-4 w-4 mr-2" />
                Poramat.Sang@gmail.com
              </a>
              <a
                href="tel:+66957179316"
                className="flex items-center text-sm text-card-foreground/80 hover:text-primary transition-colors duration-200 w-fit"
              >
                <Phone className="h-4 w-4 mr-2" />
                095-717-9316
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-card-foreground/60">
            © {new Date().getFullYear()} Phytronics. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-card-foreground/60">
            <span>Designed by Zairun</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;