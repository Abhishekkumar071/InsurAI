import { useState } from 'react';
import { LayoutDashboard, FileStack, ClipboardList, CalendarClock, ScrollText } from 'lucide-react';
import ManagePolicies from './ManagePolicies';
import ManageApplications from './ManageApplications';
import ManageAppointments from './ManageAppointments';
import AuditLogViewer from './AuditLogViewer';

const TABS = [
  { key: 'policies', label: 'Policies', icon: FileStack, component: ManagePolicies },
  { key: 'applications', label: 'Applications', icon: ClipboardList, component: ManageApplications },
  { key: 'appointments', label: 'Appointments', icon: CalendarClock, component: ManageAppointments },
  { key: 'audit-logs', label: 'Audit Logs', icon: ScrollText, component: AuditLogViewer },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('policies');
  const ActiveComponent = TABS.find((t) => t.key === activeTab)?.component;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100 text-primary-700"><LayoutDashboard size={23} /></span>
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Operations center</p><h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Admin Dashboard</h1></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <nav className="shrink-0 md:sticky md:top-24 md:w-56 md:self-start">
          <ul className="flex gap-1 overflow-x-auto rounded-2xl border border-gray-200/80 bg-white p-2 shadow-sm md:flex-col">
            {TABS.map((tab) => (
              <li key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.key
                      ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20'
                      : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
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
