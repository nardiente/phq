import React, { useState } from 'react';

// Define the structure of a FAQ item
interface FaqItem {
  question: string;
  answer: string;
}

// Define the component
const Faqs: React.FC = () => {
  // State to keep track of which FAQ item is open; initially open the first one
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Set to 0 to open the first item

  // Toggle FAQ item based on its index
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // List of FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Why are you so cheap?',
      answer: `We’re new to the market with a core set of functionality and some additional features. We are focused on delivering value at a reasonable price relative to our competitors. As we add more products, features, and value to ProductHQ, we will increase the prices. These prices will be for new customers, so best jump in early to lock in early adopter pricing.`,
    },
    {
      question: 'Can I upgrade or downgrade my plan at any time?',
      answer: `Yes. Click on the menu in the top right corner and click the Choose Plan button. 
               You will navigate to the pricing page, where you can upgrade or downgrade your 
               plan to the one that best suits you. There is also a Choose Plan button in the 
               left-hand menu when you navigate to Account > Account Settings. If you change 
               your plan, you will pay the pro-rata amount of your current plan and new plan.`,
    },
    {
      question: 'What is an Idea?',
      answer: `Like the name suggests, an Idea is an idea that anyone comes up with. It could be a new feature, enhancement of existing feature, etc.`,
    },
    {
      question: 'What payment methods are accepted?',
      answer: `Visa, Mastercard, AmericanExpress, China UnionPay, and JCB payments.`,
    },
    {
      question: 'Do I need to sign a contract?',
      answer: `There’s no lock-in contract. No setup fee. Sign up, subscribe and start using ProductHQ. If you want to cancel, we make it super easy for you.`,
    },

    // Add more FAQ items here if needed
  ];

  return (
    <div className="pricingFaqs">
      <div className="dd-container">
        <div className="sectionTitle">
          <h2>FAQs</h2>
        </div>
        <div className="faqsWrapper">
          {faqItems.map((faq, index) => (
            <div className="faqItem" key={index}>
              <div className="titleBlock" onClick={() => toggleFaq(index)}>
                <h6
                  style={{
                    fontWeight: 700,
                    fontSize: '18px',
                  }}
                >
                  {faq.question}
                </h6>
                <span className="icon">
                  <img
                    src="./static/images/angleDown.svg"
                    alt=""
                    style={{
                      transform:
                        openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  />
                </span>
              </div>
              {openIndex === index && (
                <div className="contentBlock">
                  <div className="content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
