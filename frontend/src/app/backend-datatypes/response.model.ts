export class IgsResponse<T> {
    successful: boolean = true;
    data: T;
    errorMessage: string = '';

    constructor(data: T, errorMessage?: string) {
        this.data = data;
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

export class ErrorResponse extends IgsResponse<null> {
    constructor(err: string) {
        super(null, err);
    }
}
