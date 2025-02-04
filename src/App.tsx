import { useState } from "react";
import "./App.css";

const files = {
  children: [
    {
      name: "src",
      children: [
        {
          name: "App.tsx",
          children: [{ name: "App.css" }, { name: "index.css" }],
        },
      ],
    },
    { name: "assets" },
    { name: "components", children: [{ name: "title.tsx" }, { name: "header.tsx" }] },
    { name: "pages" },
  ],
};

interface EntryProps {
  name: string;
  children?: EntryProps[];
}

function RenderFatherFile({ fatherFile, depth }: { fatherFile: EntryProps; depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {fatherFile.children ? (
        <button
          style={{ background: "none", padding: 0 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "-" : "+"} {fatherFile.name}
        </button>
      ) : (
        <div>{fatherFile.name}</div>
      )}

      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {fatherFile.children?.map((child) => (
            <RenderFatherFile fatherFile={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      {files.children.map((fileName) => (
        <RenderFatherFile fatherFile={fileName} depth={1} />
      ))}
    </div>
  );
}

export default App;
