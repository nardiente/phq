import React, { useState } from 'react';
import Alert from './ui/alert/Alert';

const DesignPage = () => {
  const [activeTab, setActiveTab] = useState('alerts');

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-12">Design System</h1>

      {/* Just alerts for now */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-6">Alerts</h2>
        <div className="flex flex-col gap-6">
          <Alert
            variant="dark"
            title="Dark Alert"
            description="This is a dark alert example."
          />
        </div>
      </section>
    </div>
  );
};

export default DesignPage;
