import { ImageModel, ImageModelSmall } from "src/app/interface/image.interface";
import { getStaticUrl } from "src/app/utils/action-builder";

export function MapImage(image: ImageModelSmall): ImageModelSmall {
    return {
        ...image,
        image_full: getStaticUrl(image.image_full),
        image_small: getStaticUrl(image.image_small)
    };
}

export function MapImageFull(image: ImageModel): ImageModel {
    return {
        ...image,
        image_full: getStaticUrl(image.image_full),
        image_small: getStaticUrl(image.image_small)
    };
}

export function ImageToSmall(image: ImageModel): ImageModelSmall {
    return {
        image_full: image.image_full,
        image_small: image.image_small,
        id: image.id,
    };
}
