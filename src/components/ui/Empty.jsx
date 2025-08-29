import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data available",
  message = "Get started by adding some information.",
  actionText = "Get Started",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
        <ApperIcon name={icon} size={32} className="text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{message}</p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;