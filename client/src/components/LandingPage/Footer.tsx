const Footer = () => {
  
  const devsList: string[] = ["Developer A", "Developer B", "Developer C", "Developer D", "Developer E", "Developer F"];

  return (
    <div className='text-center mx-auto max-w-5xl'>
      <div className='py-16 front-denk'>
        <h2 className='text-white text-4xl lg:text-5xl'>
          Developers
        </h2>
        <div className="pb-12"/>
        <div className="flex flex-col justify-center px-6">
          <div className="text-black text-3xl lg:text-4xl grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10">
            {devsList.map((dev) => {
              return <div key={`${dev}`}>{dev}</div>
            })}
          </div>
        </div>
      </div>
      <div className='py-16 max-w-4xl mx-auto'>
        <p className='font-mono text-black text-l lg:text-xl'>
          The owner of this site is not responsible for any user generated content (messages, usernames)
        </p>
      </div>
    </div>
  )
}

export default Footer