export default function ErrorMessage({ message }: { message?: string }) {
  return <p className="mt-2 text-xs text-red-500">{message || null}</p>
}
