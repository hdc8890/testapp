import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

/**
 * Represents database entity.
 * Do not use this for business logic.
 */
export interface AccountEntity extends InMemoryDBEntity {
    name: string;
    balance: number;
    accountNumber: string;
    userId: string;
}