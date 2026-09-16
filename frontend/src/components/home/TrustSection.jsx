import { ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import advisorIllustration from '@/assets/illustrations/talktoexper.gif';

const FEATURES = [
  {
    icon: ShieldCheck,
    tone: 'primary',
    title: 'Verified Policies Only',
    description: 'Every policy on InsurAI is reviewed for clear terms — no hidden clauses, no confusing jargon.',
  },
  {
    icon: Zap,
    tone: 'accent',
    title: 'Fast Digital Approval',
    description: 'Apply online, upload documents digitally, and track your application status in real time.',
  },
  {
    icon: HeartHandshake,
    image: advisorIllustration,
    tone: 'success',
    title: 'Talk to a Real Advisor',
    description: 'Book a free consultation before you apply — no pressure, just clarity on what fits your needs.',
  },
];

export default function TrustSection() {
  return (
    <section className="border-y border-gray-200/80 bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-11 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Built around you</p>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Why InsurAI</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">Simple guidance, transparent choices, and support that stays with you from quote to coverage.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
            <div key={f.title} className="group rounded-2xl border border-gray-200 bg-gray-50/70 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:bg-white hover:shadow-lg hover:shadow-primary-900/5">
              <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${f.tone === 'accent' ? 'bg-orange-100 text-accent-600' : f.tone === 'success' ? 'bg-green-100 text-success-600' : 'bg-primary-100 text-primary-700'} transition-transform duration-200 group-hover:scale-105`}>
                {f.image ? <img src={f.image} alt="" className="h-10 w-10 rounded-xl object-cover" /> : <Icon size={27} strokeWidth={2.2} />}
              </div>
              <h3 className="text-base font-bold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">{f.description}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
