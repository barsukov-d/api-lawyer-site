import { Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PageCreationAttrs {
	title: string;
	content: string;
	slug: string;
	metaTitle: string;
	metaDescription: string;
	metaKeywords: string;
}

@Table({ tableName: 'pages_entity' })
export class Page extends Model<Page, PageCreationAttrs> {
	@ApiProperty()
	@Column
	title: string;

	@ApiProperty()
	@Column
	content: string;

	@ApiProperty()
	@Column
	slug: string;

	@ApiProperty()
	@Column
	metaTitle: string;

	@ApiProperty()
	@Column
	metaDescription: string;

	@ApiProperty()
	@Column
	metaKeywords: string;
}
