const instances = new Map<string, boolean>()
export function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {

        constructor(...args: any[]) {
            super(...args);
            if (instances.get(constructor.name)) {
                throw new Error(
                    `An instance of the singleton class, ${constructor.name}, has already been created. ` +
                    "If you want to create another instance, remove the @Singleton decorator on the class");
            }

            instances.set(constructor.name, true);
        }
    };
}