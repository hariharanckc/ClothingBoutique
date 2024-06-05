import { query } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Column, Editors, FieldType, Filters, Formatter, Formatters, SingleSelectEditor, SlickCheckboxSelectColumn } from 'angular-slickgrid';
import { elements } from 'chart.js';
import { data, event } from 'jquery';
import { StaffService } from 'src/app/services/staff.service';
import { AngularGridInstance } from 'angular-slickgrid';
import { format } from 'crypto-js';

const starformatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  let stars = '';
  for (let i = 1; i <= value; i++) {
    stars += '<i class="bi bi-star-fill" style="color: gray; "></i>'
  }
  return `<span class="star-rating">${stars}</span>`;
}
// const emojFormat: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
//   `${value === 'good' ? '&#128525;' : value === 'normal' ? '&#128578;' : '&#128577;'}`
const priceFormatter: Formatter = (_cell, _row, value, _col, dataContext) =>
  `<span style="color:${value >= 150 ? "red" : "green"}"  >  ₹ ${value}</span>`;
const centerFormatter: Formatter = (row, cell, value, columnDef, datacontext) =>
  '<div style="text-align:center;">' + value + '</div>';
const myCustomCheckmarkFormatter: Formatter = (_row, _cell, value) => {
  // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below
  return value ? `<i class="mdi mdi-fire red" aria-hidden="true"></i>` : { text: '<i class="mdi mdi-snowflake" aria-hidden="true"></i>', addClasses: 'lightblue', toolTip: 'Freezing' };
}
const viewformater:Formatter=(_row,_cell,value,_col,dataContext)=>{
  return '<i class="bi bi-eye"></i> ' + '</div>';
}

@Component({
  selector: 'app-productsearch',
  templateUrl: './productsearch.component.html',
  styleUrls: ['./productsearch.component.css']
})
export class ProductsearchComponent implements OnInit {
  grid: any;
  datas: any[] = [];
  selectid!: number[];
  pnames = '';
  open: boolean = false;
  angularGrid!: AngularGridInstance; //pagination node
  tableLength = 0;

  constructor(public staffservice: StaffService, public router: Router) { }
  ngOnInit(): void {
    this.getproduct();
  }
  selectedTitles = '';

