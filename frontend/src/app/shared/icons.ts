export const mimetypeIcons = {
    image: 'collections',
    document: 'picture_as_pdf',
    audio: 'headphones',
    slideshow: 'slideshow',
    zip: 'folder',
    unknown: 'description',
    video: 'videocam',
    text: 'article'
};

export function getIconFromMimetype(mimetype: string): string {
    const [type, subtype] = mimetype.split('/');
    let icon = mimetypeIcons.unknown;
    switch (type) {
        case 'audio':
            icon = mimetypeIcons.audio;
            break;
        case 'video':
            icon = mimetypeIcons.video;
            break;
        case 'image':
            icon = mimetypeIcons.image;
            break;
        case 'text':
            icon = mimetypeIcons.text;
            break;
        case 'application':
            switch (subtype) {
                case 'zip':
                    icon = mimetypeIcons.zip;
                    break;
                case 'pdf':
                    icon = mimetypeIcons.document;
                    break;
                case 'msword':
                    icon = mimetypeIcons.document;
                    break;
            }
    }
    return icon;
}
