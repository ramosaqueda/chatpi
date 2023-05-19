import e from 'express'
import { err, ok, Result } from 'neverthrow'
import databaseBootstrap from 'src/bootstrap/database.bootstrap'
import DatabaseBootstrap from 'src/bootstrap/database.bootstrap'
import { UserEmailInvalidException, UserNotFoundException } from '../domain/exceptions/user.exception'
import User, { UserUpdate } from '../domain/user'
import { UserRepository } from '../domain/user.repository'
import { EmailVO } from '../domain/value-objects/email.vo'
import { UserEntity } from './user.entity'

 
export default class UserInfraestructure implements UserRepository {

	async insert(user: User): Promise<User> {
		const userInsert = new UserEntity()
		const {guid,name,lastname,email,password,refreshToken,active } = user.properties()
		
		Object.assign(userInsert, {
			guid,
			name,
			lastname,
			email:email.value,
			password,
			refreshToken,
			active,
		})

		await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)
		return user
		throw new Error('Method not implemented.')
	}

	async list(): Promise<User[]> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
		const result = await repo.find({where:{active:true}})
		return result.map((el: UserEntity) => {
			const emailResult = EmailVO.create(el.email)

			if (emailResult.isErr()){
				throw new UserEmailInvalidException()
			}
			return new User({
				guid:el.guid,
				name:el.name,
				lastname:el.lastname,
				email:emailResult.value,
				password:el.password,
				refreshToken: el.refreshToken,
				active: el.active
			})

		})

	}
	
	async listOne(guid: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
		
		const result = await repo.findOne({ where: { guid } })// en emacstipt  moderno se puede  hacer esto en vez de guid:guid
		
		
		const emailResult = EmailVO.create(result.email)
		
		if (emailResult.isErr()){
 
			return err(new UserEmailInvalidException())
			
		}

		if (!result) {
			return err(new UserNotFoundException)
		}
		else{
			return ok (
				new User({
					guid: result.guid,
					name: result.name,
					lastname: result.lastname,
					email: emailResult.value,
					password: result.password,
					refreshToken: result.refreshToken,
					active: result.active,
				  }),
			)
		}
	}
	

	
	async update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
	
		const userFound = await repo.findOne({
		  where: { guid },
		})
	
		if (userFound) {
			Object.assign(userFound,user)
			const UserEntity = await repo.save(userFound)
			const emailResult = EmailVO.create(UserEntity.email)
			if (emailResult.isErr()){
				return err(new UserEmailInvalidException)
			}

			return ok (
				new User({
					guid:UserEntity.guid,
					name: UserEntity.name,
					lastname: UserEntity.lastname,
					email: emailResult.value,
					password: UserEntity.password,
					refreshToken: UserEntity.refreshToken,
					active: UserEntity.active,
					})
				
			)
		
		}
	}
	
	async delete(guid: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
		const userFound = await repo.findOne({
			where:{ guid}
		})

		if (userFound){
			userFound.active ==false
			const UserEntity = await repo.save(userFound)
			const emailResult = EmailVO.create(UserEntity.email)
			if (emailResult.isErr()){
				return  err(new UserEmailInvalidException())
			}

			return ok(
				new User({
					guid: UserEntity.guid,
					name: UserEntity.name,
					lastname : UserEntity.lastname,
					email:emailResult.value,
					password:UserEntity.password,
					refreshToken: UserEntity.refreshToken,
					active:UserEntity.active,
				})
			)
		}
		else{
			return err(new UserNotFoundException)
		}

		 
	}
}
