import { useEffect, useState } from "react";
import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

import "./scss/sidenav.scss";
import { useStateContext } from "../assets/js/Context";
import SuserDetail from "../components/Suserdetails";
import { Sadmin } from "../assets/js";
import ShouseData from "../components/ShouseData";
import Shousephotos from "../components/ShousPhotes";
import LoadingIndicator from "../components/LoadingIndicator";
import { toast } from "react-hot-toast";

function ShouseDetails() {
  const { showSideBar, sinstance } = useStateContext();

  const [singleHouse, setsingleHouse] = useState(null);
  const [houseOwer, setHouseOwer] = useState({});
  const [deleteNotifier, setDeleteNotifier] = useState(0);

  const { Hid, Uid } = useParams();

  // fetch single house and fetch single user

  useEffect(() => {
    sinstance.get(`/api/house/${Hid}`).then((res) => setsingleHouse(res.data));

    sinstance
      .get(`/api/user/user/${Uid}`)
      .then((res) => setHouseOwer(res.data));
  }, [Hid, Uid, sinstance]);

  // deleting photes of the houses
  const deletePhoto = async (name) => {
    // indexOf()
    const _name = name.slice(name.indexOf("/IMAGE") + 1);
    const res = await sinstance.delete(`/api/modify/image/${Hid}/${_name}`);
    if (res.status === 200) {
      toast("deleted");
      setDeleteNotifier(deleteNotifier + 1);
    } else {
      toast("tere was an error");
    }
  };

  if (!singleHouse) return <LoadingIndicator />;
console.log(houseOwer);
console.log(Uid);
  return (
    <div className="content">
      {!singleHouse && houseOwer && <LoadingIndicator />}
      {showSideBar && <SideBar admin={Sadmin} />}

      <div className="dashboard_body">
        <Navbar navHeader={"House Details"} />

        <SuserDetail data={houseOwer} />
        <ShouseData data={singleHouse} />
        <Shousephotos
          deletePhoto={deletePhoto}
          data={singleHouse ? singleHouse.images : []}
        />
      </div>
    </div>
  );
}

export default ShouseDetails;
