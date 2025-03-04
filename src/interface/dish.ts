export interface Dish {
    _id?:string,
    name:string,
    shortDescription:string,
    price:number,
    rating:number,
    reviewsCount?:number,
    category:string,
    urlImg?: string,
    userRating?: number,
    userFav?: boolean,
}