// Maps backend enums to display labels, icons (lucide-react names), and colors.
// Keeping this centralized means if the backend adds a new category/status,
// we only touch this one file.

import {
  HeartPulse, Car, Plane, Baby, Landmark, Home as HomeIcon, Users, ShieldCheck,
} from 'lucide-react';
import healthIcon from '@/assets/icons/arogya_aanjeevani.svg';
import motorIcon from '@/assets/icons/Private_Car.svg';
import travelIcon from '@/assets/icons/domestic_travel.svg';
import homeIcon from '@/assets/icons/house-insu.svg';

export const CATEGORY_META = {
  TERM_LIFE:       { label: 'Term Life',        icon: ShieldCheck, color: 'primary' },
  HEALTH:          { label: 'Health',           icon: HeartPulse,  asset: healthIcon,  color: 'success' },
  MOTOR:           { label: 'Motor',            icon: Car,         asset: motorIcon,   color: 'accent' },
  TRAVEL:          { label: 'Travel',           icon: Plane,       asset: travelIcon,  color: 'primary' },
  CHILD_PLAN:      { label: 'Child Plans',      icon: Baby,        color: 'accent' },
  RETIREMENT:      { label: 'Retirement',       icon: Landmark,    color: 'primary' },
  HOME:            { label: 'Home',             icon: HomeIcon,    asset: homeIcon,    color: 'warning' },
  GROUP_INSURANCE: { label: 'Group Insurance',  icon: Users,       color: 'success' },
};

export const APPLICATION_STATUS_META = {
  PENDING:  { label: 'Pending Review', color: 'warning' },
  APPROVED: { label: 'Approved',       color: 'success' },
  REJECTED: { label: 'Rejected',       color: 'danger' },
  ACTIVE:   { label: 'Active',         color: 'primary' },
};

export const PAYMENT_STATUS_META = {
  CREATED: { label: 'Awaiting Payment', color: 'warning' },
  SUCCESS: { label: 'Paid',             color: 'success' },
  FAILED:  { label: 'Failed',           color: 'danger' },
};

export const APPOINTMENT_STATUS_META = {
  REQUESTED: { label: 'Requested', color: 'warning' },
  SCHEDULED: { label: 'Scheduled', color: 'primary' },
  COMPLETED: { label: 'Completed', color: 'success' },
  CANCELLED: { label: 'Cancelled', color: 'danger' },
};

export const INCOME_BRACKET_OPTIONS = [
  { value: 'BELOW_3_LPA', label: 'Below ₹3 LPA' },
  { value: 'LPA_3_TO_6', label: '₹3 - 6 LPA' },
  { value: 'LPA_6_TO_10', label: '₹6 - 10 LPA' },
  { value: 'LPA_10_TO_20', label: '₹10 - 20 LPA' },
  { value: 'ABOVE_20_LPA', label: 'Above ₹20 LPA' },
];

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'AADHAR', label: 'Aadhar Card' },
  { value: 'PAN', label: 'PAN Card' },
  { value: 'INCOME_PROOF', label: 'Income Proof' },
  { value: 'MEDICAL_REPORT', label: 'Medical Report' },
  { value: 'OTHER', label: 'Other' },
];

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};
