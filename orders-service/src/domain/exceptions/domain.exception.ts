export abstract class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class OrderNotFoundError extends DomainError {
    constructor(id: number) {
        super(`Order with id ${id} not found`);
    }
}

export class InvalidOrderIdError extends DomainError {
    constructor(id: number) {
        super(`Invalid order id: ${id}. Id must be positive`);
    }  
}

export class InvalidUserIdError extends DomainError {
    constructor(userId: number) {
        super(`Invalid userId: ${userId}. UserId must be positive`);
    }
}

export class InvalidTotalError extends DomainError {
    constructor(total: number) {
        super(`Invalid total: ${total}. Total must be positive`);
    }
}
