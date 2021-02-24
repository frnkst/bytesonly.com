export default function PageTitle({ children }) {
  return (
    <>
      <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        {children}
      </h1>
      <div className="text-code-red invisible"></div>
      <div className="text-code-yellow invisible"></div>
      <div className="text-code-green invisible"></div>
      <div className="text-code-red invisible"></div>
      <div className="text-code-green invisible"></div>
      <div className="text-code-white invisible"></div>
      <div className="text-code-purple invisible"></div>
      <div className="text-code-blue invisible"></div>
      <div className="text-gray-400 italic invisible"></div>
    </>
  )
}
