declare global {
  interface Window {
    KLAP_FLEX: {
      init: (config: { orderId: string }) => void;
    };
  }
}
export {};
