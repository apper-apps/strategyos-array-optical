import React from "react";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  value, 
  max = 100, 
  className, 
  showPercentage = true,
  size = "md",
  variant = "primary"
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };
  
  const variants = {
    primary: "from-primary-500 to-secondary-500",
    accent: "from-accent-500 to-accent-600",
    success: "from-green-500 to-green-600",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        sizes[size]
      )}>
        <div
          className={cn(
            "progress-fill h-full bg-gradient-to-r rounded-full transition-all duration-700 ease-out",
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
          <span>0%</span>
          <span className="font-semibold gradient-text">
            {Math.round(percentage)}%
          </span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;