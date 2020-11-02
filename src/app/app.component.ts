import { Component, ViewChild } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  customers: Customer[];
  items: MenuItem[];
  products: Product[];
  first = 0;
  selectedCustomer;
  rows = 10;
  constructor(private customerService: CustomerService, private messageService: MessageService,
    private productService: ProductService) { }

  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => this.customers = customers);
    this.items = [
      { label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewCustomer(this.selectedCustomer) },
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteCustomer(this.selectedCustomer) }
    ];
    this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.customers ? this.first === (this.customers.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
  }
  viewCustomer(customer: Customer) {
    console.log(customer);
    this.messageService.add({ severity: 'info', summary: 'Customer Selected', detail: customer.name });
  }

  deleteCustomer(customer: Customer) {
    console.log(customer);
    this.customers = this.customers.filter((p) => p.id !== customer.id);
    this.messageService.add({ severity: 'info', summary: 'Customer Deleted', detail: customer.name });
    this.selectedCustomer = null;
  }
  rowSelect(event, cm) {
    console.log(event);
    this.selectedCustomer = event.data;
    cm.show(event.originalEvent);
    event.originalEvent.stopPropagation();
  }
}
