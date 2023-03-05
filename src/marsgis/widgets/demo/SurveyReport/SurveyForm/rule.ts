export default {
  name: { required: true, message: "Please select Activity zone", trigger: "change" },
  type: { required: true, message: "Please select Activity zone", trigger: "change" },
  geographicInfo: { required: true, message: "Please select Activity zone", trigger: "change" },
  centerLongitude: { required: true, message: "Please select Activity zone", trigger: "change" },
  centerLatitude: { required: true, message: "Please select Activity zone", trigger: "change" },
  groundFeatureUrl: { required: false, message: "Please select Activity zone", trigger: "change" },
  groundFeature: {
    anomalous: { required: true, message: "Please select Activity zone", trigger: "change" },
    artificial: { required: true, message: "Please select Activity zone", trigger: "change" },
    terrace: { required: true, message: "Please select Activity zone", trigger: "change" }
  },
  slopeInfo: {
    slope: { required: true, message: "Please select Activity zone", trigger: "change" },
    multipleSlopes: { required: true, message: "Please select Activity zone", trigger: "change" },
    singleAspect: { required: true, message: "Please select Activity zone", trigger: "change" },
    multipleSlopeDirections: { required: true, message: "Please select Activity zone", trigger: "change" }
  },
  range: {
    frontHeight: { required: true, message: "Please select Activity zone", trigger: "change" },
    Trailingedgeelevation: { required: true, message: "Please select Activity zone", trigger: "change" },
    rearHeight: { required: true, message: "Please select Activity zone", trigger: "change" },
    frontWidth: { required: true, message: "Please select Activity zone", trigger: "change" },
    rearWidth: { required: true, message: "Please select Activity zone", trigger: "change" },
    area: { required: true, message: "Please select Activity zone", trigger: "change" },
    diff: { required: true, message: "Please select Activity zone", trigger: "change" }
  },
  coordinate: {
    northwestCorner: {
      longitude: { required: true, message: "Please select Activity zone", trigger: "change" },
      latitude: { required: true, message: "Please select Activity zone", trigger: "change" },
      height: { required: true, message: "Please select Activity zone", trigger: "change" }
    },
    northeastCorner: {
      longitude: { required: true, message: "Please select Activity zone", trigger: "change" },
      latitude: { required: true, message: "Please select Activity zone", trigger: "change" },
      height: { required: true, message: "Please select Activity zone", trigger: "change" }
    },
    southwestCorner: {
      longitude: { required: true, message: "Please select Activity zone", trigger: "change" },
      latitude: { required: true, message: "Please select Activity zone", trigger: "change" },
      height: { required: true, message: "Please select Activity zone", trigger: "change" }
    },
    southeastCorner: {
      longitude: { required: true, message: "Please select Activity zone", trigger: "change" },
      latitude: { required: true, message: "Please select Activity zone", trigger: "change" },
      height: { required: true, message: "Please select Activity zone", trigger: "change" }
    },
    fileUrl: {
      required: true,
      message: "Please select Activity zone",
      trigger: "change"
    }
  },
  geology: { required: true, message: "Please select Activity zone", trigger: "change" }
}
