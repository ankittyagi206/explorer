import FilesFolder from "./components/FilesFolder";
import Folder from "./components/Folder";
import { explorer } from "./data/folderData";
import { useState } from "react";
import useTraverseTree from "./hooks/use-traverse-tree";
const mockdata = [
  {
    id: "1",
    foldername: "node_modules",
    isExpended: true,
    data: [
      {
        id: "5",
        foldername: "NestedFolder",
        isExpended: true,
        isFolder: true,
        data: [
          {
            isFolder: false,
            fileName: "app.js",
            id: "6",
          },
          {
            isFolder: false,
            fileName: "index.js",
            id: "7",
          },
        ],
      },
      {
        isFolder: false,
        fileName: "app.js",
        id: "6",
      },
      {
        isFolder: false,
        fileName: "index.js",
        id: "7",
      },
    ],
    isFolder: true,
  },
  {
    id: "2",
    fileName: "app.js",
    isExpended: true,
    isFolder: false,
  },
  {
    id: "3",
    foldername: "src",
    isExpended: true,
    data: [
      {
        isFolder: false,
        id: "8",
        fileName: "index.js",
      },
    ],
    isFolder: true,
  },
  {
    id: 4,
    isFolder: false,
    fileName: "package.json",
  },
];
const App = () => {
  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (folderId: string, item: [], isFolder: boolean) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  const handleDeleteNode = (folderId: string) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };

  const handleUpdateNode = (folderId: string, newName: string) => {
    const finalTree = updateNode(explorerData, folderId, newName);
    setExplorerData(finalTree);
  };

  const [explorerData, setExplorerData] = useState(explorer);

  return (
    <div>
      <Folder
        explorer={explorerData}
        setExplorerData={setExplorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateNode={handleUpdateNode}
      />
    </div>
  );
};
export default App;
