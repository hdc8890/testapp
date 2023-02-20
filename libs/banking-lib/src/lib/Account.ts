export interface Account {
    id: number;
    name: string;
    accountNumber: string;
    balance: number;
    transactions: Transaction[];
}

export interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
}