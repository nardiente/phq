import { StarFillIcon } from '../../../components/icons/star-fill.icon';
import '../styles.css';
import { StarIcon } from '../../../components/icons/star.icon';

export const Ratings = ({ rate }: { rate: number }) => {
  const stars: JSX.Element[] = [];

  let i = 0;
  while (i < 5) {
    stars.push(
      <div key={`star${i + 1}`} className={i < rate ? 'color-yellow' : ''}>
        {i < rate ? <StarFillIcon /> : <StarIcon />}
      </div>
    );
    i++;
  }

  return <div className="ratings">{stars}</div>;
};
