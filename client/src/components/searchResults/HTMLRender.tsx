export default function HTMLRender({ htmlCode }: { htmlCode: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlCode }}
      className="rounded-md border border-gray-200 p-6"
    ></div>
  )
}
