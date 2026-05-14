export default function H2({
  tittle1,
  tittle2,
}: {
  tittle1: string;
  tittle2: string;
}) {
  return (
    <h2 className="mt-6 font-chillax text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
      {tittle1} <br className="hidden lg:block" />
      <span className="text-green">{tittle2}</span>
    </h2>
  );
}
