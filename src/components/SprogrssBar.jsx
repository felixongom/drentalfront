
import ProgressBar from "@ramonak/react-progress-bar";
function SprogrssBar({data}) {
  return (
    <div className="progress_bar">
       {data.map((item)=>(
       <div>
        <span className="progressbar_lable">{item.type}</span>
        <ProgressBar key={item.type}
         completed={item.value} 
         bgColor={item.color}
         height={12}
         />
        <br />
       </div>

       ))} 
    </div>
  );
}

export default SprogrssBar;
