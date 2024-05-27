import { v4 as uuidv4 } from "uuid";
import { InvalidPriceFormatError, InvalidStockAmountError, NegativePriceError, } from "../../errors/errors";

export type ProductProps = {
  id?: string;
  storeId: string;
  name: string;
  images?: string[];
  description?: string;
  price: number;
  amount: number;
  categories?: string[];
  reviews?: Review[];
  quantityAvailable?: number;
  createdAt?: Date;
  updatedAt?: Date;
  discount?: number; // Desconto em percentual ou valor
  attributes?: { [key: string]: string }; // Atributos adicionais como cor, tamanho, etc.
  shippingInfo?: {
    weight?: number; // Peso do produto
    dimensions?: { length: number; width: number; height: number }; // Dimensões do produto
    shippingCost?: number; // Custo de envio
  };
  status?: 'active' | 'inactive' | 'soldOut'; // Estado do produto
  sku?: string; // Identificador único do produto
  brand?: string; // Marca do produto
  vendor?: {
    vendorId: string;
    name: string;
  };
  averageRating?: number; // Média das avaliações dos usuários
  tags?: string[]; // Etiquetas para categorização e busca
};

export class Product {
  public props: Required<ProductProps>;

  constructor(props: ProductProps) {
    this.props = {
      ...props,
      id: props.id || uuidv4(),
      images: props.images || [],
      description:props.description || 'Nenhuma descrição',
      categories: props.categories || [],
      reviews: props.reviews || [],
      quantityAvailable: props.quantityAvailable || 0,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      discount: props.discount || 0,
      attributes: props.attributes || {},
      shippingInfo: props.shippingInfo || {
        weight: 0,
        dimensions: { length: 0, width: 0, height: 0 },
        shippingCost: 0,
      },
      status: props.status || 'active',
      sku: props.sku || '',
      brand: props.brand || '',
      vendor: props.vendor || { vendorId: '', name: '' },
      averageRating: props.averageRating || 0,
      tags: props.tags || [],
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
      discount,
      attributes,
      shippingInfo,
      status,
      sku,
      brand,
      vendor,
      averageRating,
      tags,
      createdAt,
      updatedAt,
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
      discount,
      attributes,
      shippingInfo,
      status,
      sku,
      brand,
      vendor,
      averageRating,
      tags,
      createdAt,
      updatedAt,
    };
  }

  isValidPrice(value: number): boolean {
    return value >= 0;
  }

  isValidAmount(value: number): boolean {
    return true;
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
    if (!this.isValidPrice(value)) {
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

  get discount() {
    return this.props.discount;
  }

  set discount(value: number) {
    this.props.discount = value;
  }

  get attributes() {
    return this.props.attributes;
  }

  set attributes(value: { [key: string]: string }) {
    this.props.attributes = value;
  }

  get shippingInfo() {
    return this.props.shippingInfo;
  }

  set shippingInfo(value: {
    weight?: number;
    dimensions?: { length: number; width: number; height: number };
    shippingCost?: number;
  }) {
    this.props.shippingInfo = value;
  }

  get status() {
    return this.props.status;
  }

  set status(value: "active" | "inactive" | "soldOut") {
    this.props.status = value;
  }

  get sku() {
    return this.props.sku;
  }

  set sku(value: string) {
    this.props.sku = value;
  }

  get brand() {
    return this.props.brand;
  }

  set brand(value: string) {
    this.props.brand = value;
  }

  get vendor() {
    return this.props.vendor;
  }

  set vendor(value: { vendorId: string; name: string }) {
    this.props.vendor = value;
  }

  get averageRating() {
    return this.props.averageRating;
  }

  set averageRating(value: number) {
    this.props.averageRating = value;
  }

  get tags() {
    return this.props.tags;
  }

  set tags(value: string[]) {
    this.props.tags = value;
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
