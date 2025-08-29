import jsPDF from "jspdf";

export const generateStrategyPDF = (companyInfo, selectedChannels, allChannels, systemScore) => {
  const doc = new jsPDF();
  
  // Colors
  const primaryColor = [79, 70, 229]; // Primary blue
  const secondaryColor = [124, 58, 237]; // Purple
  const textColor = [31, 41, 55]; // Gray
  
  // Helper function to add text with color
  const addColorText = (text, x, y, color = textColor, fontSize = 12) => {
    doc.setTextColor(...color);
    doc.setFontSize(fontSize);
    doc.text(text, x, y);
  };
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 220, 40, "F");
  
  addColorText("StrategyOS", 20, 25, [255, 255, 255], 24);
  addColorText("Marketing Channel Assessment Report", 20, 35, [255, 255, 255], 12);
  
  // Company Information Section
  let yPos = 60;
  addColorText("Company Information", 20, yPos, primaryColor, 16);
  yPos += 10;
  
  addColorText(`Company: ${companyInfo.companyName}`, 20, yPos);
  yPos += 8;
  addColorText(`Contact: ${companyInfo.contactName}`, 20, yPos);
  yPos += 8;
  addColorText(`Email: ${companyInfo.contactEmail}`, 20, yPos);
  yPos += 8;
  addColorText(`Phone: ${companyInfo.contactPhone}`, 20, yPos);
  yPos += 20;
  
  // System Score Section
  addColorText("System Score", 20, yPos, primaryColor, 16);
  yPos += 15;
  
  // Score circle background
  doc.setFillColor(243, 244, 246);
  doc.circle(40, yPos + 10, 20, "F");
  
  // Score text
  addColorText(`${Math.round(systemScore)}%`, 32, yPos + 13, primaryColor, 18);
  
  // Score description
  let scoreMessage = "";
  if (systemScore >= 80) scoreMessage = "Excellent marketing coverage!";
  else if (systemScore >= 60) scoreMessage = "Good foundation, room for growth";
  else if (systemScore >= 40) scoreMessage = "Moderate coverage, consider expanding";
  else scoreMessage = "Limited coverage, significant opportunity";
  
  addColorText(scoreMessage, 70, yPos + 8);
  addColorText(`Generated on ${new Date().toLocaleDateString()}`, 70, yPos + 18, [107, 114, 128]);
  
  yPos += 50;
  
  // Selected Channels Section
  addColorText("Selected Marketing Channels", 20, yPos, primaryColor, 16);
  yPos += 15;
  
  // Traffic Sources
  const trafficSources = allChannels.trafficSources.filter(c => selectedChannels[c.id]);
  if (trafficSources.length > 0) {
    addColorText("Traffic Sources:", 20, yPos, secondaryColor, 14);
    yPos += 8;
    
    trafficSources.forEach(channel => {
      addColorText(`• ${channel.name}`, 25, yPos);
      yPos += 6;
    });
    yPos += 10;
  }
  
  // Prospect Feed
  const prospectFeed = allChannels.prospectFeed.filter(c => selectedChannels[c.id]);
  if (prospectFeed.length > 0) {
    addColorText("Prospect Feed:", 20, yPos, secondaryColor, 14);
    yPos += 8;
    
    prospectFeed.forEach(channel => {
      addColorText(`• ${channel.name}`, 25, yPos);
      yPos += 6;
      
      // Check if we need a new page
      if (yPos > 280) {
        doc.addPage();
        yPos = 30;
      }
    });
    yPos += 10;
  }
  
  // Retargeting
  const retargeting = allChannels.retargeting.filter(c => selectedChannels[c.id]);
  if (retargeting.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 30;
    }
    
    addColorText("Retargeting:", 20, yPos, secondaryColor, 14);
    yPos += 8;
    
    retargeting.forEach(channel => {
      addColorText(`• ${channel.name}`, 25, yPos);
      yPos += 6;
      
      if (yPos > 280) {
        doc.addPage();
        yPos = 30;
      }
    });
  }
  
  // Footer
  const totalChannels = allChannels.trafficSources.length + allChannels.prospectFeed.length + allChannels.retargeting.length;
  const selectedCount = Object.values(selectedChannels).filter(Boolean).length;
  
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 280, 220, 20, "F");
  
  addColorText(`Total Selected: ${selectedCount}/${totalChannels} channels`, 20, 290, [107, 114, 128]);
  addColorText("Powered by StrategyOS", 150, 290, [107, 114, 128]);
  
  return doc;
};