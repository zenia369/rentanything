import { MapMarker } from "@prisma/client";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Feature, GeoJsonObject } from "geojson";
import { Layer, type LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  GeoJSON,
  useMap,
} from "react-leaflet";

import geojsonData from "~/assets/ukraine-with-regions.json";
import { useStateContext } from "~/context/State.context";
import { StateIndexPage, loader } from "~/routes/_index";
import { getCityGeoByName } from "~/utils/getCityGeoByName.client";

const position: LatLngTuple = [50.450923, 30.522761];
const countryStyle = {
  fillColor: "#a1a1a1",
  fillOpacity: 0.4,
  color: "3c3c3c",
  weight: 0.5,
};
const highlightStyle = {
  weight: 1,
  opacity: 1,
  color: "#6e6d6d",
  fillOpacity: 0.7,
};

const MapEvents = () => {
  const map = useMap();
  const { setState } = useStateContext<StateIndexPage>();

  useEffect(() => {
    const handleZoom = () => {
      const mapBounds = map.getBounds();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const visibleLayers: any[] = [];

      map.eachLayer((layer) => {
        if (
          ("getLatLng" in layer &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mapBounds.contains((layer as any).getLatLng())) ||
          ("getBounds" in layer &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mapBounds.intersects((layer as any).getBounds()))
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((layer as any)?.feature) {
            visibleLayers.push(layer);
          }
        }
      });

      setState((prev) => ({
        ...prev,
        filter: visibleLayers
          .map((f) => f?.feature?.properties?.name)
          .filter(Boolean),
      }));
    };

    map.on("zoomend", handleZoom);

    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map, setState]);

  return null;
};

const Map = () => {
  const [, setSearchParams] = useSearchParams();
  const loaderData = useLoaderData<typeof loader>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedLayer = useRef<any>(null);

  const onEachFeature = (feature: Feature, layer: Layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle(highlightStyle);
      },
      mouseout: (e) => {
        if (e.target === selectedLayer.current) return;

        e.target.setStyle(countryStyle);
      },
      click: (e) => {
        if (selectedLayer.current === e.target) {
          selectedLayer.current = null;

          e.target.setStyle(countryStyle);

          setSearchParams((prev) => {
            prev.delete("region");
            return prev;
          });

          return;
        }

        const region = e.target?.feature?.properties?.name;

        if (!region) return;

        if (selectedLayer.current !== null) {
          selectedLayer.current.setStyle(countryStyle);
        }
        selectedLayer.current = e.target;

        e.target.setStyle(highlightStyle);

        setSearchParams((prev) => {
          prev.set("region", region);
          return prev;
        });
      },
    });
  };

  const handleMarkerClick = (markerId: MapMarker["id"]) => () => {
    setSearchParams((prev) => {
      if (prev.get("marker") === markerId) {
        prev.delete("marker");
      } else {
        prev.set("marker", markerId);
      }
      return prev;
    });
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        className="h-full w-full"
        center={position}
        zoom={6}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          style={countryStyle}
          data={geojsonData.features as unknown as GeoJsonObject}
          onEachFeature={onEachFeature}
        />
        {loaderData.markers.map((m) => (
          <Marker
            key={m.id}
            position={
              m.latLngTuple.length
                ? (m.latLngTuple as LatLngTuple)
                : getCityGeoByName(m.region, position)
            }
            eventHandlers={{
              click: handleMarkerClick(m.id),
            }}
          />
        ))}
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default Map;
