import IconTextCol from './IconTextCol';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const gotoFirstPrice = () => {
    let href = location.href;
    if (href.includes('#')) {
      href = href.split('#')[0];
    }
    location.href = href + '#first-price';
  };

  return (
    <>
      <div className="hero-section">
        <div className="dd-container">
          <div className="hero-text">
            <h1 className="text-[48px] font-bold">
              ProductHQ streamlines user feedback to help <br />
              SaaS teams built the right products faster
            </h1>
            <p>
              Get valuable feedback, a beautiful roadmap, and what’s new
              feature, all in one simple, elegant tool.
            </p>
            <button
              className="btn-with-arrow is-clickable"
              onClick={gotoFirstPrice}
            >
              PURCHASE <ArrowRight />
            </button>
            <span className="info-text">
              Pay once & use ProductHQ features forever!
            </span>
          </div>
          <div className="icon-text-columns">
            <IconTextCol />
          </div>
        </div>
      </div>
    </>
  );
}
