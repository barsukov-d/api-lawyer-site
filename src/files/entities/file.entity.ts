import { ApiProperty } from '@nestjs/swagger';

import { Table, Column, Model } from 'sequelize-typescript';

interface FileInfoCreationAttrs {
	fileUuid: string;
	name: string;
	url: string;
	type: string;
}

@Table({ tableName: 'files_entity' })
export class FileInfo extends Model<FileInfo, FileInfoCreationAttrs> {
	@ApiProperty()
	@Column
	fileUuid: string;

	@ApiProperty()
	@Column
	name: string;

	@ApiProperty()
	@Column
	url: string;

	@ApiProperty()
	@Column
	type: string;
}
