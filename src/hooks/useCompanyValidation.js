import { useState } from "react";

export const useCompanyValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    switch (field) {
      case "companyName":
        return !value.trim() ? "Company name is required" : "";
      case "contactName":
        return !value.trim() ? "Contact name is required" : "";
      case "contactEmail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Please enter a valid email";
        return "";
      case "contactPhone":
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!value.trim()) return "Phone number is required";
        if (!phoneRegex.test(value.replace(/\D/g, ""))) return "Please enter a valid phone number";
        return "";
      default:
        return "";
    }
  };

  const validateAll = (companyInfo) => {
    const newErrors = {};
    
    Object.keys(companyInfo).forEach(field => {
      const error = validateField(field, companyInfo[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSingle = (field, value) => {
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    return !error;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateAll,
    validateSingle,
    clearErrors
  };
};