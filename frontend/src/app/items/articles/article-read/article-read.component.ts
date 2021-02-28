import { Component, OnInit } from '@angular/core';


interface UploadResult {
    isImg: boolean;
    name: string;
    url: string;
}

@Component({
    selector: 'app-article-read',
    templateUrl: './article-read.component.html',
    styleUrls: ['./article-read.component.scss']
})
export class ArticleReadComponent implements OnInit {
    options = {
        showPreviewPanel: false, // Show preview panel, Default is true
        showBorder: true, // Show editor component's border. Default is true
        hideIcons: ['Code', 'TogglePreview', 'FullScreen'], // ['Bold', 'Italic', 'Heading', 'Refrence', 'Link', 'Image', 'Ul', 'Ol', 'Code', 'TogglePreview', 'FullScreen']. Default is empty
        //   usingFontAwesome5?: boolean   // Using font awesome with version 5, Default is false
        //   scrollPastEnd?: number        // The option for ace editor. Default is 0
        //   enablePreviewContentClick?: boolean  // Allow user fire the click event on the preview panel, like href etc. Default is false
        resizable: true // Allow resize the editor
        //   markedjsOpt?: MarkedjsOption  // The markedjs option, see https://marked.js.org/#/USING_ADVANCED.md#options
        //   customRender?: {              // Custom markedjs render
        //     image?: Function     // Image Render
        //     table?: Function     // Table Render
        //     code?: Function      // Code Render
        //     listitem?: Function  // Listitem Render
        //   }
    };

