import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import CompanyInfoForm from "@/components/organisms/CompanyInfoForm";
import MarketingChannelSection from "@/components/organisms/MarketingChannelSection";
import SystemScoreDisplay from "@/components/organisms/SystemScoreDisplay";
import ActionPanel from "@/components/organisms/ActionPanel";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useMarketingChannels } from "@/hooks/useMarketingChannels";
import { useCompanyValidation } from "@/hooks/useCompanyValidation";
import marketingChannelService from "@/services/api/marketingChannelService";
import { generateStrategyPDF } from "@/utils/pdfGenerator";

const Dashboard = () => {
  const { channels, loading, error, refetch } = useMarketingChannels();
  const { errors, validateAll, validateSingle, clearErrors } = useCompanyValidation();
  
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });
  
  const [selectedChannels, setSelectedChannels] = useState({});
  const [systemScore, setSystemScore] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);

  // Calculate system score whenever selections change
  useEffect(() => {
    if (channels.trafficSources.length > 0) {
      const score = marketingChannelService.calculateSystemScore(selectedChannels, channels);
      setSystemScore(score);
    }
  }, [selectedChannels, channels]);

  // Handle channel toggle
  const handleToggleChannel = (channelId) => {
    setSelectedChannels(prev => ({
      ...prev,
      [channelId]: !prev[channelId]
    }));
  };

  // Handle select all for category
  const handleSelectAll = (channelIds) => {
    const updates = {};
    channelIds.forEach(id => {
      updates[id] = true;
    });
    
    setSelectedChannels(prev => ({
      ...prev,
      ...updates
    }));
    
    toast.success("All channels selected!");
  };

  // Handle reset category
  const handleReset = (channelIds) => {
    const updates = {};
    channelIds.forEach(id => {
      updates[id] = false;
    });
    
    setSelectedChannels(prev => ({
      ...prev,
      ...updates
    }));
    
    toast.info("Selection reset");
  };

  // Handle company info update with validation
  const handleCompanyInfoUpdate = (newInfo) => {
    setCompanyInfo(newInfo);
    
    // Real-time validation
    Object.keys(newInfo).forEach(field => {
      if (newInfo[field] !== companyInfo[field]) {
        validateSingle(field, newInfo[field]);
      }
    });
  };

// Memoized export validation to prevent infinite re-renders
  const canExport = useMemo(() => {
    return validateAll(companyInfo) && Object.values(selectedChannels).some(Boolean);
  }, [companyInfo, selectedChannels, validateAll]);
  // Generate PDF report
  const handleGeneratePDF = async () => {
    if (!canExport()) {
      toast.error("Please complete company information and select at least one channel");
      return;
    }

    try {
      setIsGeneratingPDF(true);
      
      // Generate PDF
      const doc = generateStrategyPDF(companyInfo, selectedChannels, channels, systemScore);
      
      // Download PDF
      doc.save(`${companyInfo.companyName.replace(/\s+/g, "_")}_Marketing_Strategy.pdf`);
      
      toast.success("PDF report generated successfully!");
      
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF report");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Send webhook data
  const handleSendWebhook = async () => {
    if (!canExport()) {
      toast.error("Please complete company information and select at least one channel");
      return;
    }

    try {
      setIsSendingWebhook(true);
      
      const selectedChannelNames = Object.keys(selectedChannels)
        .filter(key => selectedChannels[key])
        .map(key => {
          const allChannelArrays = [
            ...channels.trafficSources,
            ...channels.prospectFeed,
            ...channels.retargeting
          ];
          const channel = allChannelArrays.find(c => c.id === key);
          return channel ? channel.name : key;
        });

      const webhookPayload = {
        companyInfo,
        selectedChannels: selectedChannelNames,
        systemScore: Math.round(systemScore),
        timestamp: new Date().toISOString(),
        categoryBreakdown: marketingChannelService.getCategoryBreakdown(selectedChannels, channels)
      };

      await marketingChannelService.sendWebhookData(webhookPayload);
      
      toast.success("Data sent to CRM successfully!");
      
    } catch (err) {
      console.error("Webhook error:", err);
      toast.error("Failed to send data to CRM");
    } finally {
      setIsSendingWebhook(false);
    }
  };

  if (loading) {
    return <Loading message="Loading marketing channels..." />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }

  const categoryBreakdown = marketingChannelService.getCategoryBreakdown(selectedChannels, channels);
  const totalChannels = channels.trafficSources.length + channels.prospectFeed.length + channels.retargeting.length;
  const selectedCount = Object.values(selectedChannels).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-2">StrategyOS</h1>
            <p className="text-gray-600 text-lg">
              Comprehensive Sales & Marketing Operating System
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Company Information */}
        <CompanyInfoForm
          companyInfo={companyInfo}
          onUpdate={handleCompanyInfoUpdate}
          errors={errors}
        />

        {/* Marketing Channels Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Traffic Sources */}
          <MarketingChannelSection
            title="Traffic Sources"
            description="Drive visitors to your website"
            icon="Navigation"
            channels={channels.trafficSources}
            selectedChannels={selectedChannels}
            onToggleChannel={handleToggleChannel}
            onSelectAll={handleSelectAll}
            onReset={handleReset}
          />

          {/* Prospect Feed */}
          <MarketingChannelSection
            title="Prospect Feed"
            description="Track and nurture leads"
            icon="Funnel"
            channels={channels.prospectFeed}
            selectedChannels={selectedChannels}
            onToggleChannel={handleToggleChannel}
            onSelectAll={handleSelectAll}
            onReset={handleReset}
          />

          {/* Retargeting */}
          <MarketingChannelSection
            title="Retargeting"
            description="Re-engage potential customers"
            icon="Target"
            channels={channels.retargeting}
            selectedChannels={selectedChannels}
            onToggleChannel={handleToggleChannel}
            onSelectAll={handleSelectAll}
            onReset={handleReset}
          />
        </div>

        {/* System Score and Actions */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* System Score */}
          <div className="lg:col-span-2">
            <SystemScoreDisplay
              score={systemScore}
              totalChannels={totalChannels}
              selectedChannels={selectedCount}
              categoryBreakdown={categoryBreakdown}
            />
          </div>

          {/* Action Panel */}
          <div>
            <ActionPanel
              onGeneratePDF={handleGeneratePDF}
              onSendWebhook={handleSendWebhook}
              isGeneratingPDF={isGeneratingPDF}
              isSendingWebhook={isSendingWebhook}
canExport={canExport}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;