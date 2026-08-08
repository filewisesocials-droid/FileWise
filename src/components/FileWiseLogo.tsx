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
      src="/logo.svg" 
      alt="FileWise Logo" 
      width={size}
      height={size}
      className={`${className} object-contain`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/logo.jpg';
      }}
    />
  );
};
