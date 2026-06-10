import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code as CodeXml } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TechBadge from '@/components/TechBadge.jsx';

function ProjectCard({ project, index, onView, onCopy }) {
  const hasCodeButton = project.code !== undefined || project.github !== undefined || 
                        project.technologies.some(t => ['React', 'Python', 'Node.js', 'FastAPI', 'Express'].includes(t));
                        
  const hasDemoButton = project.demo !== undefined && project.demo !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <Card className="flex flex-col h-full bg-card border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="md:px-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight">{project.title}</CardTitle>
              {project.year && (
                <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                  {project.year}
                </span>
              )}
            </div>
            
            <div className="flex gap-2 shrink-0 hidden md:flex">
              {hasCodeButton && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onCopy && onCopy(project.title)}
                  className="gap-2 transition-all hover:bg-muted text-foreground"
                >
                  <CodeXml className="h-4 w-4" /> Code Details
                </Button>
              )}
              <Button 
                size="sm" 
                onClick={() => onView && onView(project.title)}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <ExternalLink className="h-4 w-4" /> View Details
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="md:px-8 pb-6 flex-1 space-y-6">
          <CardDescription className="text-base text-foreground/80 leading-relaxed max-w-4xl">
            {project.description}
          </CardDescription>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <TechBadge key={idx} tech={tech} />
            ))}
          </div>
        </CardContent>

        <CardFooter className="md:hidden flex gap-3 px-6 pb-6 border-t border-border pt-4">
          {hasCodeButton && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onCopy && onCopy(project.title)}
              className="w-full gap-2"
            >
              <CodeXml className="h-4 w-4" /> Code
            </Button>
          )}
          <Button 
            size="sm" 
            onClick={() => onView && onView(project.title)}
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <ExternalLink className="h-4 w-4" /> Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ProjectCard;