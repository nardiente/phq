import React, { useEffect } from 'react';

export default function TestimonialsPage() {
  useEffect(() => {
    // Create and load the script
    const script = document.createElement('script');
    script.src = 'https://asserts.testimonial.gozen.io/scripts/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex-1 px-8 py-6">
      <div className="max-w-[1200px]">
        <h1 className="text-[28px] font-semibold text-gray-900 mb-6">Leave Testimonial</h1>
        <div 
          id="gz-testimonial-widget" 
          data-gz-id="595373c9-cdd7-4aca-ac0f-ba63ab9a4838"
          data-gz-type="standard" 
          data-gz-hidden=""
          style={{ height: '600px', width: '100%' }}
        />
      </div>
    </div>
  );
}