"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SteamGame {
    constructor(steam_appid, name, developers, publishers, release_date, genre, metacritic, initialprice, minowners, maxowners, id) {
        this.steam_appid = steam_appid;
        this.name = name;
        this.developers = developers;
        this.publishers = publishers;
        this.release_date = release_date;
        this.genre = genre;
        this.metacritic = metacritic;
        this.initialprice = initialprice;
        this.minowners = minowners;
        this.maxowners = maxowners;
        this.id = id;
    }
}
exports.default = SteamGame;
//# sourceMappingURL=steam-game.js.map