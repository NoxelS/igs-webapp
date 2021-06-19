
export enum Regionalgruppe {
    koblenz = 'Koblenz Nord/Ost und Koblenz Süd/West',
    neustadtNord = 'Neustadt/Nord',
    neustadtWest = 'Neustadt/West',
    neustadtMitte = 'Neustadt/Mitte',
    neustadtSüd = 'Neustadt/Süd',
    trier = 'Trier'
}

export class User {
    constructor(
        public username: string,
        public email: string,
        public id: number,
        public isSuperUser: boolean,
        public name: string,
        public regionalgruppe: Regionalgruppe
    ) {}

    static fromDbEntry(dbRow: any) {
        return new User(dbRow.username, dbRow.email, dbRow.id, !!dbRow.isSuperUser, dbRow.name, dbRow.regionalgruppe)
    }
}
