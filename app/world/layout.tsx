import SideNav from "@/components/dashboard/world/side-nav";
export default function WorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <SideNav />
      <div className="flex-1 overflow-auto p-8">{children}</div>
    </div>
  );
}
