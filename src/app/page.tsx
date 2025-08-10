// src/app/page.tsx
import SplineViewer from '../components/SplineViewer';
import Terminal from '../components/Terminal';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-1/2 h-screen">
        <SplineViewer />
      </div>
      <div className="w-1/2 h-screen">
        <Terminal />
      </div>
    </div>
  );
}