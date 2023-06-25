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
    _e: React.SyntheticEvent<EventTarget>,
    isFolder: boolean
  ) => {
    _e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
    setExpand(true);
  };
  const handleDeteFolder = (_e: React.SyntheticEvent<EventTarget>) => {
    _e.stopPropagation();
    handleDeleteNode(explorer.id);
  };
  const addNewFolder = (_e: React.SyntheticEvent<EventTarget>) => {
    _e.preventDefault();
    handleInsertNode(explorer.id, input, showInput.isFolder);
    setShowInput({ ...showInput, visible: false });
  };
  const handleUpdateFile = (_e: React.SyntheticEvent<EventTarget>) => {
    _e.preventDefault();
    handleUpdateNode(explorer.id, editInput);
    setShowEdit(false);
  };
  const handleUpdateFolder = (_e: React.SyntheticEvent<EventTarget>) => {
    _e.stopPropagation();
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
              <form onSubmit={(_e) => handleUpdateFolder(_e)}>
                <input
                  value={editFolder}
                  onChange={(_e) => {
                    _e.stopPropagation();
                    setEditFolder(_e.target.value);
                  }}
                  onClick={(_e) => _e.stopPropagation()}
                  onFocus={(_e) => _e.stopPropagation()}
                />
              </form>
            ) : (
              explorer.name
            )}
          </span>
          {!showEditInput ? (
            <div style={{ display: "flex" }}>
              <button
                onClick={(_e) => handleNewFolder(_e, true)}
                style={{
                  fontSize: "12px",
                  background: "white",
                  padding: "5px",
                }}
              >
                Folder +
              </button>
              <button
                onClick={(_e) => handleNewFolder(_e, false)}
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
                onClick={(_e) => handleDeteFolder(_e)}
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
              onClick={(_e) => {
                _e.stopPropagation();
                handleUpdateFolder(_e);
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
              <form onSubmit={(_e) => addNewFolder(_e)}>
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
                  onChange={(_e) => setInput(_e.target.value)}
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
                <form onSubmit={(_e) => handleUpdateFile(_e)}>
                  <input
                    value={editInput}
                    onChange={(_e) => setEditInput(_e.target.value)}
                  />
                  <button type="submit">✅</button>
                </form>

                <button onClick={() => setShowEdit(false)}>❌</button>
              </span>
            </>
          ) : (
            <span>
              {explorer.name}
              <button onClick={(_e) => handleDeteFolder(_e)}>❌</button>
              <button onClick={() => setShowEdit(true)}>🖊</button>
            </span>
          )}
        </span>
      </span>
    );
  }
};
export default Folder;
