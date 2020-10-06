export class Article {
    id: string;
    title: string;
    views: number;
    creationDate: number;
    imageUrl: string;
    content: string;

    constructor(title: string, views: number, creationDate: number, imageUrl: string, content: string, id: string) {
        this.title = title;
        this.views = views;
        this.creationDate = creationDate;
        this.imageUrl = imageUrl;
        this.content = content;
        this.id = id;
    }
}
