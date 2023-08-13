
// import ProgressBar from "@ramonak/react-progress-bar";
import { Chart } from "react-google-charts";

function SprogrssBar({data}) {
  const options = {
    title: "Chat Showing House Type",
  };

  return (
    <>
    {/* <div className="progress_bar">
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
    </div> */}

  <div className="progress_bar">
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  </div>
</>
  );
}

export default SprogrssBar;
