import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service'; 
import { stringify } from 'querystring';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  parsedString:string = '';
  bracketFlag: boolean = true
  

  constructor(private http: HttpClient, public global: GlobalService) { }

  public getCalculation(text: String, precision: number)
  {
    if( this.global.precision == false ){
      return this.http.get('https://api.mathjs.org/v4/?expr='+this.parseText(text));
    }
    else return this.http.get('https://api.mathjs.org/v4/?expr='+this.parseText(text) + '&precision=' + precision);     
  }

  public parseText(text: String)
  {
    this.parsedString = '';
    for (let i = 0; i < text.length; i++) {
      if(text[i] == "+"){
        this.parsedString += "%2B";

      }
      else if(text[i] == "÷"){
        this.parsedString += "%2F";
      }
      else if(text[i] == "x"){
        this.parsedString += "*";
      }
      else if(text[i] == "π"){
        this.parsedString += "pi";
      }
      else this.parsedString += text[i];
    }



    for (let i = text.length - 1; i >= 0; i--) {
      if(text[i] == ")"){
        this.bracketFlag = false;
      }
      if(text[i] == "(" && this.bracketFlag == true){
        this.parsedString += ")";
        break;
      }
    }

    return this.parsedString;
  }
}
