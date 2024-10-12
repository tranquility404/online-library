import "../../styles/components/_horizontal-progressbar.scss";

export default function HorizontalProgressBar({ percentage }) {
    return (
        <div className="horizontal-progressbar">
            <div
                style={{ width: `${percentage}%`}}
                className="progress-bar"
                id="progress-bar">
            </div>
        </div>
    )
}