export const LibraShape = () => {
  // Example array of icon data
  const iconData = [
    { cx: 0, cy: 0, r: 20, fill: "blue", text: "Icon 1" },
    { cx: 50, cy: 50, r: 15, fill: "red", text: "Icon 2" },
    // Add more icon data as needed
  ];

  return (
    <svg width="400" height="400">
      <path
        d="M 100 200 q 150 -300 300 0"
        stroke="gray"
        strokeWidth="5"
        fill="none"
      />
      {/* Dynamically render the icons */}
      {iconData.map((icon, index) => (
        <g key={index} transform={`translate(${icon.cx}, ${icon.cy})`}>
          <circle cx="0" cy="0" r={icon.r} fill={icon.fill} />
          <text x="-8" y="6" fontSize="12" fill="white" textAnchor="middle">
            {icon.text}
          </text>
        </g>
      ))}
    </svg>
  );
};
