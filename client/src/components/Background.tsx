import './Background.css';

type BackgroundProp = {
    children?: React.ReactNode; 
}

const Background = ({children}:BackgroundProp) => {
  return (
    <div className='gradient-layer'>
      <div className='dots-layer'>
          <div className='blur-layer'>
            {children}
          </div>
      </div>
    </div>
  )
}

export default Background;