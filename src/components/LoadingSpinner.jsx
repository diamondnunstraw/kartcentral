const LoadingSpinner = ({ size = 'default', light = false }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const colorClasses = light
    ? 'border-white/20 border-t-white'
    : 'border-gray-700 border-t-purple-500';

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div 
        className={`
          ${sizeClasses[size]}
          border-4
          ${colorClasses}
          rounded-full
          animate-spin
          relative
        `}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 opacity-20 blur-sm"></div>
      </div>
      <div className={`text-sm ${light ? 'text-white/80' : 'text-gray-400'}`}>
        Loading...
      </div>
    </div>
  );
};

export default LoadingSpinner; 