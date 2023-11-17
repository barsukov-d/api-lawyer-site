import { BaseEntity } from 'src/helpers/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
	@Column({ unique: true })
	email: string;

	@Column()
	passwordHash: string;
}
