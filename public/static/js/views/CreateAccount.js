import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params);
        this.setTitle("Create Account");
    }

    async getHtml() {
        console.log(this.params.username);
        return `
            <main>
                <div class="create-account-page-container">
                    <div class="nav-bar"></div>
                    <div class="create-account-module">
                        <h1 class="create-account-module__heading">Create an Account</h1>
                        <h2 class="create-account-module_sub-heading">Enter account credentials</h2>
                        <form class="create-account-module__form--credentials ">
                            <input type="text" class="create-account-module-form__input credentials--username" placeholder="Username">
                            <input type="password" class="create-account-module-form__input credentials--password-one" placeholder="Password">
                            <input type="password" class="create-account-module-form__input credentials--password-two" placeholder="Confirm Password">
                        </form>
                        <h2 class="create-account-module_sub-heading">Answer some security questions for account recovery purposes </h2>
                        <form class="create-account-module__form--security-questions ">
                            <input type="text" class="create-account-module-form__input security-question--one" placeholder="Security question one?">
                            <input type="text" class="create-account-module-form__input security-question-answer--one" placeholder="Answer to security question one">
                            <input type="text" class="create-account-module-form__input security-question--two" placeholder="Security question two?">
                            <input type="text" class="create-account-module-form__input security-question-answer--two" placeholder="Answer to security question two">
                        </form>
                        <div class="create-account-module__checkbox">
                            <label class="switch">
                                <input type="checkbox" id="accept-terms-checkbox" class="create-account-module__checkbox--checkbox">
                                <span class="slider slider--rounded"></span>
                            </label>
                            <label for="accept-terms-checkbox" class="create-account-module__checkbox--label"> Accept terms and Conditions?</label>        
                        </div>
                        <a href="" class="btn btn--primary-color btn--animated create-account-module__btn" data-link> SIGN UP</a>
                    </div>
                </div>
            </main>
        `;
    }
}