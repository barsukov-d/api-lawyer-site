import { Column, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'user_entity' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
	@Column({ unique: true })
	email: string;

	@Column
	passwordHash: string;
}
