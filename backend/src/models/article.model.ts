export class Article {
    id: string;
    title: string;
    views: number;
    creationDate: number;
    imageUrl: string;
    content: string;
    description: string;

    constructor(title: string, views: number, creationDate: number, imageUrl: string, content: string,  description: string, id: string) {
        this.title = title;
        this.views = views;
        this.creationDate = creationDate;
        this.imageUrl = imageUrl;
        this.content = content;
        this.description = description;
        this.id = id;
    }
}
