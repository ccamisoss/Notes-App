export default function Note({ title, children }) {
  return (
    <div className="h-32 p-4 bg-white rounded-lg shadow space-y-2">
      {title && <h3 className="font-semibold text-lg">{title}</h3>}
      {children}
    </div>
  );
}
