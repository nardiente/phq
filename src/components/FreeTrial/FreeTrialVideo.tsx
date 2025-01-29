import { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

export default function FreeTrialVideo() {
  const [play, setplay] = useState(false);

  const scrollToPricing = () => {
    const element = document.getElementById('pricingPlansId');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="freeTrialVideo">
      <div className="custom-container">
        <div className="videoBox">
          {play ? (
            <Player videoid={'oILd4NjgTW0'} />
          ) : (
            <div className="videoPoster">
              <img src="../../static/images/videoPosterImage.png" />
              <button
                onClick={() => setplay(true)}
                type="button"
                className="play-btn"
              >
                <img
                  src="../../static/images/playBtnBlue.svg"
                  alt="Play Button"
                />
              </button>
            </div>
          )}
        </div>
        <div className="buttonBox">
          <button className="solidBtn" onClick={scrollToPricing}>
            Start Your 14-Day Free Trial
          </button>
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
