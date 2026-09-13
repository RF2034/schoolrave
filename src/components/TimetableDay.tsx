import React from "react";

export type TimetableItem = {
  time?: string;
  description: string;
};

export type TimetableDayProps = {
  title: string;
  items: TimetableItem[];
};

export default function TimetableDay({ title, items }: TimetableDayProps) {
  return (
    <div className="bg-base-200 rounded-lg p-4">
      <div className="text-lg font-bold mb-4">{title}</div>
      <ul className="timeline timeline-vertical timeline-compact">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <li key={`time-${idx}`}>
              <hr />
              {item.time && <div className="timeline-start">{item.time}</div>}
              <hr />
            </li>
            <li key={`desc-${idx}`}>
              <hr />
              <div className="timeline-end timeline-box ml-4 text-sm">
                {item.description}
              </div>
              <hr />
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
