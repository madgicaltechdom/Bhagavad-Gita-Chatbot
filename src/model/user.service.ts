import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}
  async createUser(
    mobileNumber: string,
    botID: string,
  ): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      existingUser.mobileNumber=mobileNumber
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.language = 'English';
      newUser.botID = botID;
      newUser.chapterNumber=1;
      newUser.verseNumber=1;
      return this.userRepository.save(newUser);
    }
  }

  async findUserByMobileNumber(
    mobileNumber: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mobileNumber } });
  }

  async saveUser(user: User): Promise<User | undefined> {
    return this.userRepository.save(user);
  }
  async saveChapterNumber(mobileNumber: string, botID: string,chapterNumber:number): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      existingUser.chapterNumber = chapterNumber;
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.id = uuidv4(); 
      newUser.botID = botID; 
      newUser.chapterNumber=chapterNumber;
      newUser.verseNumber=null;
      newUser.language = 'English'; 
      return this.userRepository.save(newUser);
    }
  };
  async saveverseNumber(mobileNumber: string, botID: string,verseNumber:number,chapterNumber:number): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      existingUser.verseNumber = verseNumber;
      existingUser.chapterNumber=chapterNumber
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.id = uuidv4(); 
      newUser.botID = botID; 
      newUser.chapterNumber=chapterNumber;
      newUser.verseNumber=verseNumber;
      newUser.language = 'English'; 
      return this.userRepository.save(newUser);
    }
  };
 
}
