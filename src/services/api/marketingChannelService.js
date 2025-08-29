import marketingChannelsData from "@/services/mockData/marketingChannels.json";

class MarketingChannelService {
  async getAllChannels() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      ...marketingChannelsData
    };
  }

  async getChannelsByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return marketingChannelsData[category] || [];
  }

  calculateSystemScore(selectedChannels, allChannels) {
    const totalChannels = 
      allChannels.trafficSources.length + 
      allChannels.prospectFeed.length + 
      allChannels.retargeting.length;
    
    const selectedCount = Object.values(selectedChannels).filter(Boolean).length;
    
    return (selectedCount / totalChannels) * 100;
  }

  getCategoryBreakdown(selectedChannels, allChannels) {
    const trafficSources = allChannels.trafficSources.filter(
      channel => selectedChannels[channel.id]
    ).length;
    
    const prospectFeed = allChannels.prospectFeed.filter(
      channel => selectedChannels[channel.id]
    ).length;
    
    const retargeting = allChannels.retargeting.filter(
      channel => selectedChannels[channel.id]
    ).length;

    return {
      trafficSources,
      prospectFeed,
      retargeting
    };
  }

  async sendWebhookData(payload) {
    // Simulate webhook sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Webhook payload:", payload);
    
    // Simulate 90% success rate
    if (Math.random() > 0.1) {
      return { success: true, message: "Data sent successfully" };
    } else {
      throw new Error("Webhook delivery failed");
    }
  }
}

export default new MarketingChannelService();