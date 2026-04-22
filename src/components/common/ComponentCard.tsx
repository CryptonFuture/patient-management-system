import { useState } from 'react';

import { Link, useLocation } from 'react-router'
import { Funnel } from "lucide-react"; // 👈 icon import
import { Search, X } from "lucide-react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  search?: any;
  setSearch?: any;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  search,
  setSearch
  
}) => {

   const location = useLocation();

   const [showSearch, setShowSearch] = useState(false);
  
  // ✅ Check if current page is Add Patient form
  const isAddPatientPage = location.pathname === '/add-patient' ||
  location.pathname.startsWith('/edit-patient') ||
  location.pathname.startsWith('/view-patient')

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="px-6 py-5 flex items-center justify-between gap-4">

        {/* LEFT SIDE → Title */}
        <div>
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>

          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>

        {/* RIGHT SIDE → Search + Button */}
        <div className="flex items-center gap-1">

          {/* TOGGLE BUTTON */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 border  rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            {showSearch ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* SEARCH (always mounted) */}
          {search !== undefined && setSearch && (
            <div
              className={`relative  overflow-hidden transition-all duration-300 ease-in-out ${showSearch
                  ? "w-64 opacity-100 scale-100"
                  : "w-0 opacity-0 scale-95"
                }`}
            >
              <input
                type="text"
                placeholder="Search by name, phone or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                 className="w-full px-3  py-2 pr-8 border rounded-md outline-none focus:outline-none focus:ring-0"
              />

              {/* CLEAR BUTTON */}
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 text-lg"
                >
                  ×
                </button>
              )}
            </div>
          )}

          {/* BUTTON */}
          {!isAddPatientPage && (
            <Link to="/add-patient">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                + Add Patient
              </button>
            </Link>
          )}

        </div>

      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
