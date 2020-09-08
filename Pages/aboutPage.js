class AboutPage {
    static container = document.getElementById("container");
    static renderAboutPage() {
        this.container.innerHTML = `<div class="about">
        <h3>Movie Website</h3>
        <p>This website is an online database of actors and movies, which you can sort by genres, rating and popularity.</p>
        </div>`
    }
}
