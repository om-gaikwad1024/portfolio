'use client';

import Spline from '@splinetool/react-spline';

export default function SplineViewerMobile() {
  return (
    <div className="w-full h-full bg-[#1a1a1a]">
      <Spline 
        scene="https://prod.spline.design/NPjtEFyvMbqmrJjG/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}