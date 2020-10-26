import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <div class="nav-bar">
                <div class="row nav-bar__btn-container--row">
                    <div class="no-gutter-col-1-of-2 nav-bar__btn-container--col">
                        <a class="btn nav-bar__btn nav-bar__btn--notifications" href="">Notifications</a>
                    </div>
                    <div class="no-gutter-col-1-of-2 nav-bar__btn-container--col">
                        <a class="btn nav-bar__btn nav-bar__btn--need-account" href="">Menu</a>
                    </div>
                </div>
            </div>
        `;
    }
    test() {
        console.log("test");
    }
}