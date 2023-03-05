export interface DbGroundFeature {
  artificial: string
  anomalous: string
  terrace: string
}
export interface DbSlopeInfo {
  slope: string
  multipleSlopes: string
  singleAspect: string
  multipleSlopeDirections: string
}
export interface DbRange {
  frontHeight: number
  rearHeight: number
  frontWidth: number
  rearWidth: number
  diff: number
  area: number
}
export interface DbLocus {
  longitude: string
  latitude: string
  height: string
}
export interface DbCoordinate {
  northwestCorner: DbLocus
  northeastCorner: DbLocus
  southwestCorner: DbLocus
  southeastCorner: DbLocus
  fileUrl: string
}

export interface AllForm {
  name: string
  id: "" | undefined
  type: string
  geographicInfo: string
  centerLongitude: number
  centerLatitude: number
  groundFeatureUrl: string
  groundFeature: DbGroundFeature
  slopeInfo: DbSlopeInfo
  range: DbRange
  coordinate: DbCoordinate
  geology: string
}
