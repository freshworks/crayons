export type InitialUploaderFile = {
  progress: number;
  error: string;
  file: File;
  lastServerResponse: any;
};

export class UploaderFile {
  id: number;
  name: string;
  progress: number;
  error: string;
  size: number;
  type: string;
  file: File;
  lastServerResponse: any;

  constructor(
    id: number,
    file: File,
    progress = 0,
    lastServerResponse: any = null,
    error = ''
  ) {
    this.id = id;
    this.name = file.name;
    this.progress = progress || 0;
    this.size = file.size;
    this.type = file.type;
    this.file = file;
    this.error = error || '';
    this.lastServerResponse = lastServerResponse || null;
  }

  get state() {
    let state: 'normal' | 'error' | 'loading' = 'normal';
    if (this.progress === 0 || this.progress === 100) {
      state = 'normal';
    } else if (this.progress < 0) {
      state = 'error';
    } else {
      state = 'loading';
    }
    return state;
  }
}
