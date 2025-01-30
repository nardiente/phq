import React, { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

export default function Video() {
  const [play, setplay] = useState(false);

  return (
    <div className="video-section">
      <div className="dd-container">
        <div className="section-title">
          <h2 className="text-[48px] font-bold">
            Build Products You KNOW <br />
            Your Customers Want!
          </h2>
          <p>
            Prioritize feedback, build a roadmap, and close the <br />
            communication loop with a built-in changelog.
          </p>
        </div>

        <div className="videoBox">
          {play ? (
            <Player videoid={'oILd4NjgTW0'} />
          ) : (
            <div className="videoPoster">
              <img src="../static/images/video-poster.jpg" />
              <button
                onClick={() => setplay(true)}
                type="button"
                className="play-btn"
              >
                <img src="../static/images/play-button.svg" alt="Play Button" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Player({ videoid }: { videoid: any }) {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '600',
    width: '1400',
    playerVars: {
      autoplay: true,
      controls: false,
      rel: false,
    },
  };

  return (
    <YouTube
      className="flex"
      iframeClassName="iframeClassName"
      videoId={videoid}
      opts={opts}
      title={''}
      onReady={onPlayerReady}
    />
  );
}
