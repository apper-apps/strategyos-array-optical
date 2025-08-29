import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Error"
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
          <ApperIcon name="AlertTriangle" size={32} className="text-red-600" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="primary"
            icon="RefreshCw"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;