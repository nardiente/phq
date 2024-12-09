import { TestimonialType } from '../../types/onboarding';
import './styles.css';
import { Testimonial } from './components/testimonial';

export const Testimonials = () => {
  const testimonials: TestimonialType[] = [
    {
      name: 'Aura Brooks',
      profession: 'Graphic Designer',
      rating: 5,
      testimony:
        "I've tested out all the other products on the market, but ProductHQ takes the cake when it comes to user interface and experience. The team behind it is constantly rolling out new features at an incredible pace, which is really impressive.",
    },
    {
      name: 'Jack Graham',
      profession: 'Co-founder',
      rating: 5,
      testimony:
        "ProductHQ is amazing. It's changed the way we connect with our customers. Not only has it saved us heaps of money and time by avoiding unnecessary guesswork for upcoming features, but it also empowers our customers to directly influence the direction of our product.",
    },
  ];

  return (
    <div id="testimonials">
      {testimonials.map((testimonial, idx) => (
        <Testimonial
          key={idx}
          name={testimonial.name}
          profession={testimonial.profession}
          rating={testimonial.rating}
          testimony={testimonial.testimony}
        />
      ))}
    </div>
  );
};
