import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const SectionHeader = ({ 
  icon, 
  title, 
  description, 
  count, 
  total,
  onSelectAll,
  onReset,
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <span>{title}</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
              {count}/{total}
            </span>
          </h2>
          {description && (
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSelectAll}
          className="text-xs"
        >
          Select All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SectionHeader;