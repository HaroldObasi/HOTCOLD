type BackgroundProp = {
    children?: React.ReactNode; 
}

const Background = ({children}:BackgroundProp) => {
  return (
    <div style={
      {
        background: "linear-gradient(105deg, rgba(0,224,255,1) 0%, rgba(255,183,116,1) 100%)"
      }
    }>
      <div style={
        {
          backgroundImage: "radial-gradient(circle at 12px 12px, rgba(168, 234, 254, 0.5) 12px, transparent 0)",
          backgroundSize: "48px 48px"
        }
      }>
          <div style={{backdropFilter: "blur(2px)"}}>
            {children}
          </div>
      </div>
    </div>
  )
}

export default Background;


// body {
//     background-image: radial-gradient(circle at 1px 1px, black 1px, transparent 0);
//     background-size: 40px 40px;
//   }background: rgb(0,224,255);
//background: linear-gradient(103deg, rgba(0,224,255,1) 0%, rgba(255,183,116,1) 100%);