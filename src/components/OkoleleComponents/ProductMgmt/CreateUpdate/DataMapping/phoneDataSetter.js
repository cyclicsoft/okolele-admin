import { brandList } from "services/static/brandList";

export const phoneDataSetter = (details) => {
  const tempObj = {
    name: details.title,
    prodType: 1,
    discountType: details.discount.type,
    discountValue: details.discount.value,
    brand: details.brand,
    warranty: details.warranty,
    productAllVariants: details.variants,
    technology: details.technology,
    speed: details.speed,
    band2G: details.m2GBands,
    band3G: details.m3GBands,
    band4G: details.m4GBands,
    band5G: details.m5GBands,
    announceDate: new Date(details.announceDate),
    releaseDate: new Date(),
    dimension: details.dimension,
    weight: details.weight,
    build: details.build,
    sim: details.sim,
    displayType: details.displayType,
    displaySize: details.displaySize,
    resolution: details.displayResolution,
    protection: details.displayProtection,
    os: details.os,
    chipset: details.chipset,
    cpu: details.cpu,
    gpu: details.gpu,
    cardSlot: details.cardSlot,
    internalStorage: details.internalSlot,
    mainCams: details.mainCamera,
    mainCamFeatures: details.mainCameraFeatures,
    mainCamVideos: details.mainCameraVideo,
    frontCams: details.frontCamera,
    frontCamFeatures: details.frontCameraFeatures,
    frontCamVideos: details.frontCamera,
    loudSpeaker: details.loudspeaker,
    jack: details.jack,
    wlan: details.wlan,
    bluetooth: details.bluetooth,
    gps: details.gps,
    nfc: details.nfc,
    radio: details.radio,
    usb: details.usb,
    sensors: details.sensors,
    batteryType: details.batteryType,
    charging: details.batteryCharging,
    sar: details.sarUs,
    sarEu: details.sarEu,
    models: details.models,
    performances: details.performances,
  };

  brandList.map((brand) => {
    if (brand.name === details.brand) {
      tempObj.brand = brand.code;
    }
  });

  return tempObj;
};
