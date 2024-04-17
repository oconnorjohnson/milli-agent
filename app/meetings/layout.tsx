import SideNav from "@/components/meetings/layout/side-nav";
export default function MeetingsLayout({
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
