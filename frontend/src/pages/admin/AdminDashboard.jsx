import { useState } from 'react';
import { LayoutDashboard, FileStack, ClipboardList, CalendarClock } from 'lucide-react';
import ManagePolicies from './ManagePolicies';
import ManageApplications from './ManageApplications';
import ManageAppointments from './ManageAppointments';

const TABS = [
  { key: 'policies', label: 'Policies', icon: FileStack, component: ManagePolicies },
  { key: 'applications', label: 'Applications', icon: ClipboardList, component: ManageApplications },
  { key: 'appointments', label: 'Appointments', icon: CalendarClock, component: ManageAppointments },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('policies');
  const ActiveComponent = TABS.find((t) => t.key === activeTab)?.component;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="text-primary-600" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <nav className="md:w-52 shrink-0">
          <ul className="flex md:flex-col gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <li key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.key
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon size={17} /> {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 min-w-0">{ActiveComponent && <ActiveComponent />}</div>
      </div>
    </div>
  );
}
