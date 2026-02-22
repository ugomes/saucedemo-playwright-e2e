import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
});

test.describe('Teste - Login no Sauce Demo', () => {

    test('Login com credenciais válidas', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

   
    const loginErrors = [
        { 
            cenario: 'campos em branco', 
            user: '', 
            pass: '', 
            msg: 'Epic sadface: Username is required' 
        },
        { 
            cenario: 'senha inválida', 
            user: 'standard_user', 
            pass: 'invalid_password', 
            msg: 'Epic sadface: Username and password do not match any user in this service' 
        },
        { 
            cenario: 'usuário bloqueado', 
            user: 'locked_out_user', 
            pass: 'secret_sauce', 
            msg: 'Epic sadface: Sorry, this user has been locked out.' 
        }
    ];

    
    loginErrors.forEach(({ cenario, user, pass, msg }) => {
        test(`Deve exibir erro ao fazer login com ${cenario}`, async ({ page }) => {
            await loginPage.login(user, pass);

          
            const errorMessage = loginPage.getErrorMessage();
            
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText(msg);
        });
    });

    test('Logout do sistema', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.logout();
        
          await expect(page).toHaveTitle('Swag Labs');
    });

});




