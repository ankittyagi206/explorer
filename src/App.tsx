import Folder from "./components/Folder";
import { explorer } from "./data/folderData";
import { useState } from "react";
import useTraverseTree from "./hooks/use-traverse-tree";

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
