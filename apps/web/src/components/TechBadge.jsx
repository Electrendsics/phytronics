import React from 'react';

function TechBadge({ tech }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 transition-all duration-200 hover:bg-primary/20">
      {tech}
    </span>
  );
}

export default TechBadge;