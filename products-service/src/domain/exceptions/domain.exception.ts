export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class CategoryNotFoundError extends DomainError {
  constructor(id: number) {
    super(`Category with id ${id} not found`);
  }
}

export class ProductNotFoundError extends DomainError {
  constructor(id: number) {
    super(`Product with id ${id} not found`);
  }
}

export class InvalidPriceError extends DomainError {
  constructor(amount: number) {
    super(`Invalid price: ${amount}. Price must be positive`);
  }
}

export class InvalidStockError extends DomainError {
  constructor(amount: number) {
    super(`Invalid stock: ${amount}. Price must be positive`);
  }
}

export class DuplicateSlugError extends DomainError {
  constructor(slug: string) {
    super(`Category slug '${slug}' already exists`);
  }
}

export class DuplicateProductCodeError extends DomainError {
  constructor(code: string) {
    super(`Product code '${code}' already exists`);
  }
}