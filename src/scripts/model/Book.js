export default class Book {

    constructor(_id, title, author, genre, thumbnail) {
        this._id = _id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.thumbnail = `https://storage.googleapis.com/${thumbnail}`;
    }
}