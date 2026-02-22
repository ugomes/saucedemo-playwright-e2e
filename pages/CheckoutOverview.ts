import { Page, Locator } from "@playwright/test";

export class CheckoutOverview {
    readonly page: Page;
    readonly informacaoPagamento: Locator;
    readonly informacaoEnvio: Locator;
    readonly priceTotal: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.informacaoPagamento = page.locator('[data-test="payment-info-label"]');
        this.informacaoEnvio = page.locator('[data-test="shipping-info-label"]');
        this.priceTotal = page.locator('[data-test="total-info-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    
    async obterInformacaoPagamento(): Promise<string> {
        return await this.informacaoPagamento.innerText();
    }

    async obterInformacaoEnvio(): Promise<string> {
        return await this.informacaoEnvio.innerText();
    }

    async obterPriceTotal(): Promise<string> {
        return await this.priceTotal.innerText();
    }

    async clicarNoFinish() {
        
        await this.finishButton.click();
    }
}