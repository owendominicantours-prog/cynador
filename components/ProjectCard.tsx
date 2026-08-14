import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/site-data';

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article className={`project-card${large ? ' project-card-large' : ''}`}>
      <Link className="project-image" href={`/proyectos/${project.slug}`}>
        <Image src={project.image} width={1440} height={900} alt={`Proyecto ${project.name}`} />
        <span>Ver caso <ArrowUpRight size={16} /></span>
      </Link>
      <div className="project-copy">
        <small>{project.category}</small>
        <h3><Link href={`/proyectos/${project.slug}`}>{project.name}</Link></h3>
        <p>{project.summary}</p>
      </div>
    </article>
  );
}
