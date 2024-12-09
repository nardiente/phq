import { TestimonialType } from '../../../types/onboarding';
import { EllipseIcon } from '../../../components/icons/ellipse.icon';
import { Ratings } from './ratings';

export const Testimonial = ({
  name,
  profession,
  rating,
  testimony,
}: TestimonialType) => {
  return (
    <div id="testimonial">
      <div className="containter">
        <div className="details">
          <div className="author">
            <p>{name}</p>
            <span>
              <EllipseIcon />
              <p>{profession}</p>
            </span>
          </div>
          <p className="testimony">{testimony}</p>
        </div>
        <Ratings rate={rating} />
      </div>
    </div>
  );
};
