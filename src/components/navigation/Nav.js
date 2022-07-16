import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import '../../styles/app.scss';

const Nav = ({currentLocation, currentTemperature}) => {
    return (
        <nav className="nav">
            <LeftSide currentLocation={currentLocation} currentTemperature={currentTemperature}></LeftSide>
            <RightSide></RightSide>
        </nav>
    )
}

export default Nav;