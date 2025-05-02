import { Fragment } from 'react/jsx-runtime';
import { useWhatsNew } from '../../../contexts/WhatsNewContext';
import PostItem from '../../whats_new/post/PostItem';
import { WidgetConfig } from '../../../types/widget';
import { getDigits } from '../../../utils/string';

export const WhatsNewList = ({ config }: { config: WidgetConfig }) => {
  const {
    state: { posts },
    setSelectedPost,
    setShowAddForm,
  } = useWhatsNew();

  const width = (getDigits(config.appearance.width) ?? 450) - 90;

  return (
    <div className="space-y-4" style={{ width: `${width}px` }}>
      {posts.map((post, idx) => (
        <Fragment key={idx}>
          <PostItem
            style={{ width: `${width}px` }}
            whats_new={post}
            openPostForm={() => {
              setSelectedPost(post);
              setShowAddForm(true);
            }}
          />
        </Fragment>
      ))}
    </div>
  );
};
