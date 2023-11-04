import './Background.css';

type BackgroundProp = {
  children?: React.ReactNode;
  className?: string;
};

const Background = ({children, className}: BackgroundProp) => {
  return (
    <div className={`gradient-layer ${className}`}>
      <div className="dots-layer h-full">
        <div className="blur-layer">{children}</div>
      </div>
    </div>
  );
};

export default Background;