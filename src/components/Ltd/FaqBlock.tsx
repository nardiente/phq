import React from 'react';

export default function FaqBlock() {
  const faqsData = [
    {
      question: 'Does support work on the weekends?',
      answer:
        'You’ll usually find the founder, Tres, on support on the weekends. He wants to stay as close to the customer as possible for as long as possible to gather feedback on how to improve ProductHQ.',
    },
    {
      question: 'Is there a way to add rel="nofollow" to links?',
      answer:
        'This option is in our backlog and will be built soon as part of the privacy feature.',
    },
    {
      question:
        'Can anybody see email addresses of visitors who have already given feedback?',
      answer:
        'No email addresses are ever exposed. We also give you the ability to change the format to the user’s names so they become more ambiguous i.e. John Smith, J Smith, John S',
    },
    {
      question: 'Can I keep my board private, just for my internal team?',
      answer:
        'Yes. There’s no need to share it with anyone if you don’t want to.',
    },
    {
      question: 'It is easy to embed the board into my website?',
      answer:
        '100%. It’s simple a matter of copying and pasting a URL to where ever you want on your website. We have instructions for this and we’re always here to assist if you need any help.',
    },
    {
      question: 'What happens when I hit my tier limit?',
      answer:
        'Users can still submit ideas (nothing changes on the user end), but the admin ability to move ideas through the Roadmap is stopped until the admin archives ideas to under the 100 idea limit.',
    },
    {
      question: 'Do you have an affiliate program that I could join?',
      answer:
        'We have one set up for a specific type of affiliate. I’m sure we can expand it to accommodate other affiliates.',
    },
    {
      question:
        'Do you have a feature that automatically emails the latest updates?',
      answer: 'Not yet, but this is a priority for us.',
    },
  ];

  const faqsDataItems = faqsData.map((block, idx) => (
    <div key={idx} className="faq-block">
      <h5 className="text-[24px] font-bold">{block.question}</h5>
      <p>{block.answer}</p>
      {/* <div dangerouslySetInnerHTML={{__html: block.answer}} /> */}
    </div>
  ));

  return <>{faqsDataItems}</>;
}
