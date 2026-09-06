import { ShieldCheck, Clock, HeartHandshake } from 'lucide-react';
import verifiedIllustration from '@/assets/illustrations/best-place-icons.png';
import approvalIllustration from '@/assets/illustrations/banner-24x7.png';
import advisorIllustration from '@/assets/illustrations/talktoexper.gif';

const FEATURES = [
  {
    icon: ShieldCheck,
    image: verifiedIllustration,
    title: 'Verified Policies Only',
    description: 'Every policy on InsurAI is reviewed for clear terms — no hidden clauses, no confusing jargon.',
  },
  {
    icon: Clock,
    image: approvalIllustration,
    title: 'Fast Digital Approval',
    description: 'Apply online, upload documents digitally, and track your application status in real time.',
  },
  {
    icon: HeartHandshake,
    image: advisorIllustration,
    title: 'Talk to a Real Advisor',
    description: 'Book a free consultation before you apply — no pressure, just clarity on what fits your needs.',
  },
];

export default function TrustSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why InsurAI</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center px-4">
              <div className="mx-auto w-20 h-20 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 overflow-hidden">
                <img src={f.image} alt="" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
