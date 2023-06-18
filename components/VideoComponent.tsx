// @ts-nocheck
import React from "react";

function PlayButtonIcon() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
      className="fill-current text-coolGray-700"
    >
      <g>
        <path
          d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
      c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
      C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"
        />
        <path
          d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
      S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
}

export const VideoComponent = ({ video_name, poster = null, alt = null }) => {
  const extension = poster ? ".mp4" : ".mp4#t=0.001"; // skip the first millisecond so that previews show up on iOS
  const mp4_path = "/videos/" + video_name + extension;

  return (
    <div className="relative">
      <a href={mp4_path} target="_blank">
        <div className="absolute z-20 block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16">
          <PlayButtonIcon />
        </div>
        <video
          playsInline
          poster={poster}
          autobuffer="true"
          loop
          muted
          id={video_name}
          alt={alt}
          className="relative w-full h-full border-1 z-0 rounded"
        >
          <source src={mp4_path} type="video/mp4" />
        </video>
      </a>
    </div>
  );
};
