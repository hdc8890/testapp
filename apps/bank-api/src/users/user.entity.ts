import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

/**
 * Represents database entity.
 * Do not use this for business logic.
 */
export interface UserEntity extends InMemoryDBEntity {
    name: string;
    email: string;
    // Storing password in plain text is a bad idea.
    // This is just a demo.
    password: string;
}