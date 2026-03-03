import type { SkillCategory } from '../types'
import './Skills.css'

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      id: 1,
      name: 'Frontend',
      skills: ['React / Next.js', 'Vue.js / Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Three.js']
    },
    {
      id: 2,
      name: 'Backend',
      skills: ['Node.js / Express', 'Python / Django', 'GraphQL', 'REST APIs', 'WebSockets']
    },
    {
      id: 3,
      name: 'Database',
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma ORM']
    },
    {
      id: 4,
      name: 'DevOps',
      skills: ['Docker', 'AWS / Azure', 'CI/CD', 'Nginx']
    }
  ]

  return (
    <section id="skills">
      <h2 className="section-title">Stack technique</h2>
      <div className="skills-grid">
        {skillCategories.map((category: SkillCategory) => (
          <div key={category.id} className="skill-category">
            <h3>{category.name}</h3>
            <ul className="skill-list">
              {category.skills.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
