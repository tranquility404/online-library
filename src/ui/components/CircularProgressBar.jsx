import '../../styles/components/_circular-progress-bar.scss';

export default function CircularProgressBar({ percentage }) {
  // #4d5bf9
  const circleStyle = {
    background: `conic-gradient(var(--accent-color) ${percentage * 3.6}deg, #ededed 0deg)`,
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