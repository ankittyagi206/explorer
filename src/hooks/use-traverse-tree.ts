const useTraverseTree = () => {
  function insertNode(
    tree: any,
    folderId: string,
    item: [],
    isFolder: boolean
  ) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    //DFS
    let latestNode = [];
    latestNode = tree.items.map((obj: any) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }
  const deleteNode = (tree: any, nodeId: string): any => {
    // Check if the current node is the one to be deleted
    if (tree.id === nodeId) {
      return null; // Remove the node by returning null
    }

    // Recursively search for the node to be deleted in child nodes
    const updatedItems = tree.items.map((childNode: any) =>
      deleteNode(childNode, nodeId)
    );

    // Remove any null values from the updated child nodes
    const filteredItems = updatedItems.filter(
      (childNode: any) => childNode !== null
    );

    return {
      ...tree,
      items: filteredItems,
    };
  };

  const updateNode = (tree: any, nodeId: string, newName: string): any => {
    // Check if the current node is the one to be updated
    if (tree.id === nodeId) {
      return {
        ...tree,
        name: newName, // Update the name property with the new name
      };
    }

    // Recursively search for the node to be updated in child nodes
    const updatedItems = tree.items.map((childNode: any) =>
      updateNode(childNode, nodeId, newName)
    );

    return {
      ...tree,
      items: updatedItems,
    };
  };
  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
