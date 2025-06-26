import { motion } from 'framer-motion';
import '../css/About.css';

interface TeamCardProps {
  name: string;
  role: string;
  expertise: string;
  img: string;
}

export default function TeamCard({ name, role, expertise, img }: TeamCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="team-card"
    >
      <div className="team-image">
        <img 
          src={img} 
          alt={name}
          className="team-img"
        />
      </div>
      <div className="team-details">
        <h3 className="team-name">{name}</h3>
        <p className="team-role">{role}</p>
        <p className="team-expertise">{expertise}</p>
      </div>
    </motion.div>
  );
}