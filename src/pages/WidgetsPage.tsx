import React, { useState } from 'react';
import { ComingSoonLayout } from '../components/ComingSoonLayout';
import Section from '../components/Section';
import { Plus } from 'lucide-react';

export default function WidgetsPage() {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);

  const toggleSection = (sectionNumber: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionNumber)
        ? prev.filter((num) => num !== sectionNumber)
        : [sectionNumber]
    );
  };

  return (
    <ComingSoonLayout>
      <div className="min-h-screen bg-[#fafafa] pb-24">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between px-6 py-8">
            <div>
              <h1 className="text-[28px] font-semibold text-[#1A1942] mb-2">
                Create new widget
              </h1>
              <p className="text-[14px] text-gray-600">
                All changes will be auto-saved.
              </p>
            </div>
            <button className="flex items-center gap-2 h-[35px] w-[122px] justify-center bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg">
              <Plus size={16} />
              <span className="text-[14px]">Create New</span>
            </button>
          </div>

          <div className="px-6 space-y-3">
            <Section
              number={1}
              title="Widget Type"
              subtitle="Configure the type and appearance of your widget"
              isExpanded={expandedSections.includes(1)}
              onToggle={() => toggleSection(1)}
              details={
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm text-gray-700 font-medium">
                      Widget type
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white">
                      <option>Select widget type</option>
                      <option>Feedback</option>
                      <option>Survey</option>
                      <option>NPS</option>
                    </select>
                  </div>
                </div>
              }
            />

            <Section
              number={2}
              title="Appearance"
              subtitle="Customize how your widget looks"
              isExpanded={expandedSections.includes(2)}
              onToggle={() => toggleSection(2)}
              details={
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm text-gray-700 font-medium">
                      Theme
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              }
            />

            <Section
              number={3}
              title="Placement"
              subtitle="Choose where your widget appears"
              isExpanded={expandedSections.includes(3)}
              onToggle={() => toggleSection(3)}
              details={
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm text-gray-700 font-medium">
                      Position
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white">
                      <option>Bottom Right</option>
                      <option>Bottom Left</option>
                      <option>Center</option>
                    </select>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </ComingSoonLayout>
  );
}
