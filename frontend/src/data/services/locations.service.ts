import { ILocationData, Type } from "../models/location.model";
import poiLogo from "../../assets/poi.svg";
import stopLogo from "../../assets/stop.svg";
import streetLogo from "../../assets/street.svg";
import suburbLogo from "../../assets/suburb.svg";

export interface ILocationDisplayed {
  label: string;
  value: string;
  icon: string;
}

const iconMap = new Map<Type, string>([
  [Type.POI, poiLogo],
  [Type.STOP, stopLogo],
  [Type.STREET, streetLogo],
  [Type.SUBURB, suburbLogo],
]);

export async function fetchLocationList(
  searchTerm: string
): Promise<ILocationDisplayed[]> {
  if (searchTerm) {
    return fetch(`http://localhost:3000/api/locations/${searchTerm}`)
      .then((response) => response.json())
      .then((locationsData: ILocationData) => {
        return locationsData.locations.map((location) => ({
          label: `${location.name}`,
          value: location.id,
          icon: iconMap.get(location.type) ?? "",
        }));
      });
  } else {
    return Promise.resolve([]);
  }
}
