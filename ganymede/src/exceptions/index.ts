class DatabasesError extends Error {
    constructor(name: string, msg: string) {
        super(msg)
        this.name = name
    }
}

export {
    DatabasesError
}