import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  debug(...args: any[]): void {
    if (!this.isProd()) console.debug(...args);
  }

  info(...args: any[]): void {
    if (!this.isProd()) console.info(...args);
  }

  warn(...args: any[]): void {
    if (!this.isProd()) console.warn(...args);
  }

  error(...args: any[]): void {
    console.error(...args);
  }

  private isProd(): boolean {
    try {
      // In browser builds environment is available via window; fallback to false
      // For server-side usage this can be adapted to use process.env
      // Here we use a minimal check to avoid runtime errors
      // Consumers should prefer enabling production mode via Angular's environment files
      return (typeof (window as any) !== 'undefined' && (window as any).ENV && (window as any).ENV.production) || false;
    } catch {
      return false;
    }
  }
}
