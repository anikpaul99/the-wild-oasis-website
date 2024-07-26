import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

/**
 * Component that include the logo and navigation of the app.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
