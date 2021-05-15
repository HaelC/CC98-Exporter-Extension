export function writeToFile(filename, fileFormat, data) {
  const fullFilename = filename + "." + fileFormat;
  if (fileFormat === "json") {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    // https://stackoverflow.com/a/66968249
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fullFilename;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}
