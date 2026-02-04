import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DatePicker } from 'primeng/datepicker';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user';
import { RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [ChartModule, FormsModule, DatePicker],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  date: Date = new Date();
  data: any;
  users: User[] = [];

    options: any;

    constructor(private api: ApiService) {}

    ngOnInit() {
      this.getUsers();
      this.refreshChart();
      this.renderChart();
    }
    renderChart(){
       const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.data = {
            labels: [],
            datasets: [
                {
                    type: 'line',
                    label: 'Átlag munkaidő',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: [50, 25, 12, 48, 56, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: [21, 84, 24, 75, 37, 65, 34],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };
        
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }
    getMonthDays(){}

    getAvgWorkTimes(){}

    getUserWorkTimes(userId:string){}
    
    refreshChart(){
      this.getMonthDays();
      this.getAvgWorkTimes();
      this.users.forEach(item => {
        this.getUserWorkTimes(item.id);
      });
      this.renderChart();
    }

    getUsers(){
      this.api.selectByField('users','status','eq','1').subscribe({
        next:(res) => {
          this.users = res as User[];
        },
        error:(err) => {
          console.log(err);
        }
      });
    }
}
