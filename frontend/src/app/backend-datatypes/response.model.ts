import { ShortFile } from './short-file.model';
import { User } from './user.model';


export class IgsResponse<T> {
    successful: boolean = true;
    data: T;
    errorMessage: string;
    responseType: string;
    dataType: string;

    constructor(data: T, errorMessage?: string) {
        this.data = data;
        const dataType = ((data as any)?.constructor?.name) || null;
        this.responseType = `${this.constructor.name}${dataType ? `<${dataType}>` : ''}`;

        if (errorMessage) {
            this.successful = false;
            this.errorMessage = errorMessage;
        }
    }
}

export class SuccessResponse extends IgsResponse<null> {
    constructor() {
        super(null);
    }
}

export class ShortFileListResponse extends IgsResponse<ShortFile[]> {
    constructor(id: ShortFile[]) {
        super(id);
    }
}

export class ErrorResponse extends IgsResponse<null> {
    constructor(err: string) {
        super(null, err);
    }
}

export class LoginResponse extends IgsResponse<User> {
    token: string;
    expiresIn: string;

    constructor(signedToken: string, expiresIn: string, user: User) {
        super(user);
        this.token = 'Bearer ' + signedToken;
        this.expiresIn = expiresIn;
    }
}
