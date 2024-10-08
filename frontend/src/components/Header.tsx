import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

const Header = () => {
  return(
    <div className="border-b-2 border-b-orange-500 py-6">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-3x font-bold tracking-tight text-orange-500">
                MernEats.com
            </Link>
            <div className="md:hidden">
              <MobileNav /> 
               {/* hidden after screen becomes big, and shows up when then screen becomes smaller  */}
            </div>
        </div>
    </div>
  )
}

export default Header;