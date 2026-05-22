import { Section, Text } from "@react-email/components";

interface DetailRowProps {
  label: string;
  value: string;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Section className="mb-4">
      <Text className="text-brand-muted text-[11px] font-semibold uppercase tracking-wide m-0 mb-1">
        {label}
      </Text>
      <Text className="text-brand-dark text-[15px] font-medium leading-snug m-0">
        {value}
      </Text>
    </Section>
  );
}
