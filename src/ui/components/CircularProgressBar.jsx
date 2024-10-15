import '../../styles/components/_circular-progress-bar.scss';

export default function CircularProgressBar({ percentage }) {
  const accentColor = "#3B82F6";
  const circleStyle = {
    background: `conic-gradient(${accentColor} ${percentage * 3.6}deg, #ededed 0deg)`,
  };

  return (
    <div className="circular-progress-bar" style={circleStyle}>
      <div className="circular-progress-bar-inner-progress" >
        <div className="circular-progress-bar-inner-content">
          <span className="circular-progress-percentage">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};