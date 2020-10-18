import { jsonUrl } from "../config.json";

export const getAllPhotosRequest = () => {
    return fetch(jsonUrl + "photos")
        .then((response) => response.json());
};
