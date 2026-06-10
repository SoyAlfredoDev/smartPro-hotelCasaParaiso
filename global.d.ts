import type { KlapInitOptions } from "@/lib/klap/types";

declare global {
  interface Window {
    KLAP?: {
      init: (options?: KlapInitOptions) => void;
    };
  }
}

export {};
