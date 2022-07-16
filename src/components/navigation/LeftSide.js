import Location from "../Location";
import Temperature from "../Temperature";

const LeftSide = ({currentLocation, currentTemperature}) => {
    return (
        <div className="leftSide">
            <Location currentLocation={currentLocation}></Location>
            <Temperature currentTemperature={currentTemperature}></Temperature>
        </div>
    )
}

export default LeftSide;