import "./index.css";


export const ResumeItem = ({title, value, color}) => {
  return (
    <div className="resume-container">
      <div className="title"> {title}</div>
        <div className="info" style={{ color: color }}>
          R$ {value}
      </div>
    </div>
   
  );
};
