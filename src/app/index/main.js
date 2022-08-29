const iconsTable = document.getElementById("iconsTable")
const search = document.getElementById("search")

function getSvgFileiconPath() {
  return window.api.getSvgFleiconPath();
}

function add2iconsTable(fileIcon) {
  iconsTable.appendChild(fileIcon.dom)
}

class FileIcon {
  constructor(svgIcon) {
    const iconDisplay = document.createElement("div")
    const fileExtName = document.createElement("div")
    const img = document.createElement("img")
    this.fileExt = svgIcon.fileExt
    this.filePath = svgIcon.path

    iconDisplay.className = iconDisplay.className + "icon_display"

    img.src = svgIcon.path
    img.classList = img.classList + "svg_file_icon"

    fileExtName.textContent = `.${svgIcon.fileExt}`
    fileExtName.className = 'file_ext_display'

    iconDisplay.appendChild(img)
    iconDisplay.appendChild(fileExtName)
    this.dom = iconDisplay
    this.dom.dataset.fileExt = svgIcon.fileExt
    iconDisplay.addEventListener('click', () => {
      openRegeditWindow(svgIcon)
    })
  }
  fileExt
  filePath
  dom
}

getSvgFileiconPath().forEach(e => {
  const fileIcon = new FileIcon(e)
  add2iconsTable(fileIcon)
})

function openRegeditWindow(svgIcon) {
  window.api.openRegeditWindow(svgIcon)
}

search.addEventListener('input', event => {
  iconsTable.childNodes.forEach(e => {
    if (e.dataset.fileExt.match(event.target.value)) {
      e.style.display = 'flex'
    } else {
      e.style.display = 'none'
    }
  })
})
