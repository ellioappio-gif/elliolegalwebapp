import { ProtectedRoute } from '@/app/auth/ProtectedRoute'

export default function WebappLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="webapp">
        {children}
      </div>
    </ProtectedRoute>
  )
}