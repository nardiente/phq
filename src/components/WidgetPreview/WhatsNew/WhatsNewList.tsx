import { Fragment } from 'react/jsx-runtime';
import { useWhatsNew } from '../../../contexts/WhatsNewContext';
import PostItem from '../../whats_new/post/PostItem';
import { getDigits } from '../../../utils/string';
import { useWidget } from '../../../contexts/WidgetContext/WidgetProvider';

export const WhatsNewList = () => {
  const {
    state: { posts },
    setSelectedPost,
    setShowAddForm,
  } = useWhatsNew();
  const {
    state: { config },
  } = useWidget();

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
