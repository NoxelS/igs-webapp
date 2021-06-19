export enum FileScope {
    general = 'Allgemein', // Can be downloaded and posted by everyone
    koblenz = 'Koblenz Nord/Ost und Koblenz Süd/West', // Can only be downloaded and posted by users with group
    neustadtNord = 'Neustadt/Nord',
    neustadtWest = 'Neustadt/West',
    neustadtMitte = 'Neustadt/Mitte',
    neustadtSüd = 'Neustadt/Süd',
    trier = 'Trier'
}
export class ShortFile {
    constructor(
        public id: number,
        public name: string,
        public authorId: number,
        public authorName: string,
        public mimetype: string,
        public creationDate: number,
        public description: string,
        public scope: FileScope
    ) {}

    static getShortFileFromDbEntry(dbEntry: any) {
        return new ShortFile(
            dbEntry.id,
            dbEntry.name,
            dbEntry['author_id'],
            dbEntry['author_name'],
            dbEntry.mimetype,
            dbEntry.creationDate,
            dbEntry.description,
            dbEntry.scope
        );
    }
}
