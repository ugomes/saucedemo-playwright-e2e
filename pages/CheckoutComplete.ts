import { Page, Locator } from "@playwright/test";

export class CheckoutComplete {
    readonly page: Page;           
    readonly conclusaoCompraMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        
       
        this.conclusaoCompraMessage = page.locator('[data-test="complete-header"]');
    }

    
    async obterMensagemConclusaoCompra(): Promise<string> {
        return await this.conclusaoCompraMessage.innerText();
    }   
}