export default function HTMLRender({ htmlCode }: { htmlCode: string }) {
  return (
    <iframe
      data-testid="rendered-html"
      width="100%"
      height="3000"
      srcDoc={htmlCode}
      className="rounded-md border border-gray-200"
    />
  )
}
