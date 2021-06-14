export class ShortFile {
    constructor(
        public id: number,
        public name: string,
        public authorId: number,
        public authorName: string,
        public mimetype: string,
        public creationDate: number,
        public description: string
    ) {}
}
