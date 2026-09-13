import { EVENT_INFO } from "@/constants/eventInfo";

interface VenueLinkProps {
  className?: string;
}

export default function VenueLink({ className = "" }: VenueLinkProps) {
  return (
    <a
      href={EVENT_INFO.venue.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline text-primary hover:text-primary/80 hover:no-underline transition-all duration-200 cursor-pointer ${className}`}
    >
      {EVENT_INFO.venue.name}
      <br />（{EVENT_INFO.venue.address}）
    </a>
  );
}
