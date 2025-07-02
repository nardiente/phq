import { useWhatsNew } from '../../contexts/WhatsNewContext';

export function WhatsNewSection() {
  const {
    state: { posts },
  } = useWhatsNew();

  const mostViewed = () => {
    return posts
      .filter((post) => post.views.length > 0)
      .sort((a, b) => b.views.length - a.views.length)
      .slice(0, 5)
      .map((post) => (
        <div key={post.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">{post.title}</div>
        </div>
      ));
  };

  const mostClicks = () => {
    return posts
      .filter((post) => post.clicks.length > 0)
      .sort((a, b) => b.clicks.length - a.clicks.length)
      .slice(0, 5)
      .map((post) => (
        <div key={post.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">{post.title}</div>
        </div>
      ));
  };

  const mostShared = () => {
    return posts
      .filter((post) => post.shares.length > 0)
      .sort((a, b) => b.shares.length - a.shares.length)
      .slice(0, 5)
      .map((post) => (
        <div key={post.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">{post.title}</div>
        </div>
      ));
  };

  const mostReactions = () => {
    return posts
      .sort((a, b) => {
        // Sum all emoji reactions for post b
        const bTotal = Object.values<number>(b.emoji_list).reduce(
          (sum, count) => sum + count,
          0
        );
        // Sum all emoji reactions for post a
        const aTotal = Object.values<number>(a.emoji_list).reduce(
          (sum, count) => sum + count,
          0
        );
        return bTotal - aTotal;
      })
      .slice(0, 5)
      .map((post) => (
        <div key={post.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">{post.title}</div>
        </div>
      ));
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
        What's New
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Viewed
          </div>
          {mostViewed()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Clicks
          </div>
          {mostClicks()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Reactions
          </div>
          {mostReactions()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Shared
          </div>
          {mostShared()}
        </div>
      </div>
    </>
  );
}
