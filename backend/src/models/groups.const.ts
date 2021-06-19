export enum Regionalgruppe {
    koblenz = 'Koblenz Nord/Ost und Koblenz Süd/West',
    neustadtNord = 'Neustadt/Nord',
    neustadtWest = 'Neustadt/West',
    neustadtMitte = 'Neustadt/Mitte',
    neustadtSüd = 'Neustadt/Süd',
    trier = 'Trier'
}

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

export enum FileScope {
    general = 'Allgemein', // Can be downloaded and posted by everyone
    koblenz = 'Koblenz Nord/Ost und Koblenz Süd/West', // Can only be downloaded and posted by users with group
    neustadtNord = 'Neustadt/Nord',
    neustadtWest = 'Neustadt/West',
    neustadtMitte = 'Neustadt/Mitte',
    neustadtSüd = 'Neustadt/Süd',
    trier = 'Trier'
}