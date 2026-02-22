import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

let loginPage: LoginPage;
let productsPage: ProductsPage;


 test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');
    });

test.describe('Teste de Ordenação de Produtos', () => {
     

        test('Deve ordenar por Nome (A a Z)', async () => {
            // 1. Aplica o filtro
            await productsPage.selecionarFiltro('az');

            // 2. Pega os dados da tela (Estado Atual)
            const produtosNaTela = await productsPage.obterListaProdutos();

            // 3. Cria uma cópia e ordena usando JavaScript (Estado Esperado)
            const produtosEsperados = [...produtosNaTela].sort((a, b) =>
                a.nome.localeCompare(b.nome)
            );

            // 4. Compara
            expect(produtosNaTela).toEqual(produtosEsperados);
        });

        test('Deve ordenar por Nome (Z a A)', async () => {
            await productsPage.selecionarFiltro('za');

            const produtosNaTela = await productsPage.obterListaProdutos();

            // Inverte a comparação (b vem antes de a)
            const produtosEsperados = [...produtosNaTela].sort((a, b) =>
                b.nome.localeCompare(a.nome)
            );

            expect(produtosNaTela).toEqual(produtosEsperados);
        });

        test('Deve ordenar por Preço (Menor para Maior)', async () => {
            await productsPage.selecionarFiltro('lohi');

            const produtosNaTela = await productsPage.obterListaProdutos();

            // Lógica matemática: se a.preco - b.preco for negativo, 'a' é menor
            const produtosEsperados = [...produtosNaTela].sort((a, b) =>
                a.preco - b.preco
            );

            expect(produtosNaTela).toEqual(produtosEsperados);
        });

        test('Deve ordenar por Preço (Maior para Menor)', async () => {
            await productsPage.selecionarFiltro('hilo');

            const produtosNaTela = await productsPage.obterListaProdutos();

            // Inverte a subtração (b.preco - a.preco)
            const produtosEsperados = [...produtosNaTela].sort((a, b) =>
                b.preco - a.preco
            );

            expect(produtosNaTela).toEqual(produtosEsperados);
        });
});

