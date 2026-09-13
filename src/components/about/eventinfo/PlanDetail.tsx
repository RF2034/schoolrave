import ReactMarkdown from "react-markdown";

type Plan = {
  id: string;
  title: string;
  organizers: string;
  genres: string[];
  description: string;
};

interface PlanDetailProps {
  plan: Plan;
}

export default function PlanDetail({ plan }: PlanDetailProps) {
  return (
    <div className="card bg-base-100 shadow-lg max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-2">{plan.title}</h2>
        <div className="mb-2 text-base-content/70">主催：{plan.organizers}</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {plan.genres.map((genre) => (
            <span
              key={genre}
              className="badge badge-outline badge-primary text-xs px-2 py-1"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="prose max-w-none text-base-content">
          <ReactMarkdown>{plan.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
