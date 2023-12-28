export default function AlertWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-solid border-warning-300 bg-warning-100 p-4 text-sm leading-5 text-warning-700">
      {children}
    </div>
  );
}
