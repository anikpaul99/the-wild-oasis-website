import SideNavigation from "@/app/_components/SideNavigation";

/**
 * The nested layout which will be applied to '/account', '/account/reservations', /account/profile' segments.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
