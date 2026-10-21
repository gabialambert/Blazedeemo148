const {test, expect} = require('@playwright/test');

import HomePage from '../pages/home_page';
import ReservePage from '../pages/reserve.page';
import PurchasePage from '../pages/purchase.page';
import ConfirmationPage from '../pages/confirmation.page';

const origem = 'São Paolo'
const destino = 'London'
const flight = '12'
const airline = 'Virgin America'
const departs = '11:23'
const arrives = '1:45'
const price = '$765,32'
const name = 'Beyonce'
const cardType = 'amex'
const amount = '555 USD'

test('Comprar passagem PO', async ({page})=> {
    // Instanciar os objetos do Page Object
    const homePage = new HomePage(page);
    const reservePage = new ReservePage(page);
    const purchasePage = new PurchasePage(page);
    const confirmationPage = new ConfirmationPage(page);


    // Pagina inicial - Home
    await page.goto('https://www.blazedemo.com/');
    await homePage.selecionar_viagem(origem, destino);

    // Pagina de reserva - Reserve
    await expect(page).toHaveURL(/reserve/);
    await expect(page.locator(reservePage.titulosecao))
    .toHaveText(`Flights from ${origem} to ${destino}:`)
    
    // Selecionar voo
    await reservePage.selecionar_voo(flight, airline, departs, 
        arrives, price);

    // Pagina de compra - Purchase
    await expect(page).toHaveURL(purchasePage.url)
    await expect(page.locator(purchasePage.titulosecao))
    .toHaveText('Your flight from TLV to SFO has been reserved.')

    // Preencher dados do passageiro
    await purchasePage.preencher_nome(name)
    await purchasePage.selecionar_bandeira(cardType)
    await purchasePage.lembrar_de_mim()
    await purchasePage.clicar_para_concluir_compra()

    // Pagina de confirmação - Confirmation
    await expect(page).toHaveURL(confirmationPage.url)
    await expect(page.locator(confirmationPage.mensagem))
    .toHaveText('Thank you for your purchase today!')
    await expect(page.getByRole('row', 
        { name: `${confirmationPage.labelprice}` }))
        .toContainText(amount)

})