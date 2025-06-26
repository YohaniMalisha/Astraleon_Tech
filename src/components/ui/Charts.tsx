export const PieChart = () => (
  <div className="relative w-64 h-64 mx-auto">
    {/* SVG Pie Chart Implementation */}
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#34b5d2" strokeWidth="10" strokeDasharray="70 30" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="#089feb" strokeWidth="10" strokeDasharray="30 70" transform="rotate(-90 50 50)" />
    </svg>
  </div>
);

export const BarChart = ({ data }) => (
  <div className="space-y-4">
    {data.map((item) => (
      <div key={item.name}>
        <div className="flex justify-between mb-1">
          <span>{item.name}</span>
          <span>{item.percentage}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full" 
            style={{ width: `${item.percentage}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);