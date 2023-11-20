import { Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'user_entity' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
	@ApiProperty()
	@Column({ unique: true })
	email: string;

	@ApiProperty()
	@Column
	passwordHash: string;
}
