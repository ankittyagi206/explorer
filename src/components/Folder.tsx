import { useState } from "react";
const Folder = ({
  explorer,
  setExplorerData,
  handleInsertNode,
  handleDeleteNode,
  handleUpdateNode,
}: any) => {
  const [expand, setExpand] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [editInput, setEditInput] = useState(explorer.name);
  const [editFolder, setEditFolder] = useState(explorer.name);
  const [showEditInput, setShowEditInput] = useState(false);
  const handleNewFolder = (
    e: React.SyntheticEvent<EventTarget>,
    isFolder: boolean
  ) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
    setExpand(true);
  };
  const handleDeteFolder = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };
  const addNewFolder = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    handleInsertNode(explorer.id, input, showInput.isFolder);
    setShowInput({ ...showInput, visible: false });
  };
  const handleUpdateFile = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    handleUpdateNode(explorer.id, editInput);
    setShowEdit(false);
  };
  const handleUpdateFolder = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    handleUpdateNode(explorer.id, editFolder);
    setShowEditInput(false);
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: "5px", cursor: "pointer" }}>
        <div
          style={{
            marginTop: "6px",
            backgroundColor: "rgb(233,233,233)",
            display: "flex",
            justifyContent: "space-between",
            padding: "3px",
            width: "300px",
            cursor: "pointer",
          }}
          onClick={() => setExpand((expand) => !expand)}
        >
          <span style={{ margin: "0 5px 2px 5px", display: "flex" }}>
            📁
            {showEditInput ? (
              <form onSubmit={(e) => handleUpdateFolder(e)}>
                <input
                  value={editFolder}
                  onChange={(e) => {
                    e.stopPropagation();
                    setEditFolder(e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                />
              </form>
            ) : (
              explorer.name
            )}
          </span>
          {!showEditInput ? (
            <div style={{ display: "flex" }}>
              <button
                onClick={(e) => handleNewFolder(e, true)}
                style={{
                  fontSize: "12px",
                  background: "white",
                  padding: "5px",
                }}
              >
                Folder +
              </button>
              <button
                onClick={(e) => handleNewFolder(e, false)}
                style={{
                  fontSize: "12px",
                  background: "white",
                  padding: "5px",
                  marginLeft: "5px",
                }}
              >
                File +
              </button>
              <button
                onClick={(e) => handleDeteFolder(e)}
                style={{
                  fontSize: "12px",
                  background: "white",
                  padding: "5px",
                  marginLeft: "5px",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => setShowEditInput(true)}
                style={{
                  fontSize: "12px",
                  background: "white",
                  padding: "5px",
                  marginLeft: "5px",
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <button
              type="submit"
              onClick={(e) => {
                e.stopPropagation();
                handleUpdateFolder(e);
              }}
            >
              Save ✅
            </button>
          )}
        </div>

        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput?.visible && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ marginTop: "5px" }}>
                {showInput.isFolder ? "📁" : "📄"}
              </span>
              <form onSubmit={(e) => addNewFolder(e)}>
                <input
                  type="text"
                  autoFocus
                  style={{
                    margin: "6px 0 0px 0",
                    padding: "5px",
                    display: "flex",
                    border: "1px solid lightgray",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  onChange={(e) => setInput(e.target.value)}
                />
              </form>
            </div>
          )}
          {explorer.items.map((exp: any) => {
            return (
              <Folder
                key={exp.id}
                explorer={exp}
                setExplorerData={setExplorerData}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleUpdateNode={handleUpdateNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span
        style={{
          marginTop: "5px",
          paddingLeft: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ display: "flex" }}>
          📄
          {showEdit ? (
            <>
              <span style={{ display: "flex" }}>
                <form onSubmit={(e) => handleUpdateFile(e)}>
                  <input
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                  <button type="submit">✅</button>
                </form>

                <button onClick={() => setShowEdit(false)}>❌</button>
              </span>
            </>
          ) : (
            <span>
              {explorer.name}
              <button onClick={(e) => handleDeteFolder(e)}>❌</button>
              <button onClick={() => setShowEdit(true)}>🖊</button>
            </span>
          )}
        </span>
      </span>
    );
  }
};
export default Folder;
