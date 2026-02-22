import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { YourCartPage } from "../pages/YourCartPage";
import { CheckoutYourInformation } from "../pages/CheckoutYourInformation";
import { CheckoutOverview } from "../pages/CheckoutOverview";
import { CheckoutComplete } from "../pages/CheckoutComplete";


let loginPage: LoginPage;
let productsPage: ProductsPage;
let yourCartPage: YourCartPage;
let checkoutYourInformation: CheckoutYourInformation;
let checkoutOverview: CheckoutOverview;
let checkoutComplete: CheckoutComplete;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    yourCartPage = new YourCartPage(page);
    checkoutYourInformation = new CheckoutYourInformation(page);
    checkoutOverview = new CheckoutOverview(page);
    checkoutComplete = new CheckoutComplete(page);

    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
});

test.describe('Teste - Fluxo de Compra no Sauce Demo', () => {
    test('Deve adicionar um produto ao carrinho e concluir a compra', async ({ page }) => {
                      
        const produtoNome = 'Sauce Labs Backpack';
        await productsPage.adicionarProdutoAoCarrinho(produtoNome);
        
       
        await expect(page).toHaveURL(/.*inventory.html/);
        const quantidadeNoCarrinho = await productsPage.obterQuantidadeProdutosNoCarrinho();
        expect(quantidadeNoCarrinho).toBe(1);

        
        await productsPage.clicarNoCarrinho();

       
        await expect(yourCartPage.getItemByName(produtoNome)).toBeVisible();
        
        await yourCartPage.clicarNoCheckout();

       
        await checkoutYourInformation.preencherInformacoesCheckout('John', 'Doe', '12345');
        await checkoutYourInformation.clicarNoContinue();

       
        const informacaoPagamento = await checkoutOverview.obterInformacaoPagamento();
        expect(informacaoPagamento).toBe("Payment Information:");

        const informacaoEnvio = await checkoutOverview.obterInformacaoEnvio();
        expect(informacaoEnvio).toBe('Shipping Information:');

        const priceTotal = await checkoutOverview.obterPriceTotal();
        expect(priceTotal).toBe('Price Total'); // Esse seletor pega o título "Price Total"
        
        await checkoutOverview.clicarNoFinish();

        
        const mensagemConclusaoCompra = await checkoutComplete.obterMensagemConclusaoCompra();
        expect(mensagemConclusaoCompra).toBe('Thank you for your order!');
    }); 

    test('Deve remover o produto do carrinho', async ({ page }) => { // CORREÇÃO: Adicionado 'page'
        
        const produtoNome = 'Sauce Labs Backpack';                  
        await productsPage.adicionarProdutoAoCarrinho(produtoNome);              
        await productsPage.clicarNoCarrinho();              
        await yourCartPage.removerProdutoDoCarrinho(produtoNome);
        const quantidadeNoCarrinho = await productsPage.obterQuantidadeProdutosNoCarrinho();
        expect(quantidadeNoCarrinho).toBe(0);

        
        await expect(yourCartPage.getItemByName(produtoNome)).not.toBeVisible();
    });
});