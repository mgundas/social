"use client";
import React, { useEffect, useRef } from "react";

type NotificationProps = {
  children: React.ReactNode;
  type: "warning" | "error" | "success";
  onClose: () => void;
};

const types = {
  warning: "bg-yellow-500 border-yellow-600 text-black",
  error: "bg-red-800 border-red-900 text-white",
  success: "bg-green-800 border-green-900 text-white",
};

type TypeKey = keyof typeof types;

const Notification = ({ children, type, onClose }: NotificationProps) => {
  const notifRef = useRef<HTMLDivElement>(null);
  const safeType = type as TypeKey;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      ref={notifRef}
      className={`border-1 px-3 p-2 rounded-sm flex justify-between items-center ${types[safeType]}`}
    >
      {children}
    </div>
  );
};

export default Notification;
