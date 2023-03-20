import { brandList } from "services/static/brandList";

export const accessoryDataSetter = (details) => {
  const tempObj = {
    name: details.title,
    prodType: 4,
    discountType: details.discount.type,
    discountValue: details.discount.value,
    brand: details.brand,
    warranty: details.warranty,
    productAllVariants: details.variants,
    announceDate: new Date(details.announceDate),
    releaseDate: new Date(),
    otherDetails: details.details,
  };

  brandList.map((brand) => {
    if (brand.name === details.brand) {
      tempObj.brand = brand.code;
    }
  });

  return tempObj;
};
