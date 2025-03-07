import { firstValueFrom, Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiBase {
  /**
   *
   * @param response
   */
  async toPromiseResponse(response: Observable<any>) {
    return await firstValueFrom(response);
  }
}
