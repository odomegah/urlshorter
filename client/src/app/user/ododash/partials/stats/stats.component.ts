import { NgIf } from "@angular/common";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js/auto";

@Component({
    selector: "odo-stats",
    standalone: true,
    templateUrl: "./stats.component.html",
    imports: [NgIf]
})
export class OdoStats implements OnInit {
    closable: string[] = []
     ctx! : HTMLCanvasElement;
    ctxv! : HTMLCanvasElement;


    constructor(){
       
    }



    ngOnInit(): void {

        this.ctx = document.getElementById('myChart') as HTMLCanvasElement;
        this.ctxv = document.getElementById('myChar') as HTMLCanvasElement;
      this.chartFn()
    }



    close(v: string) {
        if (!this.closable.includes(v)) {
            this.closable.push(v)
        } else {
            const index = this.closable.indexOf(v);
            if (index > -1) {
                this.closable.splice(index, 1);
            }
            // this.closable.
        }
    }


    chartFn(){
        // this.ctx = document.getElementById('myChart') as HTMLCanvasElement;
        // this.ctxv = document.getElementById('myChar') as HTMLCanvasElement;

        // let d = 
        let dArray = [];
        let dData = []



        for (let index = 0; index < new Date(new Date().getFullYear(),new Date().getMonth() + 1,0).getDate(); index++) {
            dArray.push(index+1)            
        }

        for (let index = 0; index < new Date().getDate() ; index++) {
           dData.push(Math.floor(Math.random() *  999))            
        }

        new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: dArray,
                datasets: [{
                    label: 'Visites',
                    data: dData,
                    // borderWidth: 3
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


        new Chart(this.ctxv, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [7, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        
    }


}