import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "input-focus w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        error && "border-error focus:border-error focus:ring-error",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;