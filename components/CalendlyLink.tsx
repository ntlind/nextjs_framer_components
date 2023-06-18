import { openPopupWidget } from "react-calendly";

export default function CalendlyLink({
  url,
  prefill,
  pageSettings,
  utm,
  text,
  class_style,
}) {
  const onClick = () => openPopupWidget({ url, prefill, pageSettings, utm });

  return (
    <button onClick={onClick} className={class_style}>
      {text}
    </button>
  );
}
