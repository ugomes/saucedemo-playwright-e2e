import { Page, Locator } from "@playwright/test";

export class YourCartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('[data-test="inventory-item-name"]');
    }

    async removerProdutoDoCarrinho(nomeProduto: string) {
        const produtoId = nomeProduto.toLowerCase().replaceAll(' ', '-');
        const removeButton = this.page.locator(`[data-test="remove-${produtoId}"]`);
        
        await removeButton.click();
    }

    async clicarNoCheckout() {
        await this.checkoutButton.click();
    }

    getItemByName(nomeProduto: string) {
        return this.cartItems.filter({ hasText: nomeProduto });
    }
}  