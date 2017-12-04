import { environment } from '../environments/environment';

export class Service {
  private baseUrl = environment.apiUrl;

  public getBaseUrl(): string { return this.baseUrl; }

  constructor() { }
}