    private _content = `Eine Übersicht über die integrierten _Gesamtschulen_ in Rheinland-Pfalz finden Sie hier: https://igs.bildung-rp.de/die-gesamtschulen-in-rlp.html Die
    Integrierte Gesamtschule in Deutschland wurde Ende der sechziger Jahre des vergangenen Jahrhunderts als Folge einer breiten Bildungsdiskussion
    konzipiert. Vertreterinnen und Vertreter des Gesamtschulgedankens argumentierten, dass das nach dem Zweiten Weltkrieg restaurierte gegliederte
    Schulwesen den wachsenden Aufgaben und Anforderungen eines demokratischen und leistungsfähigen Staates nicht mehr gewachsen sei. Um vorhandene
    Bildungsressourcen stärker auszunutzen, entwickelte der Deutsche Bildungsrat die horizontal und integrativ gegliederte Gesamtschule in verschiedenen
    Stufen als Alternative zum gegliederten, vertikal aussondernd strukturierten Schulwesen: Jedes Kind soll in einer Schule nach seinen individuellen
    Voraussetzungen die einzelnen Stufen durchlaufen können, bis es den jeweils möglichen Abschluss erreicht hat. Die IGS ist daher von Anfang an eine
    Schule für alle Kinder und setzt auf eine größere Chancengerechtigkeit: Bildungsgänge werden in ihr nicht zu früh und nicht zu sehr vom Elternhaus
    abhängig getroffen. In der weiteren bildungspolitischen Entwicklung blieb es den einzelnen Ländern vorbehalten, Gesamtschulen einzuführen. In
    Rheinland-Pfalz wurde mit einer Änderung des Schulgesetzes im Jahre 1992 die Integrierte Gesamtschule zu einer gleichberechtigten Schulart in der
    Sekundarstufe I. Neben den fachlichen Bildungsinhalten setzt die IGS in gleichem Maße auf soziales Lernen, um die Zukunft einer demokratischen
    Gesellschaft der Vielfalt gestalten zu können. Die heterogen zusammengesetzten Lerngruppen werden dabei als Chance gesehen, weil sich die Vielfalt
    der Gesellschaft in den Klassen und Lerngruppen widerspiegelt und damit längeres gemeinsames Lernen mit- und voneinander ermöglicht. Aus dieser
    Grundlegung leitet sich wiederum ein stärker individualisierter Lernbegriff ab, wofür die IGS eine Reihe von strukturellen und inhaltlichen
    Instrumenten entwickelt hat:
    • Leistungsdifferenzierung in verschiedenen Fächern und unterschiedlichen Klassenstufen • Neigungsdifferenzierung (Wahlpflichtfächer) • eine
    Vielzahl von Lern- und Arbeitsformen mit individualisierten Möglichkeiten: -Freiarbeit -Planarbeit -Partnerarbeit -Gruppenarbeit -Projektarbeit •
    anhaltende (Lern-) Beziehungen (möglichst stabile Lerngruppen, keine Versetzungsentscheidung bis Klasse 9); • veränderte Schüler-Lehrer-Beziehung
    (Struktur der Teamschule, Doppeltutorenschaft); • Formen individualisierter Beratung (verbale Beurteilung statt Kopfnoten,
    SchülerEltern-Lehrer-Gespräche, Schullaufbahnprognose, Schulsozialarbeit). Die Integrierte Gesamtschule ist aus dieser Entwicklung heraus diejenige
    Schulart, die auf einem pädagogischen und innovativen Konzept beruht. Ein solches muss jede IGS entwickeln, umsetzen und stets aktuell halten. Über
    mehr als vierzig Jahre hinweg hat die IGS damit ihre Leistungsfähigkeit bewiesen, sich zu einer Alternative zum gegliederten Schulwesen entwickelt
    und als Regelschule für alle Kinder etabliert. Die derzeit 55 Integrierten Gesamtschulen in Rheinland-Pfalz sind überwiegend als vierzügige Schulen
    mit einer Gymnasialen Oberstufe errichtet. Ziel der Gesamtschule ist es, die Schülerinnen und Schüler zu befähigen, erfolgreich einen der folgenden
    Abschlüsse, die denen des gegliederten Schulsystems entsprechen, zu erreichen: • die Berufsreife (Hauptschulabschluss) nach Klasse 9 • den
    Qualifizierten Sekundarabschluss I (Realschulabschluss) nach Klasse 10 • die Übergangsberechtigung in die Gymnasiale Oberstufe • den schulischen
    Teil der Fachhochschulreife und • die Allgemeine Hochschulreife. Der Teamgedanke an der IGS Grundgedanke einer Teamschule ist, dass innerhalb der
    gesamten Schulgemeinschaft kleinere Einheiten, also Teams, gebildet werden, die Raum lassen für Beziehungen und eigenverantwortliches Handeln von
    Schülerinnen und Schülern, Lehrerinnen und Lehrern sowie Eltern. Der Teamgedanke als wesentliches Strukturmerkmal der IGS zeigt sich an
    entscheidenden pädagogischen Knotenpunkten der Schule: Das Teamprinzip spiegelt sich auf allen Ebenen der IGS wider, so zum Beispiel in der
    Schülervertretung (SV-Team), im Schulelternbeirat und seinen Arbeitskreisen, den Fachgruppen, dem Ganztagsteam, dem Inklusionsteam, dem Krisenteam,
    einzelnen Planungsteams, Tischgruppen in den Klassen usw. Die einzelnen Klassen an einer IGS werden jeweils von einem Tutorenteam aus zwei
    Lehrkräften als Klassenleitung begleitet, im Idealfall von einer Frau und einem Mann, damit beide Geschlechter entsprechende Ansprechpartnerinnen
    und Ansprechpartner haben. Das Tutorenteam begleitet den Klassenrat, unterrichtet gemeinsam fächerübergreifendes Lernen, plant die
    Berufsorientierung, führt die Klassenfahrten durch und bleibt der Klasse meist über die gesamte Sekundarstufe I hinweg erhalten. Um die Bindung der
    Tutoren zu ihren Klassen zu stärken, werden diese idealerweise mit möglichst vielen Deputatsstunden in ihrer Klasse und in ihrem Jahrgang
    eingesetzt. Die Tutorenteams einer Klassenstufe bilden jeweils das Jahrgangsteam, welches für viele Kolleginnen und Kollegen das „Nest“ ist, in dem
    sie für ihre anspruchsvolle Arbeit die notwendige Unterstützung und Entlastung finden. Neue Kolleginnen und Kollegen finden hier sofort Anbindung
    und wichtige Informationen für den Schulalltag. Regelmäßig finden gemeinsame Teamsitzungen statt, in denen die anfallenden pädagogischen,
    organisatorischen und sonstigen Angelegenheiten des Teams behandelt werden. Auch architektonisch bilden die Jahrgangsteams idealerweise mit jeweils
    vier Klassen eine Einheit auf einem Flur, wo sich neben den Klassen- und Differenzierungsräumen auch der jeweilige Teamraum befindet. Diese
    räumliche Nähe ist eine gute Voraussetzung für schnelle und direkte Kontakte aller im Jahrgang beteiligten Personen. Auch die Schulleitung arbeitet
    im Team und hat regelmäßige Leitungsteamsitzungen. An vielen Schulen entsenden die Teams eine Teamsprecherperson in eine Koordinationssitzung, in
    der zusammen mit der Schulleitung aktuelle und konzeptionelle Themen besprochen werden und die im Wesentlichen dem gegenseitigen Austausch dient.`;

    public get content(): any {
        return this._content;
    }

    public set content(c: any) {
        console.log(c);
        this._content = c;
    }

    constructor() {
        this.doUpload = this.doUpload.bind(this); // This is very important.
    }

    doUpload(files: Array<File>): Promise<Array<UploadResult>> {
        // do upload file by yourself
        return Promise.resolve([{ name: 'xxx', url: 'xxx.png', isImg: true }]);
    }

    ngOnInit(): void {
        // TODO: fetch article
    }
}
