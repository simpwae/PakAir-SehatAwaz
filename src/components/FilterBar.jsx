import { ChevronDown, Calendar, Filter } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <FilterSelect label="Province" options={["KPK", "Punjab", "Sindh"]} />
        <FilterSelect label="City" options={["Peshawar", "Mardan", "Swat"]} />
        <FilterSelect
          label="Time"
          options={["Current", "Past Week", "Past Month"]}
        />

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm hover:border-primary-300 hover:bg-primary-50 focus:ring-2 focus:ring-primary-500/20 transition-all group">
          <Calendar className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
          <span className="group-hover:text-primary-600">Today</span>
        </button>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm hover:border-primary-300 hover:bg-primary-50 focus:ring-2 focus:ring-primary-500/20 transition-all sm:ml-auto group">
          <Filter className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
          <span className="group-hover:text-primary-600">More Filters</span>
        </button>
      </div>
    </div>
  );
}

function FilterSelect({ label, options }) {
  return (
    <div className="relative flex-1 min-w-[120px]">
      <select
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none bg-transparent hover:border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
