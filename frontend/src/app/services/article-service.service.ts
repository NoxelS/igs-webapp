import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Article } from '../models/article.model';


@Injectable({providedIn: "root"})
export class ArticleService {

    mockArticles: Article[] = [
        new Article(
            "Gesamtschulen in Rheinland-Pfalz",
            "158",
            new Date().getTime(),
            "",
            `
            Eine Übersicht über die integrierten Gesamtschulen in Rheinland-Pfalz finden Sie hier
            Die Integrierte Gesamtschule in Deutschland wurde Ende der sechziger Jahre des vergangenen Jahrhunderts als Folge einer breiten Bildungsdiskussion konzipiert. Vertreterinnen und Vertreter des Gesamtschulgedankens argumentierten, dass das nach dem Zweiten Weltkrieg restaurierte gegliederte Schulwesen den wachsenden Aufgaben und Anforderungen eines demokratischen und leistungsfähigen Staates nicht mehr gewachsen sei. Um vorhandene Bildungsressourcen stärker auszunutzen, entwickelte der Deutsche Bildungsrat die horizontal und integrativ gegliederte Gesamtschule in verschiedenen Stufen als Alternative zum gegliederten, vertikal aussondernd strukturierten Schulwesen: Jedes Kind soll in einer Schule nach seinen individuellen Voraussetzungen die einzelnen Stufen durchlaufen können, bis es den jeweils möglichen Abschluss erreicht hat. Die IGS ist daher von Anfang an eine Schule für alle Kinder und setzt auf eine größere Chancengerechtigkeit: Bildungsgänge werden in ihr nicht zu früh und nicht zu sehr vom Elternhaus abhängig getroffen. In der weiteren bildungspolitischen Entwicklung blieb es den einzelnen Ländern vorbehalten, Gesamtschulen einzuführen. In Rheinland-Pfalz wurde mit einer Änderung des Schulgesetzes im Jahre 1992 die Integrierte Gesamtschule zu einer gleichberechtigten Schulart in der Sekundarstufe I. 
            Neben den fachlichen Bildungsinhalten setzt die IGS in gleichem Maße auf soziales Lernen, um die Zukunft einer demokratischen Gesellschaft der Vielfalt gestalten zu können. Die heterogen zusammengesetzten Lerngruppen werden dabei als Chance gesehen, weil sich die Vielfalt der Gesellschaft in den Klassen und Lerngruppen widerspiegelt und damit längeres gemeinsames Lernen mit- und voneinander ermöglicht.  
            Aus dieser Grundlegung leitet sich wiederum ein stärker individualisierter Lernbegriff ab, wofür die IGS eine Reihe von strukturellen und inhaltlichen Instrumenten entwickelt hat:  
            • Leistungsdifferenzierung in verschiedenen Fächern und unterschiedlichen Klassenstufen
            • Neigungsdifferenzierung (Wahlpflichtfächer)
            • eine Vielzahl von Lern- und Arbeitsformen mit individualisierten Möglichkeiten:
            -Freiarbeit
            -Planarbeit
            -Partnerarbeit
            -Gruppenarbeit
            -Projektarbeit
            • anhaltende (Lern-) Beziehungen (möglichst stabile Lerngruppen, keine Versetzungsentscheidung bis Klasse 9); 
            • veränderte Schüler-Lehrer-Beziehung (Struktur der Teamschule, Doppeltutorenschaft);
            • Formen individualisierter Beratung (verbale Beurteilung statt Kopfnoten, SchülerEltern-Lehrer-Gespräche, Schullaufbahnprognose, Schulsozialarbeit).
            Die Integrierte Gesamtschule ist aus dieser Entwicklung heraus diejenige Schulart, die auf einem pädagogischen und innovativen Konzept beruht. Ein solches muss jede IGS entwickeln, umsetzen und stets aktuell halten. Über mehr als vierzig Jahre hinweg hat die IGS damit ihre Leistungsfähigkeit bewiesen, sich zu einer Alternative zum gegliederten Schulwesen entwickelt und als Regelschule für alle Kinder etabliert.  
            Die derzeit 55 Integrierten Gesamtschulen in Rheinland-Pfalz sind überwiegend als vierzügige Schulen mit einer Gymnasialen Oberstufe errichtet.
            Ziel der Gesamtschule ist es, die Schülerinnen und Schüler zu befähigen, erfolgreich einen der folgenden Abschlüsse, die denen des gegliederten Schulsystems entsprechen, zu erreichen:
            •	die Berufsreife (Hauptschulabschluss) nach Klasse 9
            •	den Qualifizierten Sekundarabschluss I (Realschulabschluss) nach Klasse 10 
            •	die Übergangsberechtigung in die Gymnasiale Oberstufe
            •	den schulischen Teil der Fachhochschulreife und
            •	die Allgemeine Hochschulreife. 
            `
        )
    ];

    articleChange$: BehaviorSubject<Article[]>;

    constructor() {
        this.articleChange$ = new BehaviorSubject(this.mockArticles);
    }

    get articles(): Observable<Article[]> {
        return this.articleChange$.asObservable();
    }
}