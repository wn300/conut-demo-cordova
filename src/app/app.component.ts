import { Component, ViewChild, ElementRef } from '@angular/core';
import { Pesos, Planilla, PesosSumas, Totales } from './modelos/basculas';

import * as jsPDF from 'jspdf';
import { debug } from 'util';

declare var cordova

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public bascula_uno: boolean = true;
  public print: boolean = false;

  //1  
  public objetoPlanillaPDF: PesosSumas[] = [];
  public objetoPlanillaPDFPollo: PesosSumas[] = [];
  public objetoPlanillaPDFMenudencias: PesosSumas[] = [];
  public rango_for_uno: boolean = false;
  public disabled_uno: boolean = false;
  public id_uno: number = 0;
  public total_uno: number = 0;
  public total_canastas_uno: number = 0;
  public objetoPlanilla: Planilla[] = [];
  public conductor_uno: string = '';
  public vehiculo_uno: string = '';
  public temperatura_uno: string = '';
  public cliente_uno: string = '';
  public consecutivo_uno: number = null;
  public fecha_uno: string = '';
  public hora_uno: string = '';
  public lugar_uno: string = '';
  public temperatura_vehiculo_uno: string = '';
  public observacions_uno: string = "";
  public producto_uno: string = '';
  public rango_uno: string = '';
  public cantidad_uno: number = null;
  public peso_uno: number = null;
  public peso_promedio_uno: number = null;
  public canasta_uno: number = null;
  public negativo_uno: number = null;
  public nivel_uno: number;

  public totCantUnoPollo: number = 0;
  public totPesoUnoPollo: number = 0;
  public totPesoPromedioUnoPollo: number = 0;
  public totCanastasUnoPollo: number = 0;

  public totPesoUnoPolloMenudencias: number = 0;
  public totCanastasUnoPolloMenudencias: number = 0;

  public totalesUno: Totales[] = [];

  //2
  public objetoPlanillaDosPDF: PesosSumas[] = [];
  public objetoPlanillaPDFDosPollo: PesosSumas[] = [];
  public objetoPlanillaPDFDosMenudencias: PesosSumas[] = [];
  public rango_for_dos: boolean = false;
  public disabled_dos: boolean = false;
  public id_dos: number = 0;
  public total_dos: number = 0;
  public total_canastas_dos: number = 0;
  public objetoPlanillaDos: Planilla[] = [];
  public conductor_dos: string = '';
  public vehiculo_dos: string = '';
  public temperatura_dos: string = '';
  public cliente_dos: string = '';
  public consecutivo_dos: number = null;
  public fecha_dos: string = '';
  public hora_dos: string = '';
  public lugar_dos: string = '';
  public temperatura_vehiculo_dos: string = '';
  public observacions_dos: string = "";
  public producto_dos: string = '';
  public rango_dos: string = '';
  public cantidad_dos: number = null;
  public peso_dos: number = null;
  public peso_promedio_dos: number = null;
  public canasta_dos: number = null;
  public negativo_dos: number = null;
  public nivel_dos: number;

  public totCantDosPollo: number = 0;
  public totPesoDosPollo: number = 0;
  public totPesoPromedioDosPollo: number = 0;
  public totCanastasDosPollo: number = 0;

  public totPesoDosPolloMenudencias: number = 0;
  public totCanastasDosPolloMenudencias: number = 0;

  public totalesDos: Totales[] = [];

  constructor() {
    document.addEventListener('deviceready', function () {
    }, false);
    //1
    if (JSON.parse(localStorage.getItem("PlanillaUno")) !== null && JSON.parse(localStorage.getItem("PlanillaUno")) !== 'null') {
      this.objetoPlanilla = JSON.parse(localStorage.getItem("PlanillaUno"));
      if (this.objetoPlanilla.length > 0) {
        this.consecutivo_uno = this.objetoPlanilla[0].consecutivo;
        this.fecha_uno = this.objetoPlanilla[0].fecha;
        this.hora_uno = this.objetoPlanilla[0].hora;
        this.lugar_uno = this.objetoPlanilla[0].lugar;
        this.temperatura_vehiculo_uno = this.objetoPlanilla[0].temperatura_vehiculo;
        this.conductor_uno = this.objetoPlanilla[0].conductor;
        this.temperatura_uno = this.objetoPlanilla[0].temperatura;
        this.vehiculo_uno = this.objetoPlanilla[0].vehiculo;
        this.cliente_uno = this.objetoPlanilla[0].cliente;
        this.disabled_uno = true;
        this.rango_for_uno = true;
        this.observacions_uno = this.objetoPlanilla[0].observaciones;
      }
    }
    if (localStorage.getItem("TotalUno") !== null && localStorage.getItem("TotalUno") !== 'null') {
      this.total_uno = parseFloat(localStorage.getItem("TotalUno"));
    }
    //2
    if (JSON.parse(localStorage.getItem("PlanillaDos")) !== null && JSON.parse(localStorage.getItem("PlanillaDos")) !== 'null') {
      this.objetoPlanillaDos = JSON.parse(localStorage.getItem("PlanillaDos"));

      if (this.objetoPlanillaDos.length > 0) {

        this.consecutivo_dos = this.objetoPlanillaDos[0].consecutivo;
        this.fecha_dos = this.objetoPlanillaDos[0].fecha;
        this.hora_dos = this.objetoPlanillaDos[0].hora;
        this.lugar_dos = this.objetoPlanillaDos[0].lugar;
        this.temperatura_vehiculo_dos = this.objetoPlanillaDos[0].temperatura_vehiculo;


        this.conductor_dos = this.objetoPlanillaDos[0].conductor;
        this.temperatura_dos = this.objetoPlanillaDos[0].temperatura;
        this.vehiculo_dos = this.objetoPlanillaDos[0].vehiculo;
        this.cliente_dos = this.objetoPlanillaDos[0].cliente;
        this.disabled_dos = true;
        this.rango_for_dos = true;

        this.observacions_dos = this.objetoPlanillaDos[0].observaciones;
      }
    }
    if (localStorage.getItem("TotalDos") !== null && localStorage.getItem("TotalDos") !== 'null') {
      this.total_dos = parseFloat(localStorage.getItem("TotalDos"));
    }
  }
  bascularUno() {
    this.bascula_uno = true;
  }
  bascularDos() {
    this.bascula_uno = false;
  }
  //1
  validacionEncabezadoUno() {
    if (this.conductor_uno !== ''
      && this.vehiculo_uno !== ''
      && this.temperatura_uno !== ''
      && this.cliente_uno !== ''
      && this.fecha_uno !== ''
      && this.lugar_uno !== ''
      && this.temperatura_vehiculo_uno !== ''
      && this.consecutivo_uno !== null) {

      if (this.objetoPlanilla.length === 0 && !this.rango_for_uno) {
        this.objetoPlanilla.push({
          consecutivo: this.consecutivo_uno,
          fecha: this.fecha_uno,
          lugar: this.lugar_uno,
          temperatura_vehiculo: this.temperatura_vehiculo_uno,
          conductor: this.conductor_uno,
          vehiculo: this.vehiculo_uno,
          temperatura: this.temperatura_uno,
          cliente: this.cliente_uno,
          observaciones: this.observacions_uno,
          pesos: []
        })
      }

      this.rango_for_uno = true;

      if (this.objetoPlanilla[0].pesos.length === 0) {
        this.objetoPlanilla = [];
        this.objetoPlanilla.push({
          consecutivo: this.consecutivo_uno,
          fecha: this.fecha_uno,
          lugar: this.lugar_uno,
          temperatura_vehiculo: this.temperatura_vehiculo_uno,
          conductor: this.conductor_uno,
          vehiculo: this.vehiculo_uno,
          temperatura: this.temperatura_uno,
          cliente: this.cliente_uno,
          observaciones: this.observacions_uno,
          pesos: []
        })
      }

      if (localStorage.getItem("PlanillaUno") === 'null' || localStorage.getItem("PlanillaUno") === null) {
        localStorage.setItem("PlanillaUno", JSON.stringify(this.objetoPlanilla));
      }
    } else {
      this.rango_for_uno = false;
      localStorage.setItem("PlanillaUno", null);
    }
  }
  horaUno() {
    if (this.objetoPlanilla.length > 0) {
      localStorage.setItem("PlanillaUno", null);
      this.objetoPlanilla[0].hora = this.hora_uno;
      localStorage.setItem("PlanillaUno", JSON.stringify(this.objetoPlanilla));
    }
  }
  //2
  validacionEncabezadoDos() {
    if (this.conductor_dos !== ''
      && this.vehiculo_dos !== ''
      && this.temperatura_dos !== ''
      && this.cliente_dos !== ''
      && this.fecha_dos !== ''
      && this.lugar_dos !== ''
      && this.temperatura_vehiculo_dos !== ''
      && this.consecutivo_dos !== null) {

      if (this.objetoPlanillaDos.length === 0 && !this.rango_for_dos) {
        this.objetoPlanillaDos.push({


          consecutivo: this.consecutivo_dos,
          fecha: this.fecha_dos,
          lugar: this.lugar_dos,
          temperatura_vehiculo: this.temperatura_vehiculo_dos,



          conductor: this.conductor_dos,
          vehiculo: this.vehiculo_dos,
          temperatura: this.temperatura_dos,
          cliente: this.cliente_dos,


          observaciones: this.observacions_dos,

          pesos: []
        })
      }

      this.rango_for_dos = true;

      if (this.objetoPlanillaDos[0].pesos.length === 0) {
        this.objetoPlanillaDos = [];
        this.objetoPlanillaDos.push({

          consecutivo: this.consecutivo_dos,
          fecha: this.fecha_dos,
          lugar: this.lugar_dos,
          temperatura_vehiculo: this.temperatura_vehiculo_dos,


          conductor: this.conductor_dos,
          vehiculo: this.vehiculo_dos,
          temperatura: this.temperatura_dos,
          cliente: this.cliente_dos,

          observaciones: this.observacions_dos,

          pesos: []
        })
      }

      if (localStorage.getItem("PlanillaDos") === 'null' || localStorage.getItem("PlanillaDos") === null) {
        localStorage.setItem("PlanillaDos", JSON.stringify(this.objetoPlanillaDos));
      }
    } else {
      this.rango_for_dos = false;
      localStorage.setItem("PlanillaDos", null);
    }
  }
  horaDos() {
    if (this.objetoPlanilla.length > 0) {
      localStorage.setItem("PlanillaDos", null);
      this.objetoPlanillaDos[0].hora = this.hora_dos;
      localStorage.setItem("PlanillaDos", JSON.stringify(this.objetoPlanillaDos));
    }
  }
  //1
  validacionDetallesUno() {
    if (this.producto_uno !== ''
      && this.rango_uno !== ''
      && this.canasta_uno !== null
      && this.peso_uno !== null
      && this.negativo_uno !== null) {

      let tamaño: number = 0

      switch (this.rango_uno) {
        case "Rango 1": {
          tamaño = 16;
          this.nivel_uno = 1
          break;
        }
        case "Rango 2": {
          tamaño = 20;
          this.nivel_uno = 2
          break;
        }
        case "Rango 3": {
          tamaño = 20;
          this.nivel_uno = 3
          break;
        }
        case "Rango 4": {
          tamaño = 20;
          this.nivel_uno = 4
          break;
        }
        case "Rango 5": {
          tamaño = 20;
          this.nivel_uno = 5
          break;
        }
        case "Rango 6": {
          tamaño = 20;
          this.nivel_uno = 6
          break;
        }
        case "Rango 7": {
          tamaño = 20;
          this.nivel_uno = 7
          break;
        }
        case "Rango 8": {
          tamaño = 20;
          this.nivel_uno = 8
          break;
        }
        case "Rango 9": {
          tamaño = 20;
          this.nivel_uno = 9
          break;
        }
        case "Rango 10": {
          tamaño = 20;
          this.nivel_uno = 10
          break;
        }
        case "Rango 11": {
          if (this.cliente_uno === 'POLLOS SAVICOL S.A.') {
            tamaño = 20;
          } else {
            tamaño = 16;
          }
          this.nivel_uno = 11
          break;
        }
        case "Rango 12": {
          tamaño = 16;
          this.nivel_uno = 12
          break;
        }
        case "Rango 12 Peq": {
          tamaño = 16;
          this.nivel_uno = 13
          break;
        }
        case "Rango 12 Gran": {
          tamaño = 16;
          this.nivel_uno = 14
          break;
        }
        case "Rango 13": {
          if (this.cliente_uno === 'POLLOS SAVICOL S.A.') {
            tamaño = 20;
          } else {
            tamaño = 16;
          }
          this.nivel_uno = 15
          break;
        }
        case "Rango 14": {
          tamaño = 14;
          this.nivel_uno = 16
          break;
        }
        case "Maltrato 14": {
          tamaño = 14;
          this.nivel_uno = 17
          break;
        }
        case "Maltrato 16": {
          tamaño = 16;
          this.nivel_uno = 18
          break;
        }
        case "Maltrato 20": {
          tamaño = 20;
          this.nivel_uno = 19
          break;
        }
        case "A Granel": {
          tamaño = 1;
          if (this.producto_uno === 'Menudencia Completa') {
            this.nivel_uno = 20
          }
          if (this.producto_uno === 'Menudencia Incompleta') {
            this.nivel_uno = 21
          }
          if (this.producto_uno === 'Higados') {
            this.nivel_uno = 22
          }
          if (this.producto_uno === 'Patas') {
            this.nivel_uno = 23
          }
          if (this.producto_uno === 'Pescuezos') {
            this.nivel_uno = 24
          }
          if (this.producto_uno === 'Corazones') {
            this.nivel_uno = 25
          }
          if (this.producto_uno === 'Mollejas') {
            this.nivel_uno = 26
          }
          break;
        }
        case "Paquete": {
          tamaño = 100;
          if (this.producto_uno === 'Menudencia Completa') {
            this.nivel_uno = 27
          }
          if (this.producto_uno === 'Menudencia Incompleta') {
            this.nivel_uno = 28
          }
          if (this.producto_uno === 'Higados') {
            this.nivel_uno = 29
          }
          if (this.producto_uno === 'Patas') {
            this.nivel_uno = 30
          }
          if (this.producto_uno === 'Pescuezos') {
            this.nivel_uno = 31
          }
          if (this.producto_uno === 'Corazones') {
            this.nivel_uno = 32
          }
          if (this.producto_uno === 'Mollejas') {
            this.nivel_uno = 33
          }
          break;
        }

        default: {
          tamaño = 0;
          break;
        }
      }

      this.cantidad_uno = (this.canasta_uno * tamaño) - this.negativo_uno;
      this.peso_promedio_uno = this.cantidad_uno / this.peso_uno;

      let ids: Array<number> = [];
      this.objetoPlanilla[0].pesos.forEach((element) => {
        ids.push(element.id)
      })
      this.id_uno = Math.max.apply(null,ids)

      this.objetoPlanilla[0].pesos.push({
        id: this.id_uno + 1,
        producto: this.producto_uno,
        rango: this.rango_uno,
        cantidad: this.cantidad_uno,
        peso: this.peso_uno,
        peso_promedio: this.peso_promedio_uno,
        canasta: this.canasta_uno,
        negativo: this.negativo_uno,
        nivel: this.nivel_uno,
      })

      this.total_canastas_uno = (this.canasta_uno * 2);
      this.total_uno = this.total_uno + (this.peso_uno + this.total_canastas_uno);

      this.total_canastas_uno = 0;

      this.producto_uno = '',
        this.rango_uno = '',
        this.canasta_uno = null,
        this.peso_uno = null,
        this.peso_promedio_uno = null,
        this.cantidad_uno = null,
        this.negativo_uno = null,

        this.disabled_uno = true;
      this.id_uno += 1;

      localStorage.setItem("PlanillaUno", null);
      localStorage.setItem("PlanillaUno", JSON.stringify(this.objetoPlanilla));
      localStorage.setItem("TotalUno", null);
      localStorage.setItem("TotalUno", this.total_uno.toString());
    }
  }
  //2
  validacionDetallesDos() {
    if (this.producto_dos !== ''
      && this.rango_dos !== ''
      && this.canasta_dos !== null
      && this.peso_dos !== null
      && this.negativo_dos !== null) {

      let tamaño: number = 0

      switch (this.rango_dos) {
        case "Rango 1": {
          tamaño = 16;
          this.nivel_dos = 1
          break;
        }
        case "Rango 2": {
          tamaño = 20;
          this.nivel_dos = 2
          break;
        }
        case "Rango 3": {
          tamaño = 20;
          this.nivel_dos = 3
          break;
        }
        case "Rango 4": {
          tamaño = 20;
          this.nivel_dos = 4
          break;
        }
        case "Rango 5": {
          tamaño = 20;
          this.nivel_dos = 5
          break;
        }
        case "Rango 6": {
          tamaño = 20;
          this.nivel_dos = 6
          break;
        }
        case "Rango 7": {
          tamaño = 20;
          this.nivel_dos = 7
          break;
        }
        case "Rango 8": {
          tamaño = 20;
          this.nivel_dos = 8
          break;
        }
        case "Rango 9": {
          tamaño = 20;
          this.nivel_dos = 9
          break;
        }
        case "Rango 10": {
          tamaño = 20;
          this.nivel_dos = 10
          break;
        }
        case "Rango 11": {
          if (this.cliente_dos === 'POLLOS SAVICOL S.A.') {
            tamaño = 20;
          } else {
            tamaño = 16;
          }
          this.nivel_dos = 11
          break;
        }
        case "Rango 12": {
          tamaño = 16;
          this.nivel_dos = 12
          break;
        }
        case "Rango 12 Peq": {
          tamaño = 16;
          this.nivel_dos = 13
          break;
        }
        case "Rango 12 Gran": {
          tamaño = 16;
          this.nivel_dos = 14
          break;
        }
        case "Rango 13": {
          if (this.cliente_dos === 'POLLOS SAVICOL S.A.') {
            tamaño = 20;
          } else {
            tamaño = 16;
          }
          this.nivel_dos = 15
          break;
        }
        case "Rango 14": {
          tamaño = 14;
          this.nivel_dos = 16
          break;
        }
        case "Maltrato 14": {
          tamaño = 14;
          this.nivel_dos = 17
          break;
        }
        case "Maltrato 16": {
          tamaño = 16;
          this.nivel_dos = 18
          break;
        }
        case "Maltrato 20": {
          tamaño = 20;
          this.nivel_dos = 19
          break;
        }
        case "A Granel": {
          tamaño = 1;
          if (this.producto_dos === 'Menudencia Completa') {
            this.nivel_dos = 20
          }
          if (this.producto_dos === 'Menudencia Incompleta') {
            this.nivel_dos = 21
          }
          if (this.producto_dos === 'Higados') {
            this.nivel_dos = 22
          }
          if (this.producto_dos === 'Patas') {
            this.nivel_dos = 23
          }
          if (this.producto_dos === 'Pescuezos') {
            this.nivel_dos = 24
          }
          if (this.producto_dos === 'Corazones') {
            this.nivel_dos = 25
          }
          if (this.producto_dos === 'Mollejas') {
            this.nivel_dos = 26
          }
          break;
        }
        case "Paquete": {
          tamaño = 100;
          if (this.producto_dos === 'Menudencia Completa') {
            this.nivel_dos = 27
          }
          if (this.producto_dos === 'Menudencia Incompleta') {
            this.nivel_dos = 28
          }
          if (this.producto_dos === 'Higados') {
            this.nivel_dos = 29
          }
          if (this.producto_dos === 'Patas') {
            this.nivel_dos = 30
          }
          if (this.producto_dos === 'Pescuezos') {
            this.nivel_dos = 31
          }
          if (this.producto_dos === 'Corazones') {
            this.nivel_dos = 32
          }
          if (this.producto_dos === 'Mollejas') {
            this.nivel_dos = 33
          }
          break;
        }

        default: {
          tamaño = 0;
          break;
        }
      }

      this.cantidad_dos = (this.canasta_dos * tamaño) - this.negativo_dos;
      this.peso_promedio_dos = this.cantidad_dos / this.peso_dos;

      let ids: Array<number> = [];
      this.objetoPlanillaDos[0].pesos.forEach((element) => {
        ids.push(element.id)
      })
      this.id_dos = Math.max.apply(null,ids)

      this.objetoPlanillaDos[0].pesos.push({
        id: this.id_dos + 1,
        producto: this.producto_dos,
        rango: this.rango_dos,
        cantidad: this.cantidad_dos,
        peso: this.peso_dos,
        peso_promedio: this.peso_promedio_dos,
        canasta: this.canasta_dos,
        negativo: this.negativo_dos,
        nivel: this.nivel_dos,
      })

      this.total_canastas_dos = (this.canasta_dos * 2);
      this.total_dos = this.total_dos + (this.peso_dos + this.total_canastas_dos);

      this.total_canastas_dos = 0;

      this.producto_dos = '',
        this.rango_dos = '',
        this.canasta_dos = null,
        this.peso_dos = null,
        this.peso_promedio_dos = null,
        this.cantidad_dos = null,
        this.negativo_dos = null,

        this.disabled_dos = true;
      this.id_dos += 1;

      localStorage.setItem("PlanillaDos", null);
      localStorage.setItem("PlanillaDos", JSON.stringify(this.objetoPlanillaDos));
      localStorage.setItem("TotalDos", null);
      localStorage.setItem("TotalDos", this.total_dos.toString());
    }
  }
  //1
  eliminarPesoUno(planilla: Pesos) {
    this.total_uno -= (planilla.peso + (planilla.canasta * 2));
    this.objetoPlanilla[0].pesos.splice(this.objetoPlanilla[0].pesos.findIndex(peso => peso.id === planilla.id), 1);

    localStorage.setItem("PlanillaUno", null);
    localStorage.setItem("PlanillaUno", JSON.stringify(this.objetoPlanilla));
    localStorage.setItem("TotalUno", null);
    localStorage.setItem("TotalUno", this.total_uno.toString());
  }
  //2
  eliminarPesoDos(planilla: Pesos) {
    debugger
    this.total_dos -= (planilla.peso + (planilla.canasta * 2));
    this.objetoPlanillaDos[0].pesos.splice(this.objetoPlanillaDos[0].pesos.findIndex(peso => peso.id === planilla.id), 1);

    localStorage.setItem("PlanillaDos", null);
    localStorage.setItem("PlanillaDos", JSON.stringify(this.objetoPlanillaDos));
    localStorage.setItem("TotalDos", null);
    localStorage.setItem("TotalDos", this.total_dos.toString());
  }
  //1
  limpiarUno() {
    if (confirm('Si limpia los datos perdera todo el progreso que lleve hasta el momento ¿Está seguro que desea limpiar?')) {
      localStorage.setItem("PlanillaUno", null);
      localStorage.setItem("TotalUno", null);
      this.objetoPlanilla = [];
      this.consecutivo_uno = null;
      this.fecha_uno = '';
      this.hora_uno = '';
      this.lugar_uno = '';
      this.temperatura_vehiculo_uno = '';
      this.conductor_uno = '';
      this.temperatura_uno = '';
      this.vehiculo_uno = '';
      this.cliente_uno = '';
      this.disabled_uno = false;
      this.rango_for_uno = false;
      this.total_uno = 0;
      this.observacions_uno = '';
    }
  }
  //1
  limpiarDos() {
    if (confirm('Si limpia los datos perdera todo el progreso que lleve hasta el momento ¿Está seguro que desea limpiar?')) {
      localStorage.setItem("PlanillaDos", null);
      localStorage.setItem("TotalDos", null);
      this.objetoPlanillaDos = [];
      this.consecutivo_dos = null;
      this.fecha_dos = '';
      this.hora_dos = '';
      this.lugar_dos = '';
      this.temperatura_vehiculo_dos = '';
      this.conductor_dos = '';
      this.temperatura_dos = '';
      this.vehiculo_dos = '';
      this.cliente_dos = '';
      this.disabled_dos = false;
      this.rango_for_dos = false;
      this.total_dos = 0;
      this.observacions_dos = '';
    }
  }
  private conteoPDF(element: Pesos) {
    let cantidad: number = 0;
    let peso: number = 0;
    let peso_promedio: number = 0;
    let canastas: number = 0;
    let object: PesosSumas[] = [];

    if (element.producto === 'POLLO EN CANAL') {
      if (this.objetoPlanillaPDFPollo.filter((other) => other.nivel === element.nivel).length > 0) {
        object = this.objetoPlanillaPDFPollo.filter((other) => other.nivel === element.nivel);
        cantidad = object[0].cantidad;
        peso = object[0].peso;
        peso_promedio = object[0].peso_promedio;
        canastas = object[0].canasta;
        this.objetoPlanillaPDFPollo.splice(this.objetoPlanillaPDFPollo.findIndex(data => data.nivel === element.nivel), 1);
      }

      this.objetoPlanillaPDFPollo.push({
        nivel: element.nivel,
        producto: element.producto,
        rango: element.rango,
        cantidad: element.cantidad + cantidad,
        peso: element.peso + peso,
        peso_promedio: element.peso_promedio + peso_promedio,
        canasta: element.canasta + canastas,
      });

      this.objetoPlanillaPDFPollo = this.objetoPlanillaPDFPollo.sort(function (a, b) {
        return a.nivel - b.nivel;
      });
    } else {
      if (this.objetoPlanillaPDFMenudencias.filter((other) => other.nivel === element.nivel).length > 0) {
        object = this.objetoPlanillaPDFMenudencias.filter((other) => other.nivel === element.nivel);
        cantidad = object[0].cantidad;
        peso = object[0].peso;
        peso_promedio = object[0].peso_promedio;
        canastas = object[0].canasta;
        this.objetoPlanillaPDFMenudencias.splice(this.objetoPlanillaPDFMenudencias.findIndex(data => data.nivel === element.nivel), 1);
      }

      this.objetoPlanillaPDFMenudencias.push({
        nivel: element.nivel,
        producto: element.producto,
        rango: element.rango,
        cantidad: element.cantidad + cantidad,
        peso: element.peso + peso,
        peso_promedio: element.peso_promedio + peso_promedio,
        canasta: element.canasta + canastas,
      });

      this.objetoPlanillaPDFMenudencias = this.objetoPlanillaPDFMenudencias.sort(function (a, b) {
        return a.nivel - b.nivel;
      });
    }
  }
  private conteoDosPDF(element: Pesos) {
    let cantidad: number = 0;
    let peso: number = 0;
    let peso_promedio: number = 0;
    let canastas: number = 0;
    let object: PesosSumas[] = [];

    if (element.producto === 'POLLO EN CANAL') {
      if (this.objetoPlanillaPDFDosPollo.filter((other) => other.nivel === element.nivel).length > 0) {
        object = this.objetoPlanillaPDFDosPollo.filter((other) => other.nivel === element.nivel);
        cantidad = object[0].cantidad;
        peso = object[0].peso;
        peso_promedio = object[0].peso_promedio;
        canastas = object[0].canasta;
        this.objetoPlanillaPDFDosPollo.splice(this.objetoPlanillaPDFDosPollo.findIndex(data => data.nivel === element.nivel), 1);
      }

      this.objetoPlanillaPDFDosPollo.push({
        nivel: element.nivel,
        producto: element.producto,
        rango: element.rango,
        cantidad: element.cantidad + cantidad,
        peso: element.peso + peso,
        peso_promedio: element.peso_promedio + peso_promedio,
        canasta: element.canasta + canastas,
      });

      this.objetoPlanillaPDFDosPollo = this.objetoPlanillaPDFDosPollo.sort(function (a, b) {
        return a.nivel - b.nivel;
      });
    } else {
      if (this.objetoPlanillaPDFDosMenudencias.filter((other) => other.nivel === element.nivel).length > 0) {
        object = this.objetoPlanillaPDFDosMenudencias.filter((other) => other.nivel === element.nivel);
        cantidad = object[0].cantidad;
        peso = object[0].peso;
        peso_promedio = object[0].peso_promedio;
        canastas = object[0].canasta;
        this.objetoPlanillaPDFDosMenudencias.splice(this.objetoPlanillaPDFDosMenudencias.findIndex(data => data.nivel === element.nivel), 1);
      }

      this.objetoPlanillaPDFDosMenudencias.push({
        nivel: element.nivel,
        producto: element.producto,
        rango: element.rango,
        cantidad: element.cantidad + cantidad,
        peso: element.peso + peso,
        peso_promedio: element.peso_promedio + peso_promedio,
        canasta: element.canasta + canastas,
      });

      this.objetoPlanillaPDFDosMenudencias = this.objetoPlanillaPDFDosMenudencias.sort(function (a, b) {
        return a.nivel - b.nivel;
      });
    }
  }
  @ViewChild('pdf') el: ElementRef;

  pdfUno(): void {
    let iteracion = this.objetoPlanilla[0].pesos;

    iteracion.forEach(element => {

      if (element.producto === 'POLLO EN CANAL') {
        this.totCantUnoPollo = element.cantidad + this.totCantUnoPollo;
        this.totPesoUnoPollo = element.peso + this.totPesoUnoPollo;
        this.totPesoPromedioUnoPollo = this.totPesoUnoPollo / this.totCantUnoPollo;
        this.totCanastasUnoPollo = element.canasta + this.totCanastasUnoPollo;
      }

      this.totPesoUnoPolloMenudencias = element.peso + this.totPesoUnoPolloMenudencias;
      this.totCanastasUnoPolloMenudencias = element.canasta + this.totCanastasUnoPolloMenudencias;

      this.totalesUno = [];
      this.totalesUno.push({
        cantidad_pollo: this.totCantUnoPollo,
        peso_pollo: this.totPesoUnoPollo,
        peso_promedio_pollo: this.totPesoPromedioUnoPollo,
        canastas_pollo: this.totCanastasUnoPollo,
        peso_pollo_menudencias: this.totPesoUnoPolloMenudencias,
        canastas_pollo_menudencias: this.totCanastasUnoPolloMenudencias
      });

      switch (element.nivel) {
        case 1: {
          this.conteoPDF(element);
          break;
        }
        case 2: {
          this.conteoPDF(element);
          break;
        }
        case 3: {
          this.conteoPDF(element);
          break;
        }
        case 4: {
          this.conteoPDF(element);
          break;
        }
        case 5: {
          this.conteoPDF(element);
          break;
        }
        case 6: {
          this.conteoPDF(element);
          break;
        }
        case 7: {
          this.conteoPDF(element);
          break;
        }
        case 8: {
          this.conteoPDF(element);
          break;
        }
        case 9: {
          this.conteoPDF(element);
          break;
        }
        case 10: {
          this.conteoPDF(element);
          break;
        }
        case 11: {
          this.conteoPDF(element);
          break;
        }
        case 12: {
          this.conteoPDF(element);
          break;
        }
        case 13: {
          this.conteoPDF(element);
          break;
        }
        case 14: {
          this.conteoPDF(element);
          break;
        }
        case 15: {
          this.conteoPDF(element);
          break;
        }
        case 16: {
          this.conteoPDF(element);
          break;
        }
        case 17: {
          this.conteoPDF(element);
          break;
        }
        case 18: {
          this.conteoPDF(element);
          break;
        }
        case 19: {
          this.conteoPDF(element);
          break;
        }
        case 20: {
          this.conteoPDF(element);
          break;
        }
        case 21: {
          this.conteoPDF(element);
          break;
        }
        case 22: {
          this.conteoPDF(element);
          break;
        }
        case 23: {
          this.conteoPDF(element);
          break;
        }
        case 24: {
          this.conteoPDF(element);
          break;
        }
        case 25: {
          this.conteoPDF(element);
          break;
        }
        case 26: {
          this.conteoPDF(element);
          break;
        }
        case 27: {
          this.conteoPDF(element);
          break;
        }
        case 28: {
          this.conteoPDF(element);
          break;
        }
        case 29: {
          this.conteoPDF(element);
          break;
        }
        case 30: {
          this.conteoPDF(element);
          break;
        }
        case 31: {
          this.conteoPDF(element);
          break;
        }
        case 32: {
          this.conteoPDF(element);
          break;
        }
        case 33: {
          this.conteoPDF(element);
          break;
        }

        default: {
          break;
        }
      }
    });

    this.print = true;
    setTimeout(() => {
      let html = "<html><body><table style='border-collapse: collapse;'>" + document.getElementById('divPrintPDFOne').innerHTML + "</table></body></html>"
      cordova.plugins.printer.print(html, { duplex: 'long' }, function (res) {
      });
    }, 500);

    setTimeout(() => {
      this.print = false;
      this.totCantUnoPollo = 0;
      this.totPesoUnoPollo = 0;
      this.totPesoPromedioUnoPollo = 0;
      this.totCanastasUnoPollo = 0;
      this.totPesoUnoPolloMenudencias = 0;
      this.totCanastasUnoPolloMenudencias = 0;
      this.totPesoUnoPolloMenudencias = 0;
      this.totCanastasUnoPolloMenudencias = 0;

      this.objetoPlanillaPDFPollo = [];
      this.objetoPlanillaPDFMenudencias = [];
    }, 700);
  }
  pdfDos(): void {
    let iteracion = this.objetoPlanillaDos[0].pesos;

    iteracion.forEach(element => {
      if (element.producto === 'POLLO EN CANAL') {
        this.totCantDosPollo = element.cantidad + this.totCantDosPollo;
        this.totPesoDosPollo = element.peso + this.totPesoDosPollo;
        this.totPesoPromedioDosPollo = this.totPesoDosPollo / this.totCantDosPollo;
        this.totCanastasDosPollo = element.canasta + this.totCanastasDosPollo;
      }

      this.totPesoDosPolloMenudencias = element.peso + this.totPesoDosPolloMenudencias;
      this.totCanastasDosPolloMenudencias = element.canasta + this.totCanastasDosPolloMenudencias;

      this.totalesDos = [];
      this.totalesDos.push({
        cantidad_pollo: this.totCantDosPollo,
        peso_pollo: this.totPesoDosPollo,
        peso_promedio_pollo: this.totPesoPromedioDosPollo,
        canastas_pollo: this.totCanastasDosPollo,
        peso_pollo_menudencias: this.totPesoDosPolloMenudencias,
        canastas_pollo_menudencias: this.totCanastasDosPolloMenudencias
      });

      switch (element.nivel) {
        case 1: {
          this.conteoDosPDF(element);
          break;
        }
        case 2: {
          this.conteoDosPDF(element);
          break;
        }
        case 3: {
          this.conteoDosPDF(element);
          break;
        }
        case 4: {
          this.conteoDosPDF(element);
          break;
        }
        case 5: {
          this.conteoDosPDF(element);
          break;
        }
        case 6: {
          this.conteoDosPDF(element);
          break;
        }
        case 7: {
          this.conteoDosPDF(element);
          break;
        }
        case 8: {
          this.conteoDosPDF(element);
          break;
        }
        case 9: {
          this.conteoDosPDF(element);
          break;
        }
        case 10: {
          this.conteoDosPDF(element);
          break;
        }
        case 11: {
          this.conteoDosPDF(element);
          break;
        }
        case 12: {
          this.conteoDosPDF(element);
          break;
        }
        case 13: {
          this.conteoDosPDF(element);
          break;
        }
        case 14: {
          this.conteoDosPDF(element);
          break;
        }
        case 15: {
          this.conteoDosPDF(element);
          break;
        }
        case 16: {
          this.conteoDosPDF(element);
          break;
        }
        case 17: {
          this.conteoDosPDF(element);
          break;
        }
        case 18: {
          this.conteoDosPDF(element);
          break;
        }
        case 19: {
          this.conteoDosPDF(element);
          break;
        }
        case 20: {
          this.conteoDosPDF(element);
          break;
        }
        case 21: {
          this.conteoDosPDF(element);
          break;
        }
        case 21: {
          this.conteoDosPDF(element);
          break;
        }
        case 22: {
          this.conteoDosPDF(element);
          break;
        }
        case 23: {
          this.conteoDosPDF(element);
          break;
        }
        case 24: {
          this.conteoDosPDF(element);
          break;
        }
        case 25: {
          this.conteoDosPDF(element);
          break;
        }
        case 26: {
          this.conteoDosPDF(element);
          break;
        }
        case 27: {
          this.conteoDosPDF(element);
          break;
        }
        case 28: {
          this.conteoDosPDF(element);
          break;
        }
        case 29: {
          this.conteoDosPDF(element);
          break;
        }
        case 30: {
          this.conteoDosPDF(element);
          break;
        }
        case 31: {
          this.conteoDosPDF(element);
          break;
        }
        case 32: {
          this.conteoDosPDF(element);
          break;
        }
        case 33: {
          this.conteoDosPDF(element);
          break;
        }

        default: {
          break;
        }
      }
    });

    this.print = true;
    setTimeout(() => {
      let html = "<html><body><table style='border-collapse: collapse;'>" + document.getElementById('divPrintPDFTwo').innerHTML.toString() + "</table></body></html>"
      cordova.plugins.printer.print(html, { duplex: 'long' }, function (res) {
      });
    }, 500);

    setTimeout(() => {
      this.print = false;
      this.totCantDosPollo = 0;
      this.totPesoDosPollo = 0;
      this.totPesoPromedioDosPollo = 0;
      this.totCanastasDosPollo = 0;
      this.totPesoDosPolloMenudencias = 0;
      this.totCanastasDosPolloMenudencias = 0;
      this.totPesoDosPolloMenudencias = 0;
      this.totCanastasDosPolloMenudencias = 0;

      this.objetoPlanillaPDFDosPollo = [];
      this.objetoPlanillaPDFDosMenudencias = [];
    }, 700);
  }
  observacionesUno() {
    if (this.observacions_uno != "") {
      this.objetoPlanilla[0].observaciones = this.observacions_uno;
      localStorage.setItem("PlanillaUno", null);
      localStorage.setItem("PlanillaUno", JSON.stringify(this.objetoPlanilla));
    }
  }
  observacionesDos() {
    if (this.observacions_dos != "") {
      this.objetoPlanillaDos[0].observaciones = this.observacions_dos;
      localStorage.setItem("PlanillaDos", null);
      localStorage.setItem("PlanillaUDos", JSON.stringify(this.objetoPlanillaDos));
    }
  }
}
