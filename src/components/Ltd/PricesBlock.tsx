import { LifetimeDeal } from '../../types/billing';
import PriceBlock from './PriceBlock';

interface Props {
  id: string;
  lifetimeDeal: LifetimeDeal;
}

export default function PricesBlock({ id, lifetimeDeal }: Props) {
  return (
    <div className="prices-section" id={id}>
      <div className="dd-container">
        <div className="section-title">
          <h2 className="text-[48px] font-bold">
            For A Very Limited Time Only. <br />
            ProductHQ’s Lifetime Deal
          </h2>
          <p>Super affordable.</p>
          <p>Packed with features.</p>
          <p>60 day money-back guarantee.</p>
        </div>
        <div className="prices-wrapper">
          <PriceBlock lifetimeDeal={lifetimeDeal} />
        </div>
      </div>
    </div>
  );
}
