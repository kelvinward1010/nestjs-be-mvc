export function createResponse<T>(status: number, message: string, data: T | null): { status: number, message: string, data: T | null } {
    return {
        status,
        message,
        data: data !== undefined ? data : null,
    };
}
