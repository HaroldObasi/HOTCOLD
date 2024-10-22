import {Github} from "lucide-react";

const Footer = () => {
  const devsList: {name: string; github: string}[] = [
    {
      name: "Harold",
      github: "https://github.com/HaroldObasi"
    },
    {
      name: "Alex",
      github: "https://github.com/alexshumteru"
    },
    {
      name: "Prasad",
      github: "https://github.com/PrasadBroo"
    },
    {
      name: "Dundee",
      github: "https://github.com/DundeeA"
    }
  ];

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(4deg, rgba(0,0,0,0.3) 80%, transparent 80%)"
      }}
    >
      <div className="text-center text-white mx-auto max-w-6xl">
        <div className="pt-60 md:pt-48 pb-16 front-denk">
          <h2 className="text-4xl lg:text-5xl">Contributors</h2>
          <div className="pb-12" />
          <div className="flex flex-col justify-center px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 justify-items-center">
              {devsList.map((dev) => {
                return (
                  <a
                    className="flex items-center text-xl lg:text-2xl gap-x-2 hover:underline"
                    key={`${dev}`}
                    href={dev.github}
                    target="_blank"
                  >
                    <Github />
                    {dev.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="py-16 max-w-5xl mx-auto">
          <p className="font-mono text-md lg:text-lg opacity-[30%]">
            The owner of this site is not responsible for any user generated
            content (messages, usernames)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
