import { Edit2, MoreVertical, Power, Trash2 } from 'lucide-react';
import React from 'react'

function DepartmentCard({
                        dept,
                        openMenuId,
                        onMenuClicked, 
                        onEditClicked, 
                        onDeactivateClicked, 
                        onDeleteClicked ,
                        setSelectedDepartment,
                    }) {

    const getImageForType = (name) => {
    const lowerName = name.toLowerCase();
    let type = "business";

    if (lowerName.includes("finance") || lowerName.includes("accounting")) {
      type = "finance";
    } else if (
      lowerName.includes("engineer") ||
      lowerName.includes("tech") ||
      lowerName.includes("it")
    ) {
      type = "engineering";
    }

    const images = {
      finance: (
        <svg viewBox="0 0 200 120" className="w-full h-24 lg:h-32">
          <defs>
            <linearGradient
              id="financeGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <rect x="20" y="10" width="160" height="100" fill="#fafafa" rx="8" />
          <circle
            cx="70"
            cy="55"
            r="24"
            fill="url(#financeGrad)"
            opacity="0.2"
          />
          <circle
            cx="70"
            cy="55"
            r="24"
            fill="none"
            stroke="url(#financeGrad)"
            strokeWidth="3"
          />
          <text
            x="70"
            y="63"
            textAnchor="middle"
            fontSize="24"
            fill="#6366f1"
            fontWeight="bold"
          >
            $
          </text>
          <rect x="120" y="35" width="4" height="25" fill="#10b981" rx="2" />
          <rect x="128" y="42" width="4" height="18" fill="#3b82f6" rx="2" />
          <rect x="136" y="28" width="4" height="32" fill="#f59e0b" rx="2" />
          <rect x="144" y="38" width="4" height="22" fill="#8b5cf6" rx="2" />
        </svg>
      ),
      engineering: (
        <svg viewBox="0 0 200 120" className="w-full h-24 lg:h-32">
          <defs>
            <linearGradient id="engGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          <rect x="20" y="10" width="160" height="100" fill="#fafafa" rx="8" />
          <rect
            x="50"
            y="30"
            width="60"
            height="70"
            fill="url(#engGrad)"
            rx="4"
            opacity="0.9"
          />
          <rect
            x="55"
            y="36"
            width="50"
            height="8"
            fill="#60a5fa"
            opacity="0.6"
          />
          <rect
            x="55"
            y="48"
            width="50"
            height="8"
            fill="#60a5fa"
            opacity="0.6"
          />
          <rect
            x="55"
            y="60"
            width="50"
            height="8"
            fill="#60a5fa"
            opacity="0.6"
          />
          <text
            x="80"
            y="86"
            textAnchor="middle"
            fontSize="18"
            fill="#e0f2fe"
            fontWeight="bold"
          >
            &lt;/&gt;
          </text>
          <circle cx="135" cy="45" r="15" fill="#10b981" />
          <path
            d="M 128 45 L 133 50 L 142 40"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      ),
      business: (
        <svg viewBox="0 0 200 120" className="w-full h-24 lg:h-32">
          <defs>
            <linearGradient id="bizGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <rect x="20" y="10" width="160" height="100" fill="#fafafa" rx="8" />
          <rect x="45" y="35" width="40" height="60" fill="#dbeafe" rx="3" />
          <rect x="50" y="42" width="8" height="8" fill="#3b82f6" rx="1" />
          <rect x="62" y="42" width="8" height="8" fill="#3b82f6" rx="1" />
          <rect x="74" y="42" width="8" height="8" fill="#3b82f6" rx="1" />
          <circle cx="115" cy="55" r="20" fill="url(#bizGrad)" opacity="0.2" />
          <circle
            cx="115"
            cy="55"
            r="20"
            fill="none"
            stroke="url(#bizGrad)"
            strokeWidth="3"
          />
          <path
            d="M 105 55 L 112 62 L 125 48"
            stroke="#06b6d4"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="150" cy="42" r="14" fill="#fbbf24" opacity="0.9" />
          <path
            d="M 150 35 L 150 42 L 156 46"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      ),
    };
    return images[type];
  };

  return (
     <div
                key={dept.dept_id}
                onClick={ setSelectedDepartment }
                className={`bg-white rounded-2xl border-2 p-4 lg:p-6 transition-all duration-300 hover:shadow-lg lg:hover:shadow-xl hover:-translate-y-0.5 lg:hover:-translate-y-1 relative overflow-hidden cursor-pointer ${
                  dept.is_active
                    ? "border-[#EFF0F6]"
                    : "border-gray-200 opacity-75"
                }`}
              >
                {/* Menu Button */}
                <div className="absolute top-3 right-3 lg:top-4 lg:right-4 z-10">
                  <button
                    onClick={ onMenuClicked }
                    className="text-gray-400 hover:text-gray-600 p-1 lg:p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical size={28} />
                  </button>
                  {openMenuId === dept.dept_id && (
                    <div className="absolute right-0 mt-1 lg:mt-2 w-44 lg:w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                      {/* adjusted deactivate/activate button */}
                      <button
                          onClick={ onDeactivateClicked }
                          className={`flex items-center gap-3 w-full px-3 lg:px-4 py-2 text-sm text-left transition-colors ${
                            dept.is_active
                              ? "text-orange-600 hover:bg-orange-50"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                        >
                          <Power size={16} />
                          {dept.is_active ? "Deactivate" : "Activate"}
                        </button>
                      <button
                        onClick={ onEditClicked }
                        className="flex items-center gap-3 w-full px-3 lg:px-4 py-2 text-sm text-left text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={ onDeleteClicked }
                        className="flex items-center gap-3 w-full px-3 lg:px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex justify-start mb-3">
                  <span
                    className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold ${
                      dept.is_active
                        ? "bg-green-100 text-cyan-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {dept.is_active ? "● Active" : "○ Inactive"}
                  </span>
                </div>

                {/* Department Icon */}
                <div className="flex justify-center mb-3 lg:mb-4 opacity-90">
                  {getImageForType(dept.dept_name)}
                </div>

                {/* Department Name */}
                <h3
                  className={`text-base lg:text-lg text-center ${
                    dept.is_active ? "text-[#2E99B0] " : "text-gray-500"
                  }`}
                >
                  {dept.dept_name}
                </h3>
            </div>
  )
}

export default DepartmentCard
