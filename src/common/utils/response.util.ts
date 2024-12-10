export function createResponse<T>(status: number, message: string, data: T | null | any): { status: number, message: string, data: T | null | any } {
    return {
        status,
        message,
        data: data !== undefined ? data : null,
    };
}
