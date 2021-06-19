export enum ArticleScope {
    mainPage = 'Startseite', // Can only be created by superuser
    latestNews = 'Aktuelle Themen', // Can be read and posted by everyone
    koblenz = 'Koblenz Nord/Ost und Koblenz Süd/West', // Can only be read and posted by users with group
    neustadtNord = 'Neustadt/Nord',
    neustadtWest = 'Neustadt/West',
    neustadtMitte = 'Neustadt/Mitte',
    neustadtSüd = 'Neustadt/Süd',
    trier = 'Trier'
}

export class Article {
    id: string;
    title: string;
    views: number;
    creationDate: number;
    imageUrl: string;
    content: string;
    description: string;
    scope: ArticleScope;

    constructor(title: string, views: number, creationDate: number, imageUrl: string, content: string,  description: string, id: string, scope: ArticleScope) {
        this.title = title;
        this.views = views;
        this.creationDate = creationDate;
        this.imageUrl = imageUrl;
        this.content = content;
        this.description = description;
        this.id = id;
        this.scope = scope;
    }
}
