window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const db = new MyLogDb()
    const sqlFile = new Sqlite3DbFile()
    const downloader = new MyLogDownloader(db)
    const uploader = new MyLogUploader(db, sqlFile)
    const LENGTH = 140
    const LINE = 15
    document.getElementById('content').addEventListener('input', async(event) => {
        document.getElementById('content-length').textContent = LENGTH - event.target.value.length
    })
    document.getElementById('post').addEventListener('click', async(event) => {
        const content = document.getElementById('content').value
        if (!content) { alert('つぶやく内容をテキストエリアに入力してください。'); return; }
        if (LENGTH < content.length) { alert(`つぶやく内容は${LENGTH}字以内にしてください。`); return; }
        const match = content.match(/\r\n|\n/g)
        if (match && LINE < match.length) { alert(`つぶやく内容は${LINE}行以内にしてください。`); return; }
        const now = Math.floor(new Date().getTime() / 1000)
        const insHtml = await db.insert(content, now)
        document.getElementById('post-list').innerHTML = insHtml + document.getElementById('post-list').innerHTML
        document.getElementById('content').value = ''
        document.getElementById('content').focus()
        if (sqlFile.db) {
            const path = document.getElementById('file-input').value
            const name = path.replace(/.*[\/\\]/, '');
            sqlFile.db.exec(`insert into comments(content, created) values('${content}', ${now});`)
            const res = await sqlFile.write(name)
            if (res) { Toaster.toast(`ローカルファイルにも追記しました。: ${name}`) }
        }
    })
    document.getElementById('download').addEventListener('click', async(event) => {
        await downloader.download()
    })
    document.getElementById('delete').addEventListener('click', async(event) => {
        const deletes = Array.from(document.querySelectorAll(`#post-list input[type=checkbox][name=delete]:checked`)).map(d=>parseInt(d.value))
        console.debug(deletes)
        await db.delete(deletes)
        document.getElementById('post-list').innerHTML = await db.toHtml()
        if (sqlFile.db) {
            const path = document.getElementById('file-input').value
            const name = path.replace(/.*[\/\\]/, '');
            sqlFile.db.exec(`BEGIN;`)
            for (const id of deletes) {
                sqlFile.db.exec(`delete from comments where id = ${id};`)
            }
            sqlFile.db.exec(`COMMIT;`)
            const res = await sqlFile.write(name)
            if (res) { Toaster.toast(`ローカルファイルからも削除しました。: ${name}`) }
        }
    })
    Loading.setup()
    uploader.setup()
    document.getElementById('post-list').innerHTML = await db.toHtml()
    document.getElementById('content').focus()
    document.getElementById('content-length').textContent = LENGTH;
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

