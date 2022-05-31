import React, { useCallback, useEffect, useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { getCenter } from "geolib";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperiences, setMapState } from "../../Redux/reducers/experiences";
import { getExperiences } from "../../actions/experience";
import "mapbox-gl/dist/mapbox-gl.css";
import { ImLocation2 } from "react-icons/im";
import ImageComponent from "../shared/ImageComponent";

const Mapbox = ({ experiences }) => {
  const source = axios.CancelToken.source();
  // const experiences = useSelector((state) => state.experiences.experiences);
  const mapStyle = useSelector((state) => state.map.mapStyle);
  const viewState = useSelector((state) => state.map.viewState);
  const [selectedLocation, setSelectedLocation] = useState({});
  const dispatch = useDispatch();
  const onMove = useCallback((evt) => {
    dispatch({ type: "SET_VIEW_STATE", payload: evt.viewState });
    console.log("View state",evt.viewState)
  }, []);

  //Transform Experiences object into geolocation
  const coordinates = experiences.map((exp) => ({
    latitude: Number(exp.lat),
    longitude: Number(exp.lng),
  }));

  const center = getCenter(coordinates);

  const newMapState = () => {
    dispatch(
      setMapState({
        ...viewState,
        latitude: center.latitude,
        longitude: center.longitude,
      })
    );
  };

  useEffect(() => {
    // loadExperiences();
    newMapState();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      attributionControl={false}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {experiences &&
        experiences.map((exp) => (
          <div key={exp._id}>
            <Marker longitude={exp.lng} latitude={exp.lat}>
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocation(exp);
                }}
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
              >
                <ImLocation2 className="text-orange-500 text-2xl" />
              </p>
            </Marker>
            {selectedLocation && selectedLocation.lng == Number(exp.lng) ? (
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick={true}
                latitude={Number(exp.lat)}
                longitude={Number(exp.lng)}
                anchor="bottom"
              >
                {exp.location}
                <ImageComponent  src={`${process.env.REACT_APP_API}/experience/image/${exp._id}`}/>
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
    </Map>
  );
};

export default Mapbox;
