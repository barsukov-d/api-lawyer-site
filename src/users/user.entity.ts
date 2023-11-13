import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	test: string;

	@Column()
	test777: string;

	@Column()
	lastName: string;

	@Column({ default: true })
	isActive: boolean;
}
