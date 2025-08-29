import React from "react";
import SectionHeader from "@/components/molecules/SectionHeader";
import IconCard from "@/components/molecules/IconCard";
import { cn } from "@/utils/cn";

const MarketingChannelSection = ({ 
  title, 
  description,
  icon,
  channels, 
  selectedChannels, 
  onToggleChannel,
  onSelectAll,
  onReset,
  className 
}) => {
  const selectedCount = channels.filter(channel => selectedChannels[channel.id]).length;
  
  return (
    <div className={cn(
      "bg-white rounded-2xl p-8 shadow-xl border border-gray-100",
      className
    )}>
      <SectionHeader
        icon={icon}
        title={title}
        description={description}
        count={selectedCount}
        total={channels.length}
        onSelectAll={() => onSelectAll(channels.map(c => c.id))}
        onReset={() => onReset(channels.map(c => c.id))}
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {channels.map((channel) => (
          <IconCard
            key={channel.id}
            icon={channel.icon}
            title={channel.name}
            isSelected={selectedChannels[channel.id]}
            onClick={() => onToggleChannel(channel.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketingChannelSection;