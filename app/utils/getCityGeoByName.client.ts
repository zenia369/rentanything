import type { LatLngTuple } from "leaflet";
import citiesData from "~/assets/ukraine-cities.json";

const cache: Record<string, LatLngTuple> = {};

export const getCityGeoByName = (
  query: string,
  defaultValue: number[] | LatLngTuple
): LatLngTuple => {
  if (cache[query]) return cache[query];

  const cityGeo = citiesData.find(({ city }) =>
    query
      .replace("Oblast", "")
      .trim()
      .split(" ")
      .some((q) => city.includes(q))
  );

  if (!cityGeo) return defaultValue as LatLngTuple;

  const latLngTuple = [Number(cityGeo.lat), Number(cityGeo.lng)] as LatLngTuple;

  cache[query] = latLngTuple;

  return latLngTuple;
};
