import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

/**
 * Represents database entity.
 * Do not use this for business logic.
 */
export interface UserEntity extends InMemoryDBEntity {
    name: string;
    email: string;
    password: string;
}