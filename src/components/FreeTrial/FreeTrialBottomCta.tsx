export default function FreeTrialBottomCta() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricingPlansId');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="freeTrialBottomCta">
        <div className="custom-container">
          <div className="textBlock">
            <h2>Turn Feedback Into Features Fast with ProductHQ</h2>
            <p>Join product teams making better product decisions</p>
            <button className="solidBtn" onClick={scrollToPricing}>
              Start Your 14-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
