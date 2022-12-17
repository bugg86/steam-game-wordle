import { ObjectId } from "mongodb";

export default class SteamGame {
    constructor(
        public steam_appid: number,
        public name: string,
        public developers: Array<string>,
        public publishers: Array<string>,
        public release_date: object,
        public genre: Array<string>,
        public metacritic: number,
        public initialprice: string,
        public minowners: number,
        public maxowners: number,
        public id?: ObjectId
    ) {}
}