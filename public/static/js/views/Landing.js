import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("Landing Page");
    }

    async getHtml() {
        return `
            <header>
                <div class="header">
                    <div class="nav-bar"></div>
                    <div class="sign-in-module">
                        <div class="sign-in-module__container--upper">
                            <h1 class="sign-in-module__heading">Log In</h1>
                            <form class="sign-in-module__form">
                                <input type="text" class="sign-in-module__form--username" placeholder="Username">
                                <input type="password" class="sign-in-module__form--password" placeholder="Password">
                            </form>
                            <div class="sign-in-module__option-btn-box">
                                <a href="/forgot-password" class="btn sign-in-module__btn--password-recover" data-link>Forgot Password?</a>
                                <a href="/need-account" class="btn sign-in-module__btn--sign-up-small" data-link>Need an account?</a>
                                <div class="sign-in-module__checkbox">
                                    <label class="switch">
                                        <input type="checkbox" id="remember-me-checkbox" class="sign-in-module__checkbox--checkbox">
                                        <span class="slider slider--rounded"></span>
                                    </label>
                                    <label for="remember-me-checkbox" class="sign-in-module__checkbox--label"> Remember me?</label>        
                                </div>
                            </div>
                            <p class="sign-in-module__user-agreement-text">By clicking on Sign In you agree with<br>our Terms & Conditions</p>
                            <a href="/users" class="btn btn--primary-color btn--animated sign-in-module__btn" data-link> SIGN IN</a>
                            <p class="sign-in-module__sign-in-option-text"> Or with</p>
                        </div>
                        <div class="row sign-in-module__container--lower">
                            <div class="col-1-of-3 colored-line--container">
                                <div class="colored-line--div-right"></div>
                            </div>
                            <div class="col-1-of-3">
                                <div class="row icon-container--social">
                                    <div class="col-1-of-3">
                                        <a href="/sign-in-google" class="sign-in-module__link-account-btn" data-link>
                                            <img src="/img/google.svg" alt="" class="social-media-icon--svg svg--google" >
                                        </a>
                                    </div>
                                    <div class="col-1-of-3">
                                        <a href="/sign-in-facebook" class="sign-in-module__link-account-btn" data-link>
                                            <img src="/img/facebook.svg" alt="" class="social-media-icon--svg svg--facebook" >
                                        </a>
                                    </div>
                                    <div class="col-1-of-3">
                                        <a href="sign-in-paypal" class="sign-in-module__link-account-btn" data-link>
                                            <img src="/img/paypal.svg" alt="" class="social-media-icon--svg svg--paypal" >
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-1-of-3 colored-line--container">
                                <div class="colored-line--div-left"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <section class="section-features">
                    <div class="section-features__header-box">
                        <h2 class="section-features__heading heading-secondary--main">Experience a new way to manage subscriptions</h2>
                        <h2 class="section-features__heading heading-secondary--sub">By having all your subscriptions in one place, we help you
                            keep<br> your budget intact and your stress levels low.</h2>
                    </div>
                    <div class="row section-features__feature-box">
                        <div class="col-1-of-4 section-features__feature-box-feature--1">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <h3 class="heading-tertiary--main">Security First</h3>
                            <p class="paragraph--support-text feature--support-text">Includes Two Factory authentication and payment method hiding so your data stays safe</p>
                        </div>
                        <div class="col-1-of-4 section-features__feature-box-feature--2">
                            <ion-icon name="create-outline"></ion-icon>
                            <h3 class="heading-tertiary--main">Manage your subscription</h3>
                            <p class="paragraph--support-text feature--support-text"> Add subscriptions, remove subscriptions, and even mark subscriptions to timed cancellation</p>
                        </div>
                        <div class="col-1-of-4 section-features__feature-box-feature--3">
                            <ion-icon name="settings-outline"></ion-icon>
                            <h3 class="heading-tertiary--main">Fully customizable</h3>
                            <p class="paragraph--support-text feature--support-text">Change the appearance, rearrange subscription tiles and manage notifications</p>
                        </div>
                        <div class="col-1-of-4 section-features__feature-box-feature--4">
                            <ion-icon name="eye-outline"></ion-icon>
                            <h3 class="heading-tertiary--main">Browse subscription</h3>
                            <p class="paragraph--support-text feature--support-text">View all your subscriptions in one easily manageable place</p>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }
}