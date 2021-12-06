interface Column {
  key: string;
  text: string;
  orderIndex: number;
}

interface Row {
  id: string;
  [prop: string]: any;
}

export { Column, Row };
