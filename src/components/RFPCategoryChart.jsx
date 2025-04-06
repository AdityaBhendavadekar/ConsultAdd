import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const colors = [
  "#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe",
  "#d946ef", "#ec4899", "#f43f5e", "#f97316", "#facc15"
];

const RFPCategoryChart = ({ data }) => {
  // Group categories (e.g., merging duplicates like "Risk Analysis")
  const groupedData = data.reduce((acc, item) => {
    const existing = acc.find(d => d.category === item.category);
    if (existing) {
      existing.len += item.len;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={groupedData} margin={{ left: 60, right: 30 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="category" />
          <Tooltip />
          <Bar dataKey="len" fill="#6366f1">
            {groupedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RFPCategoryChart;
