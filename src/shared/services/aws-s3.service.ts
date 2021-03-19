import {
  Injectable,
  InternalServerErrorException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';

import { IFile } from '../../interfaces/IFile';
import { ConfigService } from './config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class AwsS3Service implements OnApplicationBootstrap {
  public readonly _s3: AWS.S3;

  constructor(
    public configService: ConfigService,
    public generatorService: GeneratorService,
  ) {
    const awsS3Config = configService.awsS3Config;
    const options: AWS.S3.Types.ClientConfiguration = {
      sslEnabled: false,
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
      endpoint: awsS3Config.apiEndpoint,
    };

    if (
      awsS3Config.credentials.accessKeyId &&
      awsS3Config.credentials.secretAccessKey
    ) {
      options.credentials = awsS3Config.credentials;
    }

    this._s3 = new AWS.S3(options);
  }

  getBucketAlc() {
    return new Promise((resolve, reject) => {
      this._s3.getBucketAcl(
        {
          Bucket: this.configService.awsS3Config.bucketName,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  async uploadFile({
    bucket,
    file,
    key,
  }: {
    bucket?: string;
    file: IFile;
    key: string;
  }) {
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );
    const uploadBucket = bucket || this.configService.awsS3Config.bucketName;
    await this._s3
      .putObject({
        Bucket: uploadBucket,
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
      })
      .promise();

    return { key, fileName, bucket };
  }

  async uploadImage({ file }) {
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );
    const key = `images/${fileName}`;
    const uploadBucket = this.configService.awsS3Config.bucketName;
    await this._s3
      .putObject({
        Bucket: uploadBucket,
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
      })
      .promise();

    return { key, fileName, bucket: uploadBucket };
  }

  deleteFile(key) {
    const uploadBucket = this.configService.awsS3Config.bucketName;
    this._s3.deleteObject(
      {
        Bucket: uploadBucket,
        Key: key,
      },
      function (error) {
        console.log('====Error delete file', error);
      },
    );
  }

  onApplicationBootstrap(): any {
    const bucketName = this.configService.get('BACKEND_STORAGE_BUCKET');

    this._s3.createBucket(
      {
        Bucket: bucketName,
        ACL: 'public-read',
        CreateBucketConfiguration: {
          LocationConstraint: '',
        },
      },
      function (err, data) {
        if (err) {
          console.log('Bucket has been created already', err);
        } else {
          console.log('Bucket Created Successfully', bucketName);
        }
      },
    );
  }
}
