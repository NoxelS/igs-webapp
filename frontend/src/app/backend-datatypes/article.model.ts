
export class Article {

    title: string;
    uniqueKey: string;
    views: number;
    creationDate: number;
    imageUrl: string;
    content: string;

    constructor(title: string, views: number, creationDate: number, imageUrl: string, content: string) {
        this.title = title;
        this.views = views;
        this.creationDate = creationDate;
        this.imageUrl = imageUrl;
        this.content = content;
    }

}
