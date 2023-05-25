import { ImageModelSmall } from "src/app/interface/image.interface";
import { getStaticUrl } from "src/app/utils/action-builder";

export function MapImage(image: ImageModelSmall): ImageModelSmall {
    return {
        ...image,
        image_full: getStaticUrl(image.image_full),
        image_small: getStaticUrl(image.image_small)
    };
}
