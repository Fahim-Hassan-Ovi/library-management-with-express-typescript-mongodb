export interface IBooks {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description: string,
    copies: number,
    available: boolean

}

export interface BookInstanceMEthods{
    deductCopies(quantity: number) : Promise<void>
}