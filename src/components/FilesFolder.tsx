import { useState } from "react";

const FilesFolder = ({ data, setData, isExpanded, setIsExpended }: any) => {
  const [expand, setExapnd] = useState(false);
  const handleDelete = (deleteFolderId: string) => {
    console.log(deleteFolderId);
    const filteredData = data.filter(({ id }: any) => id !== deleteFolderId);
    setData(filteredData);
  };
  return (
    <div>
      {data?.map(({ isFolder, foldername, fileName, data, id }: any) => {
        if (isFolder) {
          return (
            <div>
              <button onClick={() => setIsExpended(!isExpanded)}>
                📁{foldername}
              </button>
              <button onClick={() => handleDelete(id)}>❌</button>
              {expand && data?.length > 0 && (
                <div style={{ marginLeft: "10px" }}>
                  <FilesFolder
                    data={data}
                    setData={setData}
                    isExpanded={isExpanded}
                    setIsExpended={setIsExpended}
                  />
                </div>
              )}
            </div>
          );
        } else {
          return (
            <div>
              🗃{fileName} <button>🖊</button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default FilesFolder;
