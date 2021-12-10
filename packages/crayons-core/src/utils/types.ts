export type TagVariant = 'standard' | 'avatar';

export type DropdownVariant = 'standard' | 'icon' | 'avatar';

export type PopoverPlacementType =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end';

export type PopoverTriggerType = 'click' | 'hover' | 'manual';

export interface DataTableColumn {
  key: string;
  text: string;
  orderIndex: number;
}

export interface DataTableRow {
  id: string;
  [prop: string]: any;
}
