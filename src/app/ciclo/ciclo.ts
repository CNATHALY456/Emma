import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- 1. Importar CommonModule

interface DaySegment {
  dayNumber: number;
  phase: 'menstruation' | 'infertile1' | 'fertile' | 'infertile2';
  color: string;
  label: string;
  startAngle: number;
  endAngle: number;
}

@Component({
  selector: 'app-ciclo',
  standalone: true,
  imports: [CommonModule], // <--- 2. Agregar aquí
  templateUrl: './ciclo.html',
  styleUrls: ['./ciclo.css']
})
export class CicloComponent implements OnInit {
  @Input() totalDays: number = 28;
  @Input() currentDay: number = 14;
  @Output() daySelected = new EventEmitter<number>();

  days: DaySegment[] = [];
  selectedDayInfo?: DaySegment;

  colors = {
    regla: '#F8BBD0',
    reglaInner: '#E91E63',
    infertile1: '#80DEEA',
    infertile1Inner: '#00ACC1',
    fertile: '#C0CA33',
    fertileInner: '#82B1FF',
    infertile2: '#FFB74D',
    infertile2Inner: '#FB8C00'
  };

  ngOnInit(): void {
    this.generateCycleData();
  }

  generateCycleData(): void {
    const anglePerDay = 360 / this.totalDays;

    for (let i = 1; i <= this.totalDays; i++) {
      let phase: DaySegment['phase'] = 'infertile2';
      let color = this.colors.infertile2;

      if (i >= 1 && i <= 5) {
        phase = 'menstruation';
        color = this.colors.regla;
      } else if (i >= 6 && i <= 10) {
        phase = 'infertile1';
        color = this.colors.infertile1;
      } else if (i >= 11 && i <= 21) {
        phase = 'fertile';
        color = this.colors.fertile;
      }

      const startAngle = (i - 1) * anglePerDay - 90;
      const endAngle = i * anglePerDay - 90;

      this.days.push({
        dayNumber: i,
        phase,
        color,
        label: `Día ${i}`,
        startAngle,
        endAngle
      });
    }

    this.selectDay(this.currentDay);
  }

  selectDay(dayNumber: number): void {
    this.currentDay = dayNumber;
    this.selectedDayInfo = this.days.find(d => d.dayNumber === dayNumber);
    this.daySelected.emit(dayNumber);
  }

  describeArc(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number): string {
    const startOuter = this.polarToCartesian(x, y, outerRadius, endAngle);
    const endOuter = this.polarToCartesian(x, y, outerRadius, startAngle);
    const startInner = this.polarToCartesian(x, y, innerRadius, endAngle);
    const endInner = this.polarToCartesian(x, y, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', startOuter.x, startOuter.y,
      'A', outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
      'L', endInner.x, endInner.y,
      'A', innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
      'Z'
    ].join(' ');
  }

  getTextPosition(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const midAngle = (startAngle + endAngle) / 2;
    return this.polarToCartesian(x, y, radius, midAngle);
  }

  private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }
}