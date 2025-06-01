import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

/**
 * Component that include the logo and navigation of the app.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function Header() {
  return (
    <header className="border-b border-primary-900 lg:px-8 lg:py-5 md:px-6 md:py-4 px-5 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto sm:flex-row flex-col">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
