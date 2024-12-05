import React from "react";
import "./progressCircle.css";

// React component for progress circle
function ProgressCircle({ currentQuestion, totalQuestions }) {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (currentQuestion / totalQuestions) * 100;
  // Offset for starting point of filling the circle with progress
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className="progress-circle"
      width={radius * 2 + strokeWidth}
      height={radius * 2 + strokeWidth}
    >
        {/* Background circle*/}
      <circle
        className="circle-background"
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      {/* Progress circle*/}
      <circle
        className="circle-progress"
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${radius + strokeWidth / 2} ${
            radius + strokeWidth / 2
          })`} // Rotating the progress circle in order to match Figma design
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="progress-text"
      >
        {currentQuestion}/{totalQuestions}
      </text>
    </svg>
  );
}

export default ProgressCircle;