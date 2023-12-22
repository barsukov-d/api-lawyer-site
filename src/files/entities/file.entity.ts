import { ApiProperty } from '@nestjs/swagger';

import { Table, Column, Model } from 'sequelize-typescript';

interface FileInfoCreationAttrs {
	name: string;
	url: string;
	uploadDate: Date;
	type: string;
	size: number;
}

@Table({ tableName: 'files_entity' })
export class FileInfo extends Model<FileInfo, FileInfoCreationAttrs> {
	@ApiProperty()
	@Column
	name: string;

	@ApiProperty()
	@Column
	url: string;

	@ApiProperty()
	@Column
	uploadDate: Date;

	@ApiProperty()
	@Column
	type: string;

	@ApiProperty()
	@Column
	size: number;
}
