export { }

interface svgFileicon{
  path: string
  fileExt:string
}

declare global{
  interface Window{
    api: {
      getSvgFleiconPath():svgFileicon[]
    }
  }
}
