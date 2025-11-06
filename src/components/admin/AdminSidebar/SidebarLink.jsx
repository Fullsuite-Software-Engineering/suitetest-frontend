import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

//dito nag add ng hasSubmenu para malaman kung may submenu yung link.
const SidebarLink = ({ to, label, icon, isOpen, toggleOpen }) => {
  const hasSubmenu = typeof isOpen === "boolean";

  if (!to && hasSubmenu) {
    return (
      <button
        onClick={toggleOpen}
        className={`flex items-center justify-between w-full cursor-pointer px-4 py-2 transition-colors `}

      >
        <div className="flex items-center gap-2">
          {icon(false)}
          <span className="font-bold text-sm sm:text-base">{label}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 hidden sm:inline" />
        ) : (
          <ChevronDown className="h-5 w-5 hidden sm:inline" />
        )}
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        `flex items-center justify-center sm:justify-between w-full cursor-pointer px-4 py-2 transition-colors ${
          isPending
            ? "text-gray-400"
            : isActive
            ? "bg-[#2E99B0] text-white rounded-xl"
            : "hover:bg-gray-100 text-[#2E99B0]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-2">
            {icon(isActive)}
            <span className="font-bold text-sm sm:text-base">{label}</span>
          </div>
          {hasSubmenu &&
            (isOpen ? (
              <ChevronUp className="h-5 w-5 hidden sm:inline" />
            ) : (
              <ChevronDown className="h-5 w-5 hidden sm:inline" />
            ))}
        </>
      )}
    </NavLink>
  );
};

export default SidebarLink;
