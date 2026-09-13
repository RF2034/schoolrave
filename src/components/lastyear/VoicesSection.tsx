const VoicesSection = () => (
  <section>
    <h2 className="text-2xl font-bold mb-6">参加者の声</h2>
    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 参加者の感想を掲載予定 */}
      {voices.map((voice, idx) => (
        <div className="card bg-base-100" key={idx}>
          <div className="card-body">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-24 rounded-full">
                <span className="text-3xl">{voice.avatar}</span>
              </div>
            </div>
            <h3 className="card-title">{voice.name}</h3>
            <h4 className="font-bold">{voice.title}</h4>
            <ReactMarkdown>{voice.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default VoicesSection;
import { voices } from "@/constants/voices";
import ReactMarkdown from "react-markdown";
