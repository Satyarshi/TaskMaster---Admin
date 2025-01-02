"use client";

import React, { useState, ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsLayoutProps {
  tabs: Tab[];
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full space-y-4">
      {/* Tabs Header - Separated into its own card */}
      <div className="rounded-sm bg-white dark:bg-boxdark">
        <div className="flex border-b border-stroke dark:border-strokedark">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-3 transition duration-300 focus:outline-none ${
                activeTab === index
                  ? "border-b-2 border-primary text-primary dark:text-white"
                  : "text-body hover:text-primary dark:text-bodydark dark:hover:text-white"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content - Separate card */}
      <div className="rounded-sm bg-white p-4 dark:bg-boxdark">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default TabsLayout;
