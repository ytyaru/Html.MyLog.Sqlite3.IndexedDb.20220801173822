window.addEventListener('DOMContentLoaded', async(event) => {
    document.getElementById('post-list').innerHTML = new DbToHtml().toHtml()
});
