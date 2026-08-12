import React from 'react';

interface FileWiseLogoProps {
  className?: string;
  size?: number;
}

export const FileWiseLogo: React.FC<FileWiseLogoProps> = ({ 
  className = "w-10 h-10",
  size = 40
}) => {
  return (
    <img 
      src="/favicon-96x96.png" 
      alt="FileWise Logo" 
      width={size}
      height={size}
      className={`${className} object-contain`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/favicon-32x32.png';
      }}
    />
  );
};
