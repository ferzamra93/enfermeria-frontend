interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <article className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <a href="#">
        Más información →
      </a>

    </article>
  );
};

export default FeatureCard;