  columnDefinitions = [
    { id: 'imageURL ', name: 'imageURL', field: 'src', formatter: (args: any) => `<img style="height:10vh;width:4vw;margin-top:2vh;margin-left:2vw" src ="${this.datas[args]}" ></img>`, sortable: true },
    {
      id: 'Pname', name: 'Pname', field: 'Pname', sortable: true, filterable: true,
      //  onCellClick: (event: any, row: any) => {
      //   if (event) {
      //     console.log("hai");
      //     console.log(this.dataset[row.column]);
      //     this.open = true;
      //     this.router.navigate(['individualproduct'], { queryParams: { mydetails: JSON.stringify(this.dataset[row.row]) } })
      //   }
      // }
    },
    {
      //dateformate : 00/00/000 try "filter:{model:Filters.compoundDate},outputType:FieldType.dateEuro, formatter:Formatters.dateEuro,exportWithformatter:true, editor: { model: Editors.date,editorOptions:{ }""
      id: 'date', name: 'Date', field: 'date', sortable: true, filter:{model:Filters.compoundDate},outputType:FieldType.dateEuro, formatter:Formatters.dateEuro,exportWithformatter:true, editor: { model: Editors.date,editorOptions:{ }
    }
    },

    { id: 'OriginalPrice', name: 'OriginalPrice', field: 'OriginalPrice', sortable: true, filterable: true, formatter: centerFormatter },
    { id: 'Offer', name: 'Offer', field: 'Offer', sortable: true, filterable: true, formatter: centerFormatter, editor: { model: Editors.singleSelect } },
    { id: 'Stock', name: 'Stock', field: 'Stock', sortable: true, filterable: true, formatter: centerFormatter },

    { id: 'Price', name: 'Price', field: 'Price', formatter: priceFormatter, centerFormatter, sortable: true, filterable: true, },
    { id: 'Section', name: 'Section', field: 'Section', sortable: true, filterable: true, formatter: centerFormatter, editor: { model: Editors.multipleSelect, collection: [{ value: 'KIDS', label: 'KIDS' }, { value: 'MENS', label: 'MENS' }, { value: 'WOMENS', label: 'WOMENS' }] } },
    { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', formatter: myCustomCheckmarkFormatter, type: FieldType.number, sortable: true, minWidth: 100 },
    // {
    //   id: 'ratting', name: 'Ratting', cssClass: 'text-center', field: 'ratting', sortable: true, formatter: emojFormat, filterable: true, filter: {
    //     model: Filters.singleSelect,
    //     collection: [{ label: '', value: '' }, { label: 'good', value: 'good' }, { label: 'normal', value: 'normal' }, { label: 'bad', value: 'bad' }]
    //   }, editor: {
    //     model: Editors.singleSelect,
    //     collection: [
    //       { label: 'Good', value: 'good' },
    //       { label: 'Normal', value: 'normal' },
    //       { label: 'Bad', value: 'bad' }
    //     ]
    //   }
    // },

    { id: 'rateing', name: 'rateing', field: 'rateing', sortable: true, filterable: true, formatter: starformatter, centerFormatter },
    { id: 'view', name: 'View', field: 'View', sortable: true, filterable: true,formatter:viewformater,
    // onCellClick:(event:any,row:any)=>{
      // if(event){
      //   console.log(event);
      //   console.log(row);
        
      //   console.log(this.dataset[row.row]);
      //   this.open=true
      //   this.router.navigate(['individualproduct'],{queryParams:{mydetails:JSON.stringify(this.dataset[row.row])}})
      // }
    // }
  },

    // { id: 'Ssalary', name: 'Ssalary', field: 'Ssalary', sortable: true , filterable: true,    },
    // { id: 'update', name: 'update', field: 'update',  sortable: true , filterable: true,  
    // formatter: updateFormatter, onCellClick: (event:any,row:any) => {
    // if (event) {
    //   // this.showAddNewForm(this.assetDoc[row.row].location)
    // }
    // }
    // },

  ];

  gridOptions = {
    enableAutoResize: true,
    enableCellNavigation: true,
    enableColumnReorder: false,
    editable: true,
    multiColumnSort: true,
    // gridHeight: 225,
    //   gridWidth: 1000,
    pagination: {
      pageSizes: [5, 10, 20, 25, 50],
      pageSize: 5
    },
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,



    defaultColumnWidth: 300, // Adjust the default column width
    rowHeight: 60,
    enableCheckboxSelector: true, //for enable check box in starting

    checkboxSelector: {
      columnIndexPosition: 0, // default 0 it will able to we can change
      hideSelectAllCheckbox: false,  //hide select all check box  
    },

    multiSelect: true,

    rowSelectionOptions: {
      selectActiveRow: false, //true ( single row selection) / false ( multi row )
    },

    columnPicker: {
      hideForceFitButton: true
    },

    gridMenu: {
      hideForceFitButton: true
    },
  };



  dataset: any[] = [];

  onAngularGrid1Created(angularGrid: any) {
    this.angularGrid = angularGrid.detail;
    this.angularGrid.slickGrid.onClick.subscribe((e: Event, args: any) => {
      const row = args.row;
      const item = this.angularGrid.dataView.getItem(row);
      // this.addCategory(this.lookup[item.id - 1])
      console.log(item);
      this.router.navigate(['individualproduct'],{queryParams:{mydetails:JSON.stringify(item)}})
    });
  }

  getproduct() {
    this.staffservice.getproducts().subscribe((res: any) => {
      console.log(res.rows);
      this.datas = res.rows.map((resImg: any) =>
        resImg.doc.data.imageURL
      )
      this.dataset = res.rows.reverse().map((res: any, index: number) => {
        return {
          id: index + 1,
          imageURL: res.doc.data.imageURL,
          Pname: res.doc.data.Pname,
          OriginalPrice: res.doc.data.OriginalPrice,
          Offer: res.doc.data.Offer,
          Stock: res.doc.data.Stock,
          Price: res.doc.data.Price,
          Section: res.doc.data.Section,
        }
      }
      )
      console.log(this.dataset);

      this.setcolumn();

      //date
      this.dataset.forEach(elements => {
        elements.date = this.getRandomDate();
      });
      console.log(this.dataset);
    })
  }

  //set star
  setcolumn() {
    const rateing: number[] = [1, 2, 3];
    let data = 0;
    this.dataset.forEach(element => {
      const rateingduration = Math.floor(Math.random() * rateing.length)
      const random = rateing[rateingduration]
      data = random;
      element.rateing = data
    });
    console.log(data);
    // this.dataset.push(data)
  }

  gridchanged(gridchanges: any) {

    if (gridchanges) {
      console.log('Grid State changed:: ', gridchanges);
    }
    if (gridchanges.detail.gridState.rowSelection) {
      console.log('Grid State changed:: ', gridchanges);

      this.selectid = (gridchanges.detail.gridState.rowSelection.gridRowIndexes || []) as number[];
      this.selectid = this.selectid.sort((a, b) => a - b);
      console.log(this.selectid);

      this.pnames = this.selectid.map(id => this.dataset[id].Pname).join(', ');
    }
    console.log(this.pnames);
  }

  //date
  getRandomDate(): string {
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomYear = Math.floor(Math.random() * (new Date().getFullYear() - 1970)) + 1970;
    const formattedDate = `${randomDay.toString().padStart(2, '0')}/${randomMonth.toString().padStart(2, '0')}/${randomYear}`;
    return formattedDate;
  }

  //slickgrid

  onAngularGridCreated(angularGrid: any) {
    this.angularGrid = angularGrid.detail;
    this.tableLength = this.paginationService.totalItems
    //  this.paginationService._availablePageSizes = this.pageSizeOptions;
    // this.paginationService._itemsPerPage = 10;
  }
  get paginationService(): any {
    return this.angularGrid.paginationService;
  }

  nextPage() {
    this.paginationService.goToNextPage(true);   
    // this.paginationService._itemsPerPage = 5

  }

  prvPage() {
    this.paginationService.goToPreviousPage(true);
  }

  lastPage() {
    this.paginationService.goToLastPage(true);
  }

  firstPage() {
    this.paginationService.goToFirstPage(true);
  }
  
  goToPage(pageNumber: number) {
    this.paginationService?.goToPageNumber(pageNumber);
  }
}
