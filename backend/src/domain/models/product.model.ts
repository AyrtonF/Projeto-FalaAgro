import { v4 as uuidv4 } from "uuid";
import { InvalidPriceFormatError, InvalidStockAmountError, NegativePriceError, } from "../../errors/product.error";

export type ProductProps = {
  id?: string;
  storeId: string;
  name: string;
  images?: string[];
  description: string;
  price: number;
  amount: number;
  categories?: string[];
  reviews?: Review[];
  quantityAvailable?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Product {
  public props: Required<ProductProps>;

  constructor(props: ProductProps) {
    this.props = {
      ...props,
      id: props.id || uuidv4(),
      images: props.images || [],
      categories: props.categories || [],
      reviews: props.reviews || [],
      quantityAvailable: props.quantityAvailable || 0,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };

    if (!this.isValidPrice(this.props.price)) {
      throw new NegativePriceError();
    }

    if (!this.isValidAmount(this.props.amount)) {
      throw new InvalidStockAmountError();
    }
  }

  toJSON() {
    return this.props;
  }

  toDTO() {
    const {
      id,
      storeId,
      name,
      images,
      description,
      price,
      amount,
      categories,
      quantityAvailable,
    } = this.props;
    return {
      id,
      storeId,
      name,
      images,
      description,
      price,
      amount,
      categories,
      quantityAvailable,
    };
  }

  isValidPrice(value: number): boolean {
    return value >= 0;
  }

  isValidAmount(value: number): boolean {
    return Number.isInteger(value) && value >= 0;
  }

  get id() {
    return this.props.id;
  }

  set id(value: string) {
    this.props.id = value;
  }

  get storeId() {
    return this.props.storeId;
  }

  set storeId(value: string) {
    this.props.storeId = value;
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get price() {
    return this.props.price;
  }

  set price(value: number) {
    if (isNaN(value)) {
      throw new InvalidPriceFormatError();
    }
    if (!this.isValidPrice(this.props.price)) {
      throw new NegativePriceError();
    }
    this.props.price = value;
  }

  get amount() {
    return this.props.amount;
  }

  set amount(value: number) {
    if (!this.isValidAmount(value)) {
      throw new InvalidStockAmountError();
    }
    this.props.amount = value;
  }

  get images() {
    return this.props.images;
  }

  set images(value: string[]) {
    this.props.images = value;
  }

  get categories() {
    return this.props.categories;
  }

  set categories(value: string[]) {
    this.props.categories = value;
  }

  get reviews() {
    return this.props.reviews;
  }

  set reviews(value: Review[]) {
    this.props.reviews = value;
  }

  get quantityAvailable() {
    return this.props.quantityAvailable;
  }

  set quantityAvailable(value: number) {
    this.props.quantityAvailable = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }
}

type Review = {
  rating: number;
  comment: string;
  userId: string;
};
