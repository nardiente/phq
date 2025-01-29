export default function FreeTrialHero() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricingPlansId');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="freeTrialHeroSection">
        <div className="custom-container">
          <div className="heroText">
            <h1>
              Collect Feedback, Plan Features, <br></br>and Share Updates - All
              in One Place
            </h1>
            <p>
              {`Transform scattered customer feedback into a clear product
              roadmap, and keep everyone informed about what's shipping next.`}
            </p>
            <button className="solidBtn" onClick={scrollToPricing}>
              Start Your 14-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
