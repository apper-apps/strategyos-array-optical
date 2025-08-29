import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const IconCard = ({ 
  icon, 
  title, 
  isSelected = false, 
  onClick, 
  className,
  disabled = false
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "card-hover cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 relative group",
        isSelected 
          ? "border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg" 
          : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
          <ApperIcon name="Check" size={12} className="text-white" />
        </div>
      )}
      
      <div className="flex flex-col items-center space-y-3">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200",
          isSelected 
            ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md" 
            : "bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600"
        )}>
          <ApperIcon name={icon} size={24} />
        </div>
        
        <span className={cn(
          "text-sm font-semibold text-center leading-tight transition-colors duration-200",
          isSelected 
            ? "text-primary-700" 
            : "text-gray-700 group-hover:text-primary-600"
        )}>
          {title}
        </span>
      </div>
    </motion.div>
  );
};

export default IconCard;