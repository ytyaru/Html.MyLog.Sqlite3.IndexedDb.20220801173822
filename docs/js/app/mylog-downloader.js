class MyLogDownloader {
    constructor(db) {
        this.SQL = null
        this.db = db
    }
    async download() {
        await Promise.all([this.downloadDb(), this.downloadHtml()])
        Toaster.toast(`ダウンロードしました！`)
    }
    async downloadHtml() { // zip版
        Loading.show()
        this.zip = new JSZip()
        //const content = await this.#makeDb()
        //this.zip.file(`mylog.${ext}`, content)
        //this.zip.file(`mylog/mylog.db`, await this.#makeDb())
        //this.zip.file(`mylog/index.html`, this.#getIndex())
        //this.zip.file(`mylog/server.sh`, await this.#getCode(`server.sh`))
        this.zip.file(`mylog/index.html`, new TextEncoder().encode(await this.#getIndex()))
        this.zip.file(`mylog/css/style.css`, await this.#getStyle())
        this.zip.file(`mylog/js/main.js`, new TextEncoder().encode(this.#getMain()))
        if (window.mpurse) {
            const code = await this.#getCode(`js/mpurse-send-button.js`)
            const address = await window.mpurse.getAddress()
            this.zip.file(`mylog/server.sh`, await this.#getCode(`server.sh`), {unixPermissions: "755"})
            this.zip.file(`mylog/run_server.py`, await this.#getCode(`run_server.py`))
            this.zip.file(`mylog/lib/toastify/1.11.2/min.js`, await this.#getCode(`lib/toastify/1.11.2/min.js`))
            this.zip.file(`mylog/lib/toastify/1.11.2/min.css`, await this.#getCode(`lib/toastify/1.11.2/min.css`))
            this.zip.file(`mylog/lib/party/party.min.js`, await this.#getCode(`lib/party/party.min.js`))
            this.zip.file(`mylog/js/monacoin/mpurse-send-button.js`, code.replace(/MEHCqJbgiNERCH3bRAtNSSD9uxPViEX1nu/g, address))
            this.zip.file(`mylog/js/monacoin/party-sparkle-image.js`, await this.#getCode(`js/party-sparkle-image.js`))
            this.zip.file(`mylog/js/monacoin/party-sparkle-hart.js`, await this.#getCode(`js/party-sparkle-hart.js`))
        }
        this.zip.file(`mylog/test.txt`, `日本語UTF8`)
        //this.#makeHtmlFiles(files)
        //await Promise.all([this.#makeHtmlFiles(), this.#makeJsFiles(), this.#makeImageFiles()])
        const file = await this.zip.generateAsync({type:'blob', platform:this.#getOs()})
        //const file = await this.zip.generateAsync({type:"base64", platform:this.#getOs()})
        //const file = await this.zip.generateAsync({type:"base64"})
        //const file = await this.zip.generateAsync({type:"blob"})
        //const file = await this.zip.generateAsync()
        console.debug(file)
        const url = (window.URL || window.webkitURL).createObjectURL(file);
        const download = document.createElement('a');
        download.href = url;
        download.download = `mylog.zip`;
        download.click();
        (window.URL || window.webkitURL).revokeObjectURL(url);
        Loading.hide()
        //Toaster.toast(`ZIPファイルをダウンロードしました！`)
    }
    async #getIndex() {
        //return 'data:text/plain;charset=utf-8,' + encodeURI(
        const address = (window.mpurse) ? await window.mpurse.getAddress() : ''
        let content = await this.#getContent()
        if (window.mpurse) {content=content.replace(/ to="MEHCqJbgiNERCH3bRAtNSSD9uxPViEX1nu"/g, '')}
        const libs = (window.mpurse) ? `<link rel="stylesheet" href="lib/toastify/1.11.2/min.css">
<script src="lib/toastify/1.11.2/min.js"></script>
<script src="lib/party/party.min.js"></script>
<script src="js/monacoin/mpurse-send-button.js"></script>
<script src="js/monacoin/party-sparkle-image.js"></script>
<script src="js/monacoin/party-sparkle-hart.js"></script>
` : ''
        return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>つぶやき</title>
<link rel="stylesheet" href="css/style.css">
${libs}
<script src="js/main.js"></script>
</head>
<body>
${content}
</body>
</html>`
//<div id="post-list"></div>
//        + document.getElementById('post-list').innerHTML
    }
    async #getContent() {
        const cms = await this.db.dexie.comments.toArray()
        cms.sort((a,b)=>b.created - a.created)
        //return cms.map(c=>TextToHtml.toHtml(c.id, c.content, c.created, true)).join('')
        const address = (window.mpurse) ? await window.mpurse.getAddress() : null
        return cms.map(c=>TextToHtml.toHtml(c.id, c.content, c.created, address, true)).join('')
    }
    async #getStyle() { return this.#getCode(`./css/styles.css`) }
    async #getCode(path) {
        const res = await fetch(path)
        return await res.text()
        //return 'data:text/plain;charset=utf-8,' + encodeURI(await res.text())
    }
    #getMain() { return `window.addEventListener('DOMContentLoaded', async(event) => {
    const db = new MyLogDb()
    const sqlFile = new Sqlite3DbFile()
    document.getElementById('post-list').innerHTML = await db.toHtml()
});`
    }
    /*
    async download(ext='db') { // zip版
        Loading.show()
        this.zip = new JSZip()
        const content = await this.#makeDb()
        this.zip.file(`mylog.${ext}`, content)
        //this.#makeHtmlFiles(files)
        //await Promise.all([this.#makeHtmlFiles(), this.#makeJsFiles(), this.#makeImageFiles()])
        const file = await this.zip.generateAsync({type:'blob', platform:this.#getOs()})
        const url = (window.URL || window.webkitURL).createObjectURL(file);
        const download = document.createElement('a');
        download.href = url;
        download.download = `mylog.zip`;
        download.click();
        (window.URL || window.webkitURL).revokeObjectURL(url);
        Loading.hide()
        Toaster.toast(`ZIPファイルをダウンロードしました！`)
    }
    */
    /*
    async download(ext='db') { // https://stackoverflow.com/questions/24966020/saving-uint8array-to-a-sqlite-file
        Loading.show()
        const content = await this.#makeDb()
        const url = (window.URL || window.webkitURL).createObjectURL(new Blob([content], {type: 'application/octet-stream'}));
        const download = document.createElement('a');
        download.href = url;
        download.download = `mylog.${ext}`;
        download.click();
        (window.URL || window.webkitURL).revokeObjectURL(url);
        Loading.hide()
        Toaster.toast(`DBファイルをダウンロードしました！`)
    }
    */
    async downloadDb(ext='db') { // https://stackoverflow.com/questions/24966020/saving-uint8array-to-a-sqlite-file
        Loading.show()
        const content = await this.#makeDb()
        const url = (window.URL || window.webkitURL).createObjectURL(new Blob([content], {type: 'application/octet-stream'}));
        const download = document.createElement('a');
        download.href = url;
        download.download = `mylog.${ext}`;
        download.click();
        (window.URL || window.webkitURL).revokeObjectURL(url);
        Loading.hide()
        //Toaster.toast(`DBファイルをダウンロードしました！`)
    }
    #getOs() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf("windows nt") !== -1) { return 'DOS' }
        return 'UNIX'
    }
    async #makeDb() {
        if (!this.SQL) { this.SQL = await initSqlJs({locateFile: file => `lib/sql.js/1.7.0/${file}`}) }
        const db = new this.SQL.Database();
        db.exec(`BEGIN;`)
        await this.#makeTableComments(db)
        db.exec(`COMMIT;`)
        return db.export()
    }
    async #makeTableComments(db) {
        db.exec(this.#createSqlComments())
        const cms = await this.db.dexie.comments.toArray()
        for (const c of cms) {
            db.exec(`insert into comments (content, created) values ('${c.content}',${c.created});`)
        }
    }
    #createSqlComments() { return `
create table if not exists comments (
  id integer primary key not null,
  content text not null,
  created integer not null
);`
    }
}
