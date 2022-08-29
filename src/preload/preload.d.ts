export { }

interface svgFileicon{
  path: string
  fileExt:string
}

declare global{
  interface Window{
    api: {
      getSvgFleiconPath(): svgFileicon[]
      openRegeditWindow(): void
      getSvgInfo(): Promise<svgFileicon>
      saveIco(string): Promise<any>
      close():void
    }
  }
}
