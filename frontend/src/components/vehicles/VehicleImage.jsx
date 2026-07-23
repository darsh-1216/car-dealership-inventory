import { useState } from "react";

function VehicleImage({ alt, className = "h-11 w-16 rounded-md", src }) {
  const [hasImageError, setHasImageError] = useState(false);

  if (src && !hasImageError) {
    return <img alt={alt} className={`${className} object-cover`} onError={() => setHasImageError(true)} src={src} />;
  }

  return (
    <div aria-label={`${alt} placeholder`} className={`flex shrink-0 items-center justify-center bg-slate-100 text-slate-400 ${className}`} role="img">
      <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
        <path d="M5 16v-4l2-5h10l2 5v4M4 16h16v3H4zM7 19h.01M17 19h.01M6 12h12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    </div>
  );
}

export default VehicleImage;
