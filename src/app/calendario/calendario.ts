import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DiaCalendario {
  fecha: Date;
  numero: number;
  perteneceAlMes: boolean;
  esHoy: boolean;
  seleccionado: boolean;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css'
})
export class CalendarioComponent {

  // ==========================================
  // CALENDARIO
  // ==========================================

  fechaActual: Date = new Date();

  mesActual: number = this.fechaActual.getMonth();

  anioActual: number = this.fechaActual.getFullYear();

  diaSeleccionado: Date | null = null;

  mostrarFormulario: boolean = false;

  tipoRegistro: string = '';


  // ==========================================
  // PERIODOS
  // ==========================================

  periodoOpciones: string[] = [
    'Inicio del periodo',
    'Continuidad del periodo',
    'Fin del periodo'
  ];

  periodoSeleccionado: string[] = [];


  // ==========================================
  // INTENSIDAD DEL SANGRADO
  // ==========================================

  intensidadesSangrado: string[] = [
    'Manchado',
    'Ligero',
    'Moderado',
    'Abundante'
  ];

  intensidadSangradoSeleccionada: string[] = [];


  // ==========================================
  // ANTICONCEPTIVOS
  // SOLO SE PUEDE ELEGIR UNO
  // ==========================================

  anticonceptivos: string[] = [
    'Inyección mensual',
    'Inyección trimestral',
    'Píldora anticonceptiva',
    'Píldora de emergencia',
    'DIU de cobre',
    'DIU hormonal',
    'Implante anticonceptivo',
    'Parche anticonceptivo',
    'Anillo vaginal',
    'Condón',
    'Otro'
  ];

  anticonceptivoSeleccionado: string = '';


  // ==========================================
  // ESTADO DE ÁNIMO
  // SE PUEDEN ELEGIR VARIOS
  // ==========================================

  estadosAnimo: string[] = [
    '😊 Feliz',
    '😌 Calmado/a',
    '🥰 Cariñoso/a',
    '😄 Animado/a',
    '😐 Neutral',
    '😔 Triste',
    '😠 Irritable',
    '😰 Ansioso/a',
    '😴 Cansado/a',
    '😢 Sensible',
    '🤩 Emocionado/a',
    '😤 Estresado/a'
  ];

  estadoSeleccionado: string[] = [];


  // ==========================================
  // SÍNTOMAS
  // SE PUEDEN ELEGIR VARIOS
  // ==========================================

  sintomas: string[] = [
    'Todo va bien',
    'Cólicos',
    'Dolor de cabeza',
    'Dolor de espalda',
    'Dolor pélvico',
    'Acné',
    'Sensibilidad en los senos',
    'Hinchazón',
    'Náuseas',
    'Mareos',
    'Fatiga',
    'Antojos',
    'Cambios en el apetito',
    'Dolor muscular',
    'Dificultad para dormir',
    'Mucho sueño',
    'Irritabilidad',
    'Ansiedad',
    'Otro'
  ];

  sintomasSeleccionados: string[] = [];


  // ==========================================
  // FLUJO VAGINAL
  // SE PUEDEN ELEGIR VARIOS
  // ==========================================

  flujos: string[] = [
    'Sin flujo',
    'Cremoso',
    'Pegajoso',
    'Acuoso',
    'Elástico',
    'Transparente',
    'Blanco',
    'Blanquecino',
    'Rosado',
    'Marrón',
    'Inusual',
    'Abundante',
    'Escaso',
    'Otro'
  ];

  flujoSeleccionado: string[] = [];


  // ==========================================
  // RELACIONES
  // SE PUEDEN ELEGIR VARIAS
  // ==========================================

  relaciones: string[] = [
    'No he practicado sexo',
    'Sexo con protección',
    'Sexo sin protección',
    'Sexo oral',
    'Masturbación',
    'Contacto genital',
    'Otro'
  ];

  relacionesSeleccionadas: string[] = [];


  // ==========================================
  // NOTAS
  // ==========================================

  notas: string = '';


  // ==========================================
  // CALENDARIO
  // ==========================================

  meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  diasSemana: string[] = [
    'Lun',
    'Mar',
    'Mié',
    'Jue',
    'Vie',
    'Sáb',
    'Dom'
  ];

  diasCalendario: DiaCalendario[] = [];


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor() {
    this.generarCalendario();
  }


  // ==========================================
  // GENERAR CALENDARIO
  // ==========================================

