window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

function errorHandler(e) {
  let msg = "";

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = "QUOTA_EXCEEDED_ERR";
      break;
    case FileError.NOT_FOUND_ERR:
      msg = "NOT_FOUND_ERR";
      break;
    case FileError.SECURITY_ERR:
      msg = "SECURITY_ERR";
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = "INVALID_MODIFICATION_ERR";
      break;
    case FileError.INVALID_STATE_ERR:
      msg = "INVALID_STATE_ERR";
      break;
    default:
      msg = "Unknown Error";
      break;
  }

  console.log("Error: " + msg);
}

export function writeToJSON(filename, data) {
  const size = new TextEncoder().encode(JSON.stringify(data)).length + 1024;
  window.requestFileSystem(
    window.TEMPORARY,
    size,
    (fs) => {
      fs.root.getFile(
        filename,
        { create: true },
        (fileEntry) => {
          fileEntry.createWriter((fileWriter) => {
            fileWriter.onwriteend = () => {
              console.log("Write completed");
              const url =
                "filesystem:chrome-extension://" +
                chrome.i18n.getMessage("@@extension_id") +
                "/temporary/" +
                filename;
              console.log(url);
            };

            fileWriter.onerror = (e) => {
              console.log("Write failed: " + e.toString());
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], {
              type: "application/json",
            });
            fileWriter.write(blob);
          }, errorHandler);
        },
        errorHandler
      );
    },
    errorHandler
  );
}
