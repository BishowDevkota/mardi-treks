import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export class AdminModel {
  private static collection = 'admins';

  static async createAdmin(email: string, password: string) {
    const client = await clientPromise;
    const db = client.db('your_database_name'); // Replace with your database name
    
    // Check if admin already exists
    const existingAdmin = await db.collection(this.collection).findOne({});
    if (existingAdmin) {
      throw new Error('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const admin = {
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await db.collection(this.collection).insertOne(admin);
    return result.insertedId;
  }

  static async findAdminByEmail(email: string) {
    const client = await clientPromise;
    const db = client.db('your_database_name'); // Replace with your database name
    
    return await db.collection(this.collection).findOne({ email });
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async adminExists() {
    const client = await clientPromise;
    const db = client.db('your_database_name'); // Replace with your database name
    
    const count = await db.collection(this.collection).countDocuments();
    return count > 0;
  }
}
