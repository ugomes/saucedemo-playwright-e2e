import { Page, Locator } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly cartButton: Locator;
    readonly cartBadge: Locator;
    readonly filter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartButton = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        
        
        this.filter = page.locator('[data-test="product-sort-container"]');
    }

    getAddToCartButton(productName: string): Locator {
        const formattedName = productName.toLowerCase().replaceAll(' ', '-');
        return this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    }

    async adicionarProdutoAoCarrinho(productName: string) {
        await this.getAddToCartButton(productName).click();
    }

    async clicarNoCarrinho() {
        await this.cartButton.click();
    }

    async obterQuantidadeProdutosNoCarrinho(): Promise<number> {
        const count = await this.cartBadge.count();
        if (count === 0) {
            return 0;
        }
        const text = await this.cartBadge.innerText();
        return parseInt(text, 10);
    }

    async selecionarFiltro(filtro: string) {
        // Agora vai funcionar porque o seletor está correto
        await this.filter.selectOption(filtro);
    }

    

    
    async obterNomePrimeiroProduto(): Promise<string> {
        // Pega o primeiro elemento da lista de nomes
        return await this.page.locator('.inventory_item_name').first().innerText();
    }

    
    // Isso permite fazer o teste dinâmico de ordenação
    async obterListaProdutos(): Promise<{ nome: string, preco: number }[]> {
        const produtos = [];
        // Seleciona todos os itens de produto
        const items = this.page.locator('.inventory_item');
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            const item = items.nth(i);
            
            // Pega o nome
            const nome = await item.locator('.inventory_item_name').innerText();
            
            // Pega o preço, remove o '$' e transforma em número (float)
            const precoTexto = await item.locator('.inventory_item_price').innerText();
            const preco = parseFloat(precoTexto.replace('$', ''));

            produtos.push({ nome, preco });
        }
        return produtos;
    }
}
