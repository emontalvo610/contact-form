export default function AlertWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 text-sm leading-5 text-warning-700 bg-warning-100 border border-solid rounded-xl border-warning-300">
      {children}
    </div>
  )
}