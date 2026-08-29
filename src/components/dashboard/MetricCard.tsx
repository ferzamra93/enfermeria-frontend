interface MetricCardProps {
  value: number;
  title: string;
}

const MetricCard = ({
  value,
  title,
}: MetricCardProps) => {
  return (
    <article className="metric-card">

      <span>
        {value}
      </span>

      <p>
        {title}
      </p>

    </article>
  );
};

export default MetricCard;