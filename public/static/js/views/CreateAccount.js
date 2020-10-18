import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("Create Account");
    }

    async getHtml() {
        return `
            <main>
                <div class="create-account-page-container">
                    <div class="nav-bar"></div>
                    <div class="create-account-module">
                        <h1 class="create-account-module__heading">Sign Up</h1>
                        <form class="create-account-module__form--credentials ">
                            <input type="text" class="create-account-module-form__input credentials--username" placeholder="Username">
                            <input type="password" class="create-account-module-form__input credentials--password-one" placeholder="Password">
                            <input type="password" class="create-account-module-form__input credentials--password-two" placeholder="Confirm Password">
                        </form>
                        <form class="create-account-module__form--security-questions ">
                            <input type="text" class="create-account-module-form__input security-question--one" placeholder="Security question one?">
                            <input type="text" class="create-account-module-form__input question-answer--one" placeholder="Answer to security question one">
                            <input type="text" class="create-account-module-form__input security-question--two" placeholder="Security question two?">
                            <input type="text" class="create-account-module-form__input question-answer--two" placeholder="Answer to security question two">
                        </form>
                        <div class="create-account-module__option-btn-box">
                            <div class="create-account-module__checkbox">
                                <label class="switch">
                                    <input type="checkbox" id="remember-me-checkbox" class="create-account-module__checkbox--checkbox">
                                    <span class="slider slider--rounded"></span>
                                </label>
                                <label for="remember-me-checkbox" class="create-account-module__checkbox--label"> Remember me?</label>        
                            </div>
                        </div>
                        <p class="create-account-module__user-agreement-text">By clicking on Sign up you agree with<br>our Terms & Conditions</p>
                        <a href="/create-account" class="btn btn--primary-color btn--animated create-account-module__btn" data-link> SIGN UP</a>
                    </div>
                </div>
            </main>
        `;
    }
}