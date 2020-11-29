import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cocktaildbAngular';
  private REST_API_filters = ['https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list',
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
    '  https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list']
  category = [];
  glass = [];
  alcohalcat = [];
  ingradient = [];
  measure = [];
  selectedcategory = "";
  selectedglass = "";
  selectedalcohalcat = "";
  selectedingradient = "";
  selectedmeasure = "";
  paginationSlected = "a"
  paginationData = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "q", "y", "z"];
  products = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getDrink('a');
  }

  getDrink(alpha) {
    this.paginationSlected = alpha;
    this.dataService.sendGetRequest("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + alpha).subscribe((data: any[]) => {
      console.log(data);
      let drinks = data['drinks'].map((drink) => {
        let obj = {};
        let keys = Object.keys(drink);
        for (let i of keys) {
          if( drink[i]){
            drink[i]=drink[i].toLowerCase();
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
            obj['strIngredient'] = obj['strIngredient'] ? obj['strIngredient'] : [];
            if (drink[i] ) {
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
    })
  }

  filter(elem, filterindex) {
    console.log("==", elem, filterindex);
    elem=elem+"";
    if(elem==""){
      this.getDrink( this.paginationSlected);
    }
    this.products = this.products.filter((item) => {
      if (filterindex == 0) {
        return item["strCategory"] == elem;
      }
      if (filterindex == 2) {
        return item["strAlcoholic"] == elem;
      }

      if (filterindex == 1) {
        return item["strGlass"] == elem;
      }

      if (filterindex == 3) {
        return item['strIngredient'].indexOf(elem) != -1;
      }
      if (filterindex == 4) {
        console.log(item['strMeasure'],item['strMeasure'].indexOf(elem))
        return item['strMeasure'].indexOf(elem) != -1;
      }
    })
    //console.log("=filtered products=", this.products)
  }
}
