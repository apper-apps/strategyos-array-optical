import { useState, useEffect } from "react";
import marketingChannelService from "@/services/api/marketingChannelService";

export const useMarketingChannels = () => {
  const [channels, setChannels] = useState({
    trafficSources: [],
    prospectFeed: [],
    retargeting: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadChannels = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await marketingChannelService.getAllChannels();
      setChannels(data);
    } catch (err) {
      setError("Failed to load marketing channels");
      console.error("Error loading channels:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  return {
    channels,
    loading,
    error,
    refetch: loadChannels
  };
};