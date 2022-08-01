class HtmlGenerator {
    static generate() {
        const content = document.getElementById('post-list').innerHTML
    }
    static #meta() {
        const now = new Date()
        
        return `<!doctype html>
<html>
<head prefix="og: https://ogp.me/ns# article: https://ogp.me/ns/article#">
<meta charset="utf-8">
<title>つぶやき</title>
<meta name="description" content="つぶやき">
<meta name="author" content="">
<link rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/deed.ja">
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/toot-dialog.css">
<link rel="stylesheet" href="css/ui.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:type" content="article" />
<meta property="og:site_name" content="" />
<meta property="og:title" content="つぶやき" />
<meta property="og:description" content="つぶやき" />
<meta property="og:image" content="" />
<meta property="article:modified_time" content="${now.toISOString()}" />
<meta property="article:published_time" content="${now.toISOString()}" />
<meta property="article:author" content="" />
<meta name="twitter:card" content="summary_large_image" />

<!--
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>
<script src="./lib/tingle/0.16.0/tingle.js"></script>
<link rel="stylesheet" href="./lib/tingle/0.16.0/tingle.css">
-->
<!--<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">-->
<!--<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>-->
<link rel="stylesheet" type="text/css" href="./lib/toastify/1.11.2/min.css">
<script type="text/javascript" src="./lib/toastify/1.11.2/min.js"></script>
<script src="lib/party/party.min.js"></script>
<script src="lib/dexie/3.2.2/min.js"></script>
<script src="lib/sql.js/1.7.0/sql-wasm.min.js"></script>
<script src="lib/jszip/3.9.1/min.js"></script>

<script src="js/caser.js"></script>
<script src="js/loading.js"></script>
<script src="js/toaster.js"></script>
<script src="js/rest-client.js"></script>
<script src="js/misskey-rest-client.js"></script>
<script src="js/misskey-instance.js"></script>
<script src="js/misskey-authorizer.js"></script>
<script src="js/misskey-authorizer-oauth.js"></script>
<script src="js/misskey-authorizer-miauth.js"></script>
<script src="js/misskey-api-client.js"></script>
<script src="js/misskey-note-button.js"></script>
<script src="js/misskey-note-dialog.js"></script>
<script src="js/webmention-requester.js"></script>
<script src="js/mastodon-rest-client.js"></script>
<script src="js/mastodon-authorizer.js"></script>
<script src="js/mastodon-api-client.js"></script>
<script src="js/toot-button.js"></script>
<script src="js/toot-dialog.js"></script>
<script src="js/comment.js"></script>
<script src="js/tweet-button.js"></script>
<script src="js/mention-section.js"></script>
<script src="js/mpurse-send-button.js"></script>
<script src="js/party-sparkle-image.js"></script>
<script src="js/party-sparkle-hart.js"></script>
<script src="js/mastodon-instance.js"></script>
<script src="js/mastodon-profile-generator.js"></script>
<script src="js/misskey-profile-generator.js"></script>
<script src="js/mastodon-redirect-callback-reciver.js"></script>
<script src="js/misskey-redirect-callback-reciver.js"></script>

<!--
<script src="js/profile-register.js"></script>
<script src="js/google-apps-script-client.js"></script>
<script src="js/profile-generator.js"></script>

<script src="js/trezor-client.js"></script>
<script src="js/mona-transaction-db.js"></script>
<script src="js/mona-transaction-client.js"></script>
<script src="js/mona-transaction-viewer.js"></script>
<script src="js/circle-svg-generator.js"></script>

<script src="js/circle-svg-generator-from-db.js"></script>
<script src="js/mona-transaction-viewer-from-db.js"></script>

<script src="js/sqlite3-db-file.js"></script>
<script src="js/sqlite3-db-uploader.js"></script>
<script src="js/sqlite3-db-downloader.js"></script>
-->

<script src="js/app/text-to-html.js"></script>
<script src="js/app/mylog-db.js"></script>
<script src="js/app/mylog-downloader.js"></script>
<script src="js/app/sqlite3-db-file.js"></script>
<script src="js/app/mylog-uploader.js"></script>
<script src="js/main.js"></script>
</head>

`
    }
}
