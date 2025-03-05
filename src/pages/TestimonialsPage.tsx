import { useEffect } from 'react';

interface TestimonialsPageProps {
  hideGoZenBranding?: boolean;
}

export default function TestimonialsPage({
  hideGoZenBranding,
}: TestimonialsPageProps) {
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

  useEffect(() => {
    if (hideGoZenBranding) {
      const brandingElement = document.querySelector('.gozen-branding');
      if (brandingElement) {
        (brandingElement as HTMLElement).style.display = 'none';
      }
    }
  }, [hideGoZenBranding]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="text-center"
        style={{ width: 'calc(75% + 40px)', height: 'calc(75% + 70px)' }}
      >
        <h1 className="text-[28px] font-semibold text-gray-900 mb-6">
          Share your feedback
        </h1>
        <div
          id="gz-testimonial-widget"
          data-gz-id="595373c9-cdd7-4aca-ac0f-ba63ab9a4838"
          data-gz-type="standard"
          data-gz-hidden=""
          style={{ height: '100%', width: '100%' }}
        ></div>
        <script src="https://asserts.testimonial.gozen.io/scripts/embed.js"></script>
        <div className="bg-white rounded-xl border border-gray-300 shadow-lg space-x-2 px-4 py-2 absolute bottom-5 right-5 inline-flex items-center justify-center cursor-pointer">
          {!hideGoZenBranding && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                className="w-8 h-8"
              >
                <g clip-path="url(#clip0_1_3)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M50.0003 0C36.7397 0 24.022 5.26783 14.6451 14.6447C5.26833 24.0215 0.000484556 36.7393 0.000484556 50C-0.031791 57.186 1.5487 64.2873 4.6255 70.7813C6.12273 73.9207 6.42273 77.4987 5.46923 80.8437L0.000484556 100C0.000484556 100 11.938 96.5937 19.188 94.625C22.5125 93.6757 26.0695 93.9757 29.188 95.4687C35.9803 98.5757 43.3823 100.122 50.8507 99.9927C58.3187 99.8637 65.663 98.063 72.344 94.723C79.025 91.3833 84.8727 86.5893 89.4577 80.693C94.0427 74.7967 97.2483 67.948 98.8393 60.65C100.43 53.3523 100.366 45.7907 98.6513 38.521C96.9367 31.2512 93.6147 24.4581 88.9303 18.6405C84.2457 12.823 78.317 8.12893 71.5803 4.9032C64.8437 1.67747 57.4697 0.00203751 50.0003 0ZM73.2193 45.5623L65.8443 55.1563L66.188 67.25C66.208 67.833 66.0843 68.4117 65.8283 68.9357C65.5723 69.46 65.1917 69.913 64.7197 70.2557C64.2473 70.598 63.6987 70.8193 63.121 70.9C62.5433 70.981 61.9547 70.9187 61.4067 70.7187L50.0003 66.6563L38.5943 70.7187C38.0487 70.902 37.4677 70.9553 36.898 70.8737C36.3283 70.7923 35.7853 70.5787 35.313 70.25C34.8233 69.8963 34.4317 69.424 34.1747 68.8773C33.9177 68.3307 33.804 67.7277 33.8443 67.125L34.188 55.0313L26.813 45.4377C26.4591 44.979 26.2223 44.441 26.1232 43.8703C26.0241 43.3 26.0656 42.7137 26.2441 42.1627C26.4226 41.6117 26.7328 41.1127 27.1478 40.7083C27.5627 40.3043 28.0699 40.0077 28.6255 39.8437L40.2193 36.4373L47.063 26.4688C47.41 26.0152 47.857 25.6476 48.3693 25.3947C48.8813 25.1417 49.445 25.0101 50.016 25.0101C50.5873 25.0101 51.1507 25.1417 51.663 25.3947C52.175 25.6476 52.622 26.0152 52.9693 26.4688L59.813 36.4373L71.4067 39.8437C71.9623 40.0077 72.4693 40.3043 72.8843 40.7083C73.2993 41.1127 73.6097 41.6117 73.788 42.1627C73.9667 42.7137 74.008 43.3 73.909 43.8703C73.81 44.441 73.573 44.979 73.2193 45.4377V45.5623Z"
                    fill="#2563EB"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_1_3">
                    <rect width="100" height="100" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-base font-semibold tracking-wide">
                Powered by GoZen Testimonials
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
