/* tslint:disable:naming-convention */

import { Transform } from 'class-transformer';
import { castArray, isArray, isNil, trim } from '../utils/lodash';

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function Trim() {
  return Transform((value: string | string[]) => {
    if (isArray(value)) {
      return value.map((v) => trim(v).replace(/\s\s+/g, ' '));
    }
    return trim(value).replace(/\s\s+/g, ' ');
  });
}

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function ToInt() {
  return Transform((value) => parseInt(value, 10), { toClassOnly: true });
}

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export function ToArray(): (target: any, key: string) => void {
  return Transform(
    (value) => {
      if (isNil(value)) {
        return [];
      }
      return castArray(value);
    },
    { toClassOnly: true },
  );
}
