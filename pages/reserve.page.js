class ReservePage {

    constructor(page) {
        this.page = page
        this.url = /reserve/
        this.titulosecao = 'h3'
    
    }
    
    // localiza uma linha na tabela com os dados correspondentes
    // nessa linha seleciona clica no botão Choose this flight
    async selecionar_voo(flight, airline, departs, arrives, price) {
        await this.page.getByRole('row', 
            { name: `Choose this flight ${flight} ${airline} 
               ${departs} ${arrives} ${price}` }).getByRole('button').click()
    }

}

module.exports = ReservePage