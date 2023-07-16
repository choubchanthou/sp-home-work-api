import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './interfaces/file.interface';
import * as crypto from 'crypto';
import fs from 'fs';

@Injectable()
export class MinioClientService {
    constructor(private readonly minio: MinioService) {
        this.logger = new Logger('MinioService');

        const policy = {
            Version: '2012-10-17',
            "Statement": [
                {
                    "Action": [
                        "s3:GetObject"
                    ],
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": [
                            "*"
                        ]
                    },
                    "Resource": [
                        `arn:aws:s3:::${this.bucketName}/*`
                    ],
                    "Sid": ""
                }
            ]
        };

        try {
            this.client.bucketExists(this.bucketName)
                .then((value) => {
                    console.log(this.bucketName, value);
                    if (value) {
                        this.client.setBucketPolicy(this.bucketName, JSON.stringify(policy));
                    } else {
                        this.client.makeBucket(this.bucketName)
                            .then(() => {
                                this.client.setBucketPolicy(this.bucketName, JSON.stringify(policy));
                            });
                    }
                });



        } catch (error) {
            this.logger.error(error, 'create:bucket')
        }
    }

    private readonly logger: Logger;
    private readonly bucketName = process.env.MINIO_BUCKET;

    public get client() {
        return this.minio.client;
    }

    public async upload(
        file: BufferedFile,
        bucketName: string = this.bucketName,
    ) {
        console.log(this.bucketName);
        if (!(file?.mimetype.includes('excel')
            || file?.mimetype.includes('spreadsheetml') || file?.mimetype.includes('pdf'))) {
            throw new HttpException(
                'File type not supported',
                HttpStatus.BAD_REQUEST,
            );
        }
        const timestamp = Date.now().toString();
        const hashedFileName = crypto
            .createHash('md5')
            .update(timestamp)
            .digest('hex');
        const extension = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length,
        );

        const fileName = hashedFileName + extension;

        this.client.putObject(
            bucketName,
            fileName,
            file.buffer,
            function (err, res) {
                if (err) {
                    throw new HttpException(
                        'Error uploading file',
                        HttpStatus.BAD_REQUEST,
                    );
                }
            },
        );

        return {
            url: `http://localhost:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${fileName}`,
        };
    }

    async delete(objetName: string, bucketName: string = this.bucketName) {
        this.client.removeObject(bucketName, objetName, (err: any) => {
            if (err)
                throw new HttpException(
                    'An error occured when deleting!',
                    HttpStatus.BAD_REQUEST,
                );
        });
    }

    async getFile(bucketName: string, fileName: string) {
        return await this.client.getObject(bucketName, fileName);
    }
}