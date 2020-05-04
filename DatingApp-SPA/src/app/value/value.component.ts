import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any; // no type safety, we can put anything we want inside.

  // inject the Http client.
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5000/api/values')
             .subscribe(response => {
                this.values = response;
              }, error => {
                console.log(error);
              });
            }
}


// let count = 2;
// let f: any[] = [1, true, 'a', false];
// function log (message)
// enum Color { Red, Green, Blue};
// let clr = Color.Green; 
// let endsWithC = (message as string).endsWith('c');

// let doLog = (message) => {
//   console.log(message);
// };
// {
//   for (var  i = 0 ; i < 5; i++)
//   {
//     console.log(message);
//   }
// }
