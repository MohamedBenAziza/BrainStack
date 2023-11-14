interface ISystemMessages {
  code: number;
  module: string;
  text: string;
  type: string;
}

interface IParent {
  id: string;
  name: string;
  type: string;
}

interface IProperties {
  stopId: string;
}

export enum Type {
  STOP = "stop",
  POI = "poi",
  STREET = "street",
  SUBURB = "suburb",
}

interface ILocation {
  coord: number[];
  disassembledName: string;
  id: string;
  isBest: boolean;
  isGlobalId: boolean;
  matchQuality: number;
  name: string;
  parent: IParent;
  productClasses: number[];
  properties: IProperties;
  type: Type;
}

export interface ILocationData {
  locations: ILocation[];
  systemMessages: ISystemMessages[];
  version: string;
}
