import React, { useState, useEffect } from 'react';
import { TabLauncher } from './launchers/TabLauncher';
import { FloatingLauncher } from './launchers/FloatingLauncher';
import { WidgetContent } from './WidgetContent';

export const WidgetsTable = ({ widgets, onPublish, onEdit, onDelete }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  return (
    <table className="min-w-full">
      {/* ... table headers ... */}
      <tbody>
        {widgets.map((widget) => (
          <tr key={widget.id}>
            {/* ... other columns ... */}
            <td className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent document click from immediately closing
                  setOpenMenuId(openMenuId === widget.id ? null : widget.id);
                }}
                className="p-2"
              >
                ⋮
              </button>
              
              {openMenuId === widget.id && (
                <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-10">
                  <button onClick={() => { onPublish(widget.id); setOpenMenuId(null); }}>
                    Publish
                  </button>
                  <button onClick={() => { onEdit(widget.id); setOpenMenuId(null); }}>
                    Edit
                  </button>
                  <button onClick={() => { onDelete(widget.id); setOpenMenuId(null); }}>
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}; 