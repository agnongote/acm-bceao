import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface ExcelExporterOptions {
  headerOpt: {};
  sheetName: string;
  fileName: string;
}

@Injectable({ providedIn: 'root' })
export class ExcelExportService {
  constructor() {}

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  /** export des données AVEC les colonnes predéfinies */
  public exportAsExcelFile(data: any[], options: ExcelExporterOptions): void {
    const headerKeys = [Object.keys(options.headerOpt)];
    const headerLabel = [Object.values(options.headerOpt)];
    const filteredData = this.filterColumns(data, headerKeys[0]);

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

    XLSX.utils.sheet_add_aoa(worksheet, headerLabel);
    XLSX.utils.sheet_add_json(worksheet, filteredData, {
      origin: 'A2',
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      options.sheetName ? options.sheetName : 'Sheet1'
    );

    XLSX.writeFile(
      workbook,
      ExcelExportService.toExportFileName(options.fileName)
    );
  }

  /** export des données SANS les colonnes predéfinies */
  public simpleExportAsExcelFile(
    json: any[],
    excelFileName: string,
    headerOrder?: string[]
  ): void {
    let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {
      header: headerOrder ? headerOrder : [],
    });
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    XLSX.writeFile(
      workbook,
      ExcelExportService.toExportFileName(excelFileName)
    );
  }

  /** Filtre les données en fonction des colonnes predéfinies */
  private filterColumns(json: any[], columns: string[]): any[] {
    return json.map((row) => {
      const rowData = {} as any;
      columns.forEach((column: string) => {
        rowData[column] = row[column];
      });
      return rowData;
    });
  }
}