  generarCalendario(): void {

    this.diasCalendario = [];

    const primerDia = new Date(
      this.anioActual,
      this.mesActual,
      1
    );

    const ultimoDia = new Date(
      this.anioActual,
      this.mesActual + 1,
      0
    );


    // JavaScript:
    // Domingo = 0
    // Lunes = 1
    // ...
    // Sábado = 6

    let diaInicio = primerDia.getDay();

    if (diaInicio === 0) {
      diaInicio = 6;
    } else {
      diaInicio = diaInicio - 1;
    }


    // ==========================================
    // DÍAS DEL MES ANTERIOR
    // ==========================================

    const mesAnterior = new Date(
      this.anioActual,
      this.mesActual,
      0
    );

    const diasMesAnterior = mesAnterior.getDate();

    for (let i = diaInicio - 1; i >= 0; i--) {

      const fecha = new Date(
        this.anioActual,
        this.mesActual - 1,
        diasMesAnterior - i
      );

      this.diasCalendario.push({

        fecha: fecha,

        numero: fecha.getDate(),

        perteneceAlMes: false,

        esHoy: this.esHoy(fecha),

        seleccionado: false

      });
    }


    // ==========================================
    // DÍAS DEL MES ACTUAL
    // ==========================================

    for (
      let dia = 1;
      dia <= ultimoDia.getDate();
      dia++
    ) {

      const fecha = new Date(
        this.anioActual,
        this.mesActual,
        dia
      );

      this.diasCalendario.push({

        fecha: fecha,

        numero: dia,

        perteneceAlMes: true,

        esHoy: this.esHoy(fecha),

        seleccionado: false

      });
    }


    // ==========================================
    // DÍAS DEL SIGUIENTE MES
    // ==========================================

    let siguienteDia = 1;

    while (this.diasCalendario.length % 7 !== 0) {

      const fecha = new Date(
        this.anioActual,
        this.mesActual + 1,
        siguienteDia
      );

      this.diasCalendario.push({

        fecha: fecha,

        numero: siguienteDia,

        perteneceAlMes: false,

        esHoy: this.esHoy(fecha),

        seleccionado: false

      });

      siguienteDia++;
    }
  }


  // ==========================================
  // SABER SI ES HOY
  // ==========================================

  esHoy(fecha: Date): boolean {

    const hoy = new Date();

    return (

      fecha.getDate() === hoy.getDate() &&

      fecha.getMonth() === hoy.getMonth() &&

      fecha.getFullYear() === hoy.getFullYear()

    );
  }


  // ==========================================
  // MES ANTERIOR
  // ==========================================

  mesAnterior(): void {

    this.mesActual--;

    if (this.mesActual < 0) {

      this.mesActual = 11;

      this.anioActual--;

    }

    this.generarCalendario();
  }


  // ==========================================
  // MES SIGUIENTE
  // ==========================================

  mesSiguiente(): void {

    this.mesActual++;

    if (this.mesActual > 11) {

      this.mesActual = 0;

      this.anioActual++;

    }

    this.generarCalendario();
  }


  // ==========================================
  // IR A HOY
  // ==========================================

  irHoy(): void {

    const hoy = new Date();

    this.mesActual = hoy.getMonth();

    this.anioActual = hoy.getFullYear();

    this.generarCalendario();
  }


  // ==========================================
  // SELECCIONAR DÍA
  // ==========================================

  seleccionarDia(dia: DiaCalendario): void {

    this.diasCalendario.forEach(d => {

      d.seleccionado = false;

    });

    dia.seleccionado = true;

    this.diaSeleccionado = dia.fecha;

    this.limpiarFormulario();

    this.mostrarFormulario = true;
  }


  // ==========================================
  // FUNCIÓN GENERAL PARA CHECKBOX MÚLTIPLES
  // ==========================================

  toggleOpcion(
    lista: string[],
    opcion: string,
    seleccionado: boolean
  ): void {

    if (seleccionado) {

      if (!lista.includes(opcion)) {

        lista.push(opcion);

      }

    } else {

      const indice = lista.indexOf(opcion);

      if (indice !== -1) {

        lista.splice(indice, 1);

      }
    }
  }


  // ==========================================
  // ESTADO DE ÁNIMO
  // ==========================================

  toggleEstado(
    estado: string,
    seleccionado: boolean
  ): void {

    this.toggleOpcion(
      this.estadoSeleccionado,
      estado,
      seleccionado
    );
  }


  // ==========================================
  // SÍNTOMAS
  //
  // "TODO VA BIEN" ES EXCLUSIVO
  // ==========================================

  toggleSintoma(
    sintoma: string,
    seleccionado: boolean
  ): void {

    if (
      sintoma === 'Todo va bien' &&
      seleccionado
    ) {

      this.sintomasSeleccionados = [
        'Todo va bien'
      ];

      return;
    }


    if (
      sintoma !== 'Todo va bien' &&
      seleccionado
    ) {

      this.sintomasSeleccionados =
        this.sintomasSeleccionados.filter(
          item => item !== 'Todo va bien'
        );
    }


    this.toggleOpcion(
      this.sintomasSeleccionados,
      sintoma,
      seleccionado
    );
  }


  // ==========================================
  // FLUJO
  // ==========================================

