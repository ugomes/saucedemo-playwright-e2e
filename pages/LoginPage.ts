import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    
    
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly menu: Locator;
    readonly logoutButton: Locator;
    readonly pageTitle: Locator; 

    constructor(page: Page) {
        this.page = page;               
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
        this.menu = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.pageTitle = page.locator('title'); 
    }

    async login(username: string, password: string) {
        
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    getErrorMessage() {
        return this.errorMessage;
    }
    
    async logout() {
        await this.menu.click();
        await this.logoutButton.click();
    }

    
    getPageTitle() {
        return this.pageTitle;
    }
}
