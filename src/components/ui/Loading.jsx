import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg animate-pulse">
            <ApperIcon name="BarChart3" size={32} className="text-white" />
          </div>
          
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin mx-auto"></div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">StrategyOS</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default Loading;