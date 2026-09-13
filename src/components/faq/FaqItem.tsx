import React from "react";

type FaqItemProps = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

const FaqItem: React.FC<FaqItemProps> = ({ id, question, answer }) => (
  <div className="collapse collapse-arrow bg-base-100 mb-4">
    <input type="checkbox" name={`faq-accordion-${id}`} aria-label={question} />
    <div className="collapse-title text-xl font-medium">{question}</div>
    <div className="collapse-content">{answer}</div>
  </div>
);

export default FaqItem;
