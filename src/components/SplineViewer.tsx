// src/components/SplineViewer.tsx
'use client';

import Spline from '@splinetool/react-spline';

export default function SplineViewer() {
  return (
    <div className="w-full h-full bg-black">
      <Spline 
        scene="https://prod.spline.design/lrJ7dvmEs6VJEc9D/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}