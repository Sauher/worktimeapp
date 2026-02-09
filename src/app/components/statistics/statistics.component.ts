import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DatePicker } from 'primeng/datepicker';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user';
import moment from 'moment';
import { WorkTime } from '../../interfaces/worktime';

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
  monthDays: string[] = [];
  sumMinutesPerDay : number[] = []
  countUserWithDataPerDay : number[] = []
  avgWorkTimePerDays : number[] = []


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
    getMonthDays(){
      const y = this.date.getFullYear()
      const m = this.date.getMonth();
      this.monthDays = []
      const first = new Date(y,m,1)
      const last = new Date(y,m+1,0)

      for(let d = first; d<= last; d.setDate(d.getDate()+1)){
        this.monthDays.push(moment(d).format('MM-DD'))
      }
      
    }

    getAvgWorkTimes(){}

    getUserWorkTimes(userId:string){
      this.api.selectByField('worktimes','userId','eq',userId).subscribe({
        next: (res)=>{
          const worktimes = res as WorkTime[]


          const filteredWorktimes = worktimes.filter(w=> moment(w.date).format('YYYY-MM') == moment(this.data).format('YYYY-MM'))
          
          filteredWorktimes.forEach(fw => {
            
          })
        }
      })
    }
    
    refreshChart(){


      this.getMonthDays();

      this.sumMinutesPerDay = new Array(this.monthDays.length).fill(0)
      this.countUserWithDataPerDay = new Array(this.monthDays.length).fill(0)
      this.avgWorkTimePerDays  = new Array(this.monthDays.length).fill(0)

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
