export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="website-app">
      {children}
    </div>
  )
}