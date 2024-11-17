import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  endpoints = [
    {
      title: 'Temperature (Last Min Avg)',
      url: 'http://localhost:3000/temp/avg/lastmin',
      value: 0,
    },
    {
      title: 'Temperature (Last Hour Avg)',
      url: 'http://localhost:3000/temp/avg/lasthour',
      value: 0,
    },
    {
      title: 'Temperature (Last Hour Max)',
      url: 'http://localhost:3000/temp/max/lasthour',
      value: 0,
    },
    {
      title: 'Humidity (Last Min Avg)',
      url: 'http://localhost:3000/humidity/avg/lastmin',
      value: 0,
    },
    {
      title: 'Humidity (Last Hour Avg)',
      url: 'http://localhost:3000/humidity/avg/lasthour',
      value: 0,
    },
    {
      title: 'Humidity (Last Hour Max)',
      url: 'http://localhost:3000/humidity/avg/lasthour',
      value: 0,
    },
    {
      title: 'Product Count (Last Min Avg)',
      url: 'http://localhost:3000/pc/avg/lastmin',
      value: 0,
    },
    {
      title: 'Product Count (Last Hour Avg)',
      url: 'http://localhost:3000/pc/avg/lasthour',
      value: 0,
    },
    {
      title: 'Product Count (Last Hour Max)',
      url: 'http://localhost:3000/pc/avg/lasthour',
      value: 0,
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchValues();
    setInterval(() => {
      this.fetchValues();
      console.log('ui updated');
    }, 15000);
  }

  fetchValues(): void {
    this.endpoints.forEach((endpoint) => {
      this.http.get<{ value: number }>(endpoint.url).subscribe(
        (data) => {
          endpoint.value = data.value;
        },
        (error) => {
          console.error(`Error fetching data from ${endpoint.url}:`, error);
        }
      );
    });
  }
}
