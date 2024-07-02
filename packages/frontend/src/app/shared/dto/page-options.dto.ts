import { Order } from "../constants/order.constant";

export class PageOptionsDto {

  order: Order = Order.ASC;
  page: number = 1;
  take: number = 10;

}