import { WidgetConfig } from '../../../types/widget';
import { WhatsNewHeader } from './WhatsNewHeader';
import { WhatsNewList } from './WhatsNewList';

export const WhatsNewContent = ({ config }: { config: WidgetConfig }) => (
  <div>
    <WhatsNewHeader />
    <WhatsNewList config={config} />
  </div>
);
