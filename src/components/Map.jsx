import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
// import "./map.css";

// import icon from "../assets/images/marker-icon.png";
// import iconRetina from "../assets/images/marker-icon-2x.png";
// import shadow from "../assets/images/marker-shadow.png";
import icon from "../assets/location.svg";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "react";

const markerIcon = new L.Icon({
  iconUrl: icon.src,
  iconSize: new L.Point(40, 47),
});

const LeafletgeoSearch = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
    });

    map.addControl(searchControl);

    // Return a cleanup function that removes the control
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  // Return null since this component doesn't render anything
  return null;
};

const Location = ({ stores }) => {
  const customIcon = new L.Icon({
    iconUrl: icon.src,
    iconSize: new L.Point(40, 47),
  });

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };

  return (
    <MapContainer
      style={{ height: "500px" }}
      center={[20.547376955226042, 1.3115999578870117]}
      zoom={2}
      minZoom={2}
      scrollWheelZoom={true}
    >
      <LeafletgeoSearch />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {stores.map((address, index) => (
          <Marker
            icon={customIcon}
            key={index}
            position={[address.lat, address.lng]}
            title={address.store}
          >
            <Popup>
              <div className="border border-gray-300 p-4 rounded-lg w-64 bg-gray-50">
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    {address.store
                      ? address.store.replace("#038;", "")
                      : "Store Name"}
                  </h2>
                </div>
                <p className="text-sm leading-6">
                  {address.address && (
                    <span>
                      {address.address}
                      <br />
                    </span>
                  )}
                  {address.city && (
                    <span>
                      {address.city}
                      <br />
                    </span>
                  )}
                  {address.country && <span>{address.country}</span>}
                </p>
                {address.url && (
                  <a
                    href={address.url}
                    className="mt-4 block text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Store Website
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Location;
