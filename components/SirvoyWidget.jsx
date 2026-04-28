"use client";

import Script from "next/script";
import "./SirvoyWidget.css";

export default function SirvoyWidget() {
  return (
    <Script
      src="https://secured.sirvoy.com/widget/sirvoy.js"
      strategy="lazyOnload" // Cambiado a lazyOnload para asegurar que el DOM esté listo
      data-form-id="9244781f250d82cb"
    />
  );
}
