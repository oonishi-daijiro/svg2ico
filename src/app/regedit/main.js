// レジストリ編集無理です。仕様がクソすぎます。

window.onload = async () => {
  const applyButton = document.createElement('div')
  const iconDisplay = document.getElementById('iconDisplay')
  const svgIcon = await window.api.getSvgInfo()
  const img = document.createElement('img')
  const fileExtDisplay = document.createElement('div')
  const columnContainer = document.createElement('div')
  applyButton.id = 'applyButton'
  fileExtDisplay.className = 'file_ext_display'
  columnContainer.className = 'columnContainer'
  applyButton.textContent = "Save"
  img.src = svgIcon.path
  img.classList = 'svg_icon'
  iconDisplay.appendChild(img)
  fileExtDisplay.textContent = `.${svgIcon.fileExt}`
  columnContainer.appendChild(fileExtDisplay)
  columnContainer.appendChild(applyButton)
  iconDisplay.appendChild(columnContainer)
  applyButton.addEventListener('click', () => {
    window.api.saveIco(svgIcon.path).then(e => {
      window.api.close()
    })
  })
}
