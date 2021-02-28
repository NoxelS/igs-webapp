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

    private _content = `
    # Test Content
    _Hmmmm_
    `;

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
