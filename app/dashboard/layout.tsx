import SideNav from "@/components/dashboard/layout/side-nav";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <SideNav />
      {children}
    </div>
  );
}
