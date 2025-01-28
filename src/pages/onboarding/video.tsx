import React, { useEffect } from 'react';

const Video = ({ src, poster }: { src: string; poster: string }) => {
  useEffect(() => {
    const video = document.getElementById(
      'onboardingVideo'
    ) as HTMLVideoElement;

    video.playbackRate = 1.25;
    video.play();

    return () => {
      video.pause();
    };
  }, []);

  return (
    <video id="onboardingVideo" autoPlay loop poster={poster} muted>
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default Video;
