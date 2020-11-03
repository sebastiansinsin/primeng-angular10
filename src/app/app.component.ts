import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from './product';
import { ProductService } from './product.service';
import { Editor } from 'primeng/editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements AfterViewInit {
  customers: Customer[];
  items: MenuItem[];
  products: Product[];
  first = 0;
  selectedCustomer;
  rows = 10;
  quill_header;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  data_doughnut: any = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }]
  };
  data_line: any = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#4bc0c0'
      },
      {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: '#565656'
      }
    ]
  };
  @ViewChild('header_editor') header_editor: Editor;
  @ViewChild('header_preview') header_preview: ElementRef;
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
  headerTextChangeHandler(event) {

    this.header_preview.nativeElement.innerHTML = this.quill_header.root.innerHTML;
  }
  ngAfterViewInit() {
    this.quill_header = this.header_editor.getQuill();
    this.quill_header.on('text-change', (delta, oldContents, source) => {
      if (source === 'user') {
        this.deleteNode(this.quill_header, delta, oldContents);
      }
    });
  }
  private deleteNode(element, delta, oldContents) {

    // YS: Diff Current & Old
    let current_contents = element.getContents();
    let inverse_diff = current_contents.diff(oldContents);

    // YS: IMPROVEMENT: Can handle 'Del' case, not only 'Backspace'
    // YS: Needed for Retrieving character deleted
    if (inverse_diff.ops[1]) {
      let deleted_char = inverse_diff.ops[1].insert;
      if (deleted_char == ']') {

        var range = element.getSelection();
        if (range) {
          if (range.length == 0) {

          }
        }
        // YS: Where we do the delete logic to erase shortcode
        // YS: Get the position of the first occurence of '[' before the current cursor position
        let current_left_part = element.getText(0, range.index);

        let left_index = current_left_part.lastIndexOf('[');

        if (left_index != -1) {

          element.deleteText(left_index, range.index - left_index);
        }
        // YS: TODO: If left_index not found (-1), don't delete
      }
    }
  }
  addShortCode(input_string, editor_template) {
    let quill_object = editor_template.getQuill();
    var range = quill_object.getSelection();
    if (range) {
      if (range.length == 0) {

        quill_object.insertText(range.index, input_string, {
          'bold': true
        });
      } else {
        var text = quill_object.getText(range.index, range.length);

      }
    }

  }
  selectData(event) {
    this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.data_line.datasets[event.element._datasetIndex].data[event.element._index] });
  }
}
