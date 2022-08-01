class SqliteDbLoader {
    constructor() {
        this.PATH_WASM = `lib/sql.js/1.7.0`
        this.DB = null
    }
    async load(path='./db/mylog.db') {
        if (!this.DB) {
            const res = await fetch(path)
            const buf = await res.arrayBuffer()
            new Uint8Array(buf)
            this.SQL = await initSqlJs({locateFile: file => `${this.PATH_WASM}/${file}`})
        }
        this.DB = new this.SQL.Database(dbAsUint8Array)
        return this.DB
    }
}
