import { useState } from "react";

const LineClampedDescription = ({ description }) => {
  const lines = description.split("\n").filter(line => line.trim() !== "");
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p className={`mb-2 text-gray-700 ${!expanded ? 'line-clamp-2' : ''}`}>
        {lines}
      </p>
      {description.split(" ").length > 15 && (
        <button
          className="text-sm font-medium text-blue-600 hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};
export default LineClampedDescription;