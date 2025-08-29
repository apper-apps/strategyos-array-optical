import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ActionPanel = ({ 
  onGeneratePDF, 
  onSendWebhook,
  isGeneratingPDF = false,
  isSendingWebhook = false,
  canExport = false,
  className 
}) => {
  return (
    <div className={cn(
      "bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white shadow-xl",
      className
    )}>
      <div className="text-center mb-6">
        <ApperIcon name="Download" size={48} className="mx-auto mb-4 opacity-90" />
        <h2 className="text-2xl font-bold mb-2">Export Your Strategy</h2>
        <p className="opacity-90">
          Generate a comprehensive PDF report or send data to your CRM
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="secondary"
          size="lg"
          onClick={onGeneratePDF}
          loading={isGeneratingPDF}
          disabled={!canExport || isGeneratingPDF || isSendingWebhook}
          icon="FileDown"
          className="bg-white text-primary-600 hover:bg-gray-50 border-white"
        >
          Generate PDF Report
        </Button>
        
        <Button
          variant="accent"
          size="lg"
          onClick={onSendWebhook}
          loading={isSendingWebhook}
          disabled={!canExport || isGeneratingPDF || isSendingWebhook}
          icon="Send"
          className="bg-accent-500 hover:bg-accent-600 border-accent-500"
        >
          Send to CRM
        </Button>
      </div>

      {!canExport && (
        <div className="mt-4 text-center">
          <p className="text-sm opacity-75 flex items-center justify-center">
            <ApperIcon name="Info" size={16} className="mr-2" />
            Complete company information to enable export
          </p>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;