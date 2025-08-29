import React from "react";
import ProgressBar from "@/components/atoms/ProgressBar";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SystemScoreDisplay = ({ 
  score, 
  totalChannels, 
  selectedChannels,
  categoryBreakdown,
  className 
}) => {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    if (score >= 80) return "Excellent marketing coverage!";
    if (score >= 60) return "Good foundation, room for growth";
    if (score >= 40) return "Moderate coverage, consider expanding";
    return "Limited coverage, significant opportunity";
  };

  const getScoreVariant = () => {
    if (score >= 70) return "success";
    if (score >= 40) return "primary";
    return "accent";
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl p-8 shadow-xl border border-gray-100",
      className
    )}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
            <ApperIcon name="BarChart3" size={32} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold gradient-text mb-2">System Score</h2>
        <p className="text-gray-600">Based on your marketing channel selection</p>
      </div>

      <div className="space-y-6">
        {/* Main Score */}
        <div className="text-center">
          <div className={cn("text-5xl font-bold mb-2", getScoreColor())}>
            {Math.round(score)}%
          </div>
          <p className="text-gray-700 font-medium">{getScoreMessage()}</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          value={score} 
          variant={getScoreVariant()}
          size="lg"
          showPercentage={false}
        />

        {/* Channel Breakdown */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {categoryBreakdown.trafficSources}
            </div>
            <div className="text-xs text-gray-600 font-medium">Traffic Sources</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600 mb-1">
              {categoryBreakdown.prospectFeed}
            </div>
            <div className="text-xs text-gray-600 font-medium">Prospect Feed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600 mb-1">
              {categoryBreakdown.retargeting}
            </div>
            <div className="text-xs text-gray-600 font-medium">Retargeting</div>
          </div>
        </div>

        {/* Total Selected */}
        <div className="text-center pt-4 border-t border-gray-100">
          <span className="text-gray-600">Total Selected: </span>
          <span className="font-bold gradient-text">
            {selectedChannels}/{totalChannels} Channels
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemScoreDisplay;