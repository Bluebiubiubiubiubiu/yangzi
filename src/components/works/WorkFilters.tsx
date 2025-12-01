'use client';

import { WorkStatus, WorkType } from '@/lib/types';

interface WorkFiltersProps {
  selectedType: WorkType | 'all';
  selectedStatus: WorkStatus | 'all';
  onTypeChange: (type: WorkType | 'all') => void;
  onStatusChange: (status: WorkStatus | 'all') => void;
}

export default function WorkFilters({
  selectedType,
  selectedStatus,
  onTypeChange,
  onStatusChange,
}: WorkFiltersProps) {
  const types: Array<{ value: WorkType | 'all'; label: string }> = [
    { value: 'tv', label: 'TV DRAMA' },
    { value: 'movie', label: 'MOVIE' },
    { value: 'music', label: 'MUSIC' },
    { value: 'short', label: 'SHORT' },
  ];

  const statuses: Array<{ value: WorkStatus | 'all'; label: string; color: string }> = [
    { value: 'all', label: 'ALL STATUS', color: 'bg-gray-500' },
    { value: 'aired', label: 'AIRED', color: 'bg-neon-blue' },
    { value: 'upcoming', label: 'UPCOMING', color: 'bg-neon-purple' },
    { value: 'filming', label: 'FILMING', color: 'bg-neon-pink' },
    { value: 'pre-production', label: 'PRE-PROD', color: 'bg-yellow-400' },
  ];

  return (
    <div className="mb-12 space-y-6">
      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            className={`px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
              selectedType === type.value
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-4 items-center py-4 border-t border-gray-900">
        <span className="text-xs font-mono text-gray-600 uppercase mr-2">Status:</span>
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`text-xs font-mono transition-all duration-300 relative group ${
              selectedStatus === status.value
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="relative z-10">{status.label}</span>
            {selectedStatus === status.value && (
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-neon-purple" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
