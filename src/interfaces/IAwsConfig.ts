'use strict';

export interface IAwsConfig {
  apiEndpoint: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  bucketName: string;
}
