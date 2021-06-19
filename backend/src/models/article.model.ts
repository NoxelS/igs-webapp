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
    constructor(
        public title: string,
        public views: number,
        public creationDate: number,
        public imageUrl: string,
        public content: string,
        public description: string,
        public id: string,
        public scope: ArticleScope,
        public authorId: number,
        public authorName: string
    ) {}
}
