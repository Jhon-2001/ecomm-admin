import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mouned, setMounted] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mouned) {
    return "";
  }

  return origin;
};
