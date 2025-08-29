import React from "react";
import FormField from "@/components/molecules/FormField";
import { cn } from "@/utils/cn";

const CompanyInfoForm = ({ 
  companyInfo, 
  onUpdate, 
  errors = {},
  className 
}) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...companyInfo,
      [field]: value
    });
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl p-8 shadow-xl border border-gray-100",
      className
    )}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text">Company Information</h2>
        <p className="text-gray-600 mt-2">Enter your company details to get started</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Company Name"
          value={companyInfo.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          placeholder="Enter your company name"
          error={errors.companyName}
          required
        />
        
        <FormField
          label="Contact Name"
          value={companyInfo.contactName}
          onChange={(e) => handleChange("contactName", e.target.value)}
          placeholder="Enter contact person name"
          error={errors.contactName}
          required
        />
        
        <FormField
          label="Contact Email"
          type="email"
          value={companyInfo.contactEmail}
          onChange={(e) => handleChange("contactEmail", e.target.value)}
          placeholder="Enter email address"
          error={errors.contactEmail}
          required
        />
        
        <FormField
          label="Contact Phone"
          type="tel"
          value={companyInfo.contactPhone}
          onChange={(e) => handleChange("contactPhone", e.target.value)}
          placeholder="Enter phone number"
          error={errors.contactPhone}
          required
        />
      </div>
    </div>
  );
};

export default CompanyInfoForm;