  toggleFlujo(
    flujo: string,
    seleccionado: boolean
  ): void {

    this.toggleOpcion(
      this.flujoSeleccionado,
      flujo,
      seleccionado
    );
  }


  // ==========================================
  // RELACIONES
  //
  // "NO HE PRACTICADO SEXO" ES EXCLUSIVO
  // ==========================================

  toggleRelacion(
    relacion: string,
    seleccionado: boolean
  ): void {

    if (
      relacion === 'No he practicado sexo' &&
      seleccionado
    ) {

      this.relacionesSeleccionadas = [
        'No he practicado sexo'
      ];

      return;
    }


    if (
      relacion !== 'No he practicado sexo' &&
      seleccionado
    ) {

      this.relacionesSeleccionadas =
        this.relacionesSeleccionadas.filter(
          item => item !== 'No he practicado sexo'
        );
    }


    this.toggleOpcion(
      this.relacionesSeleccionadas,
      relacion,
      seleccionado
    );
  }


  // ==========================================
  // LIMPIAR FORMULARIO
  // ==========================================

  limpiarFormulario(): void {

    this.tipoRegistro = '';

    this.periodoSeleccionado = [];

    this.intensidadSangradoSeleccionada = [];

    this.anticonceptivoSeleccionado = '';

    this.estadoSeleccionado = [];

    this.sintomasSeleccionados = [];

    this.flujoSeleccionado = [];

    this.relacionesSeleccionadas = [];

    this.notas = '';
  }


  // ==========================================
  // CERRAR FORMULARIO
  // ==========================================

  cerrarFormulario(): void {

    this.mostrarFormulario = false;

    this.limpiarFormulario();
  }


  // ==========================================
  // FECHA SELECCIONADA
  // ==========================================

  obtenerFechaSeleccionada(): string {

    if (!this.diaSeleccionado) {

      return '';

    }

    return this.diaSeleccionado.toLocaleDateString(

      'es-SV',

      {

        weekday: 'long',

        day: 'numeric',

        month: 'long',

        year: 'numeric'

      }

    );
  }


  // ==========================================
  // GUARDAR REGISTRO
  // ==========================================

  guardarRegistro(): void {

    if (!this.tipoRegistro) {

      alert(
        'Selecciona una categoría.'
      );

      return;
    }


    // PERIODOS

    if (
      this.tipoRegistro === 'periodo' &&
      this.periodoSeleccionado.length === 0
    ) {

      alert(
        'Selecciona al menos una opción del periodo.'
      );

      return;
    }


    // ANTICONCEPTIVO

    if (
      this.tipoRegistro === 'anticonceptivo' &&
      this.anticonceptivoSeleccionado === ''
    ) {

      alert(
        'Selecciona un anticonceptivo.'
      );

      return;
    }


    // ESTADO

    if (
      this.tipoRegistro === 'estado' &&
      this.estadoSeleccionado.length === 0
    ) {

      alert(
        'Selecciona cómo te sentiste.'
      );

      return;
    }


    // SÍNTOMAS

    if (
      this.tipoRegistro === 'sintomas' &&
      this.sintomasSeleccionados.length === 0
    ) {

      alert(
        'Selecciona al menos un síntoma.'
      );

      return;
    }


    // FLUJO

    if (
      this.tipoRegistro === 'flujo' &&
      this.flujoSeleccionado.length === 0
    ) {

      alert(
        'Selecciona al menos una característica del flujo.'
      );

      return;
    }


    // RELACIONES

    if (
      this.tipoRegistro === 'relaciones' &&
      this.relacionesSeleccionadas.length === 0
    ) {

      alert(
        'Selecciona al menos una opción.'
      );

      return;
    }


    // ==========================================
    // MOSTRAR INFORMACIÓN EN CONSOLA
    // ==========================================

    console.log(
      '=============================='
    );

    console.log(
      'FECHA:',
      this.diaSeleccionado
    );

    console.log(
      'TIPO:',
      this.tipoRegistro
    );

    console.log(
      'PERIODO:',
      this.periodoSeleccionado
    );

    console.log(
      'INTENSIDAD:',
      this.intensidadSangradoSeleccionada
    );

    console.log(
      'ANTICONCEPTIVO:',
      this.anticonceptivoSeleccionado
    );

    console.log(
      'ESTADO:',
      this.estadoSeleccionado
    );

    console.log(
      'SÍNTOMAS:',
      this.sintomasSeleccionados
    );

    console.log(
      'FLUJO:',
      this.flujoSeleccionado
    );

    console.log(
      'RELACIONES:',
      this.relacionesSeleccionadas
    );

    console.log(
      'NOTAS:',
      this.notas
    );

    console.log(
      '=============================='
    );


    alert(
      'Registro guardado correctamente.'
    );

    this.cerrarFormulario();
  }
}