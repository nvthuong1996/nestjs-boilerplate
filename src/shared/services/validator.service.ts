import { Injectable } from '@nestjs/common';
import { includes } from '../../utils/lodash';

@Injectable()
export class ValidatorService {
  public isImage(mimeType: string): boolean {
    const imageMimeTypes = ['image/jpeg', 'image/png'];
    return includes(imageMimeTypes, mimeType);
  }

  public isVideo(mimeType: string): boolean {
    const imageMimeTypes = ['video/mp4'];
    return includes(imageMimeTypes, mimeType);
  }
}
