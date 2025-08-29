import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  error, 
  className,
  required = false,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      <Input error={!!error} {...props} />
      {error && (
        <p className="text-error text-sm font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;