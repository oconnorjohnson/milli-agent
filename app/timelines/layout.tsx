import SideNav from "@/components/timelines/side-nav";
export default function TimelinesLayout({
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
