const iconsTable = document.getElementById("iconsTable")


function getSvgFileiconPath() {
  return window.api.getSvgFleiconPath();
}

function add2iconsTable(fileIcon) {
  iconsTable.appendChild(fileIcon.dom)
}

class FileIcon {
  constructor(filePath) {
    this.filePath = filePath
    const img = document.createElement("img")
    img.src = filePath
    img.classList = img.classList + "svg_file_icon"
    this.dom = img
  }
  filePath
  dom
}

getSvgFileiconPath().forEach(e => {
  const fileIcon = new FileIcon(e.path)
  console.log(fileIcon)
  add2iconsTable(fileIcon)
})
