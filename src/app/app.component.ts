import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cocktaildbAngular';

  category = [];
  glass = [];
  alcohalcat = [];
  ingradient = [];
  measure = [];
  selectedcategory = '';
  selectedglass = '';
  selectedalcohalcat = '';
  selectedingradient = '';
  selectedmeasure = '';
  paginationSlected = 'a';
  paginationData = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  products = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getDrink('a');
  }

  async getDrink(alpha) {
    this.paginationSlected = alpha;
    await this.dataService
      .sendGetRequest(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + alpha
      )
      .then((data: any[]) => {
        console.log(data);
        let drinks = data['drinks'].map((drink) => {
          let obj = {};
          let keys = Object.keys(drink);
          for (let i of keys) {
            if (drink[i]) {
              drink[i] = drink[i].toLowerCase();
            }
            if (/^strAlcoholic/.test(i)) {
              if (drink[i] && this.alcohalcat.indexOf(drink[i]) == -1) {
                this.alcohalcat.push(drink[i]);
              }
            }
            if (/^strGlass/.test(i)) {
              if (drink[i] && this.glass.indexOf(drink[i]) == -1) {
                this.glass.push(drink[i]);
              }
            }
            if (/^strCategory/.test(i)) {
              if (drink[i] && this.category.indexOf(drink[i]) == -1) {
                this.category.push(drink[i]);
              }
            }
            if (/^strMeasure/.test(i)) {
              obj['strMeasure'] = obj['strMeasure'] ? obj['strMeasure'] : [];
              if (drink[i]) {
                obj['strMeasure'].push(drink[i]);
              }
              if (drink[i] && this.measure.indexOf(drink[i]) == -1) {
                this.measure.push(drink[i]);
              }
              continue;
            }
            if (/^strIngredient/.test(i)) {
              obj['strIngredient'] = obj['strIngredient']
                ? obj['strIngredient']
                : [];
              if (drink[i]) {
                obj['strIngredient'].push(drink[i]);
              }
              if (drink[i] && this.ingradient.indexOf(drink[i]) == -1) {
                this.ingradient.push(drink[i]);
              }
              continue;
            }
            obj[i] = drink[i];
          }
          return obj;
        });
        this.products = drinks;
        this.filterData();
      });
  }

  async filter(elem, filterindex) {
    elem = elem + '';
    if (filterindex == 0) {
      this.selectedcategory = elem;
    }
    if (filterindex == 1) {
      this.selectedglass = elem;
    }
    if (filterindex == 2) {
      this.selectedalcohalcat = elem;
    }
    if (filterindex == 3) {
      this.selectedingradient = elem;
    }
    if (filterindex == 4) {
      this.selectedmeasure = elem;
    }
    if (filterindex == 5) {
      this.selectedmeasure = elem;
      this.selectedglass = elem;
      this.selectedingradient = elem;
      this.selectedalcohalcat = elem;
      this.selectedcategory = elem;
    }
    await this.getDrink(this.paginationSlected);
  }

  filterData() {
    this.products = this.products.filter((item) => {
      let catflag = true;
      let glassflag = true;
      let measureflag = true;
      let alcoholflag = true;
      let ingflag = true;
      if (this.selectedcategory != '') {
        catflag = item['strCategory'] == this.selectedcategory ? true : false;
      }
      if (this.selectedglass != '') {
        glassflag = item['strGlass'] == this.selectedglass ? true : false;
      }
      if (this.selectedalcohalcat != '') {
        alcoholflag =
          item['strAlcoholic'] == this.selectedalcohalcat ? true : false;
      }
      if (this.selectedingradient != '') {
        ingflag =
          item['strIngredient'].indexOf(this.selectedingradient) != -1
            ? true
            : false;
      }
      if (this.selectedmeasure != '') {
        measureflag =
          item['strMeasure'].indexOf(this.selectedmeasure) != -1 ? true : false;
      }
      if (glassflag && measureflag && alcoholflag && ingflag && catflag) {
        return item;
      }
    });
  }
}
