import { RotatingLines } from "react-loader-spinner";

function Spinner() {
    return (
        <div className="spinner">
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="60"
                visible={true}
            />
        </div>
    )
}

export default Spinner