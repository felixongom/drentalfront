import { useEffect, useState } from "react";
import ClientNavbar from "../components/ClientNavbar";
import LoadingIndicator from "../components/LoadingIndicator";
import { useParams, Link } from "react-router-dom";
import { useStateContext } from "../assets/js/Context";
import { useClientContext } from "../assets/js/ClientContext";
import { FiActivity } from "react-icons/fi";

function Details() {
  const { instance } = useStateContext();
  const { addViews } = useClientContext();

  const { Hid } = useParams();
  const [house, setHouse] = useState(null);
  const [toggle, setTogle] = useState(true);
  const [largeImage, setLargeImage] = useState("");

  addViews(Hid);
  // add view fuction called

  useEffect(() => {
    instance.get(`/api/house/${Hid}`).then((res) => setHouse(res.data));
  }, [instance, Hid]);

 

  let i = house?.images?.[0];

  if (!house) return <LoadingIndicator />;
  // putting large image
  const imglg = largeImage ? largeImage : i;

  return (
    <div>
      {!house && <LoadingIndicator />}
      <ClientNavbar  page= {'detailPage'}/>
      <div className=" mt-20 p-1 images_detail sm:mr-2 sm:ml-2  md:mr-10 md:ml-10 lg:mr-20 lg:ml-20 ">
        <Link to="/" className="pt-1 pb-1 pl-5 pr-5 bg-black text-white">
          Back
        </Link>
        <div className="lg:flex gap-1  md:block mt-3">
          <div className="lg:w-1/2" style={{ height: 300 }}>
            <img className="w-full h-full" src={house ? imglg : "ks"} alt="" />
            <div className=" h-1/4 overflow-x-auto flex">
              {house
                ? house?.images?.map((img, i) => (
                    <img
                      key={i}
                      className={`h-full`}
                      src={img}
                      alt=""
                      width={80}
                      onClick={() => setLargeImage(img)}
                    />
                  ))
                : ""}
            </div>
          </div>
          <div>
            <div className="pl-5 ml-5 mt-20 md:mt-20 md:px-0 lg:mt-0 lg:px-0">
              <div className="flex py-0 gap-5" style={{ width: 300 }}>
                <button
                  onClick={() => setTogle(true)}
                  className={`bg-black text-white border-2 px-5 border-black ${
                    toggle === false && "bg-white text-black"
                  }`}
                  style={{ color: !toggle && "black" }}
                >
                  Addres
                </button>
                <button
                  onClick={() => setTogle(false)}
                  className={`border-2 px-5 border-black ${
                    toggle && "bg-white text-black"
                  }`}
                >
                  Others
                </button>
              </div>
              {toggle && (
                <div>
                  <h1 className="capitalize font-bold text-lg text-cyan-500">
                    {house?.name}{" "}
                    {house?.type && (
                      <small className="bg-orange-500 px-2 rounded text-sm text-black ">
                        {house?.type}
                      </small>
                    )}
                  </h1>
                  {house?.address?.region && (
                    <h3 className="capitalize font-bold">
                      {house?.address?.region} region
                    </h3>
                  )}
                  {house?.address?.district && (
                    <h3 className="capitalize font text-orange-500">
                      {house?.address?.district} district
                    </h3>
                  )}
                  {house?.address?.town && (
                    <h3 className="capitalize text-sm px-2 rounded-md bg-black  text-white italic">
                      {house?.address?.town} city/town
                    </h3>
                  )}

                  {house?.address?.subcounty && (
                    <h3 className="capitalize text-sm font-bold text-gray-700">
                      {house?.address?.subcounty} subcounty
                    </h3>
                  )}

                  {house?.address?.parish && (
                    <h3 className="capitalize text-sm font-bold text-gray-900 ">
                      {house?.address?.parish} parish/word
                    </h3>
                  )}

                  {house?.address?.village && (
                    <h3 className="capitalize text-sm  text-teal-700 ">
                      {house?.address?.village} vilage/shell
                    </h3>
                  )}

                  {house?.address?.street && (
                    <h3 className="capitalize text-sm  text-teal-700 ">
                      {house?.address?.street} street
                    </h3>
                  )}
                </div>
              )}

              {toggle === false && (
                <div className="pl-4">
                  <p className="font-bold text-gray-300 capitalize  text-sm pt-5">
                    service
                  </p>
                  <div>
                    {house?.services &&
                      house?.services?.map((service, i) => (
                        <div key={i} className="sevices" index={i}>
                          <FiActivity />
                          <div>
                            <div>{service?.service}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div>
                    {house &&
                      house?.phone &&
                      house?.phone?.map((p, i) => (
                        <div key={i}>
                          <h1 className="px-2 mt-1 bg-black text-white mx-1">
                            phone{1 + i}:: {p}
                          </h1>
                        </div>
                      ))}
                  </div>
                  <div className="font-bold text-gray-300 capitalize  text-sm pt-5">
                    prices
                    <div>
                      {house &&
                        house?.prices &&
                        house?.prices?.map((p, i) => (
                          <div key={i}>
                            <h1 className="px-2 mt-1 bg-orange-800 capitalize shadow-md text-white mx-1">
                              prices{1 + i}:: {p?.price1} /per {p?.per1}
                            </h1>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      {house?.likes} {house?.likes <= 1 ? "Like" : " Likes"}
                    </div>
                    <div>
                      {house?.views ? house?.views : 0}{" "}
                      {house?.views <= 1 ? "View" : " Views"}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* description */  }
            {house.description && 
            <div className="ml-10 bg-gray-100 p-3 my-5">
              <h2 className="font-semibold text-gray-800 underline">More Description</h2>
              <h1 className="bg-gray-100 pt3 italic t">{house.description}</h1>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
