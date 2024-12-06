export function logExecutionTime() {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const startTime = Date.now();

            const result = await originalMethod.apply(this, args);

            const endTime = Date.now();
            console.log(`Execution time for ${methodName}: ${endTime - startTime}ms`);

            return result;
        };
    };
}
