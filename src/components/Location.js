const Location = ({currentLocation}) => {
    return (
        <div className="location">
            <i className="icon">i</i>
            <div className="text">{currentLocation}</div>
        </div>
    )
}

export default Location;