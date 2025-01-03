"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Tab {
  label: string;
  route: string;
}

interface TabLayoutProps {
  tabs: Tab[];
  children: React.ReactNode;
}

const TabLayout: React.FC<TabLayoutProps> = ({ tabs, children }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="tab-layout">
      {/* Tab Navigation Header */}
      <div className="tabs-header flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.route}
            onClick={() => router.push(tab.route)}
            className={`tab ${
              pathname.includes(tab.route)
                ? "border-b-2 border-blue-600 font-bold text-blue-600"
                : "text-gray-600"
            } px-4 py-2`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Page Content */}
      <div className="tab-content mt-4">{children}</div>
    </div>
  );
};

export default TabLayout;
