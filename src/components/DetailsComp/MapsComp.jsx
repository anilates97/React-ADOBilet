import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 41.0082,
  lng: 28.9784,
};

function MapsComp({ location }) {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const showInfoWindow = () => {
    setInfoWindowOpen(true);
  };
  const [address, setAddress] = useState("");
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const [center, setCenter] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (!isLoaded || !window.google || !location) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const place = results[0].geometry.location;
        const addressText = results[0].formatted_address;
        setAddress(addressText);

        setCenter({
          lat: place.lat(),
          lng: place.lng(),
        });
      } else {
        console.error(
          "Geocode was not successful for the following reason: ",
          status
        );
      }
    });
  }, [isLoaded, location]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return "Error";
  }

  return isLoaded ? (
    <div className="h-[360px] min-h-[320px] overflow-hidden rounded-[8px] border border-white/10">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || defaultCenter}
        onLoad={onLoad}
        zoom={16}
        options={{
          disableDefaultUI: false,
          clickableIcons: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#151922" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#d7c7a7" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#111722" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d2d33" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#263142" }] },
            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1b2630" }] },
          ],
        }}
      >
        {center && (
          <Marker
            title="Event location"
            position={center}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onClick={showInfoWindow}
          >
            {infoWindowOpen && (
              <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                <div style={{ color: "#111722", fontWeight: 700 }}>{address}</div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default MapsComp;
