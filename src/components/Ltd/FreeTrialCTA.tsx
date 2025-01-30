export default function FreeTrialCTA() {
  const gotoSecondPrice = () => {
    let href = location.href;
    if (href.includes('#')) {
      href = href.split('#')[0];
    }
    location.href = href + '#second-price';
  };

  return (
    <div className="start-trial-cta-block">
      <div className="bg-image">
        <img src="../static/images/cta-banner-image.jpg" alt="" />
      </div>
      <div className="dd-container">
        <div className="text-block">
          <h2 className="text-[48px] font-bold">
            Lock In MASSIVE Savings With ProductHQ’s Lifetime Deal
          </h2>
          <h5 className="text-[24px] font-bold">
            Start using ProductHQ today.
          </h5>
          <button
            className="btn-with-arrow btn-white is-clickable"
            onClick={gotoSecondPrice}
          >
            Purchase{' '}
            <img
              src="../static/images/arrow-right-purple.svg"
              alt="Arrow Right"
            />
          </button>
          <span className="info-text">60-day money back guarantee.</span>
        </div>
      </div>
    </div>
  );
